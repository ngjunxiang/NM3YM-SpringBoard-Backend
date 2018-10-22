import re, math
from collections import Counter
from pymongo import MongoClient
from pymongo import cursor
from rasa_nlu.model import Metadata, Interpreter
from difflib import SequenceMatcher
from operator import itemgetter

from app.utils.userCRUD import *
from app.utils.notificationCRUD import *
import json
import pytz
import datetime

interpreter = Interpreter.load('./model')
tz = pytz.timezone('Asia/Singapore')

# ------------------------------------------------------------------- #
#                      Knowledge Base Management                      #
# ------------------------------------------------------------------- #

# delete qna
def deleteQNA(qnID):

    collection = db.KnowledgeBase
    deleted = collection.delete_one({"qnID": qnID})

    results = {}
    results["results"] = deleted.acknowledged
    results["items_deleted"] = deleted.deleted_count

    client.close()
    return results


# edit qna
def editQNA(qna,username):
    
    collection = db.KnowledgeBase

    # retrieve existing qna
    prevQNA = collection.find_one({"qnID":qna["qnID"]})

    # delete existing qna
    deleteQNA(qna["qnID"])

    # get timezone corrected date
    date = datetime.datetime.now(pytz.utc).astimezone(tz).strftime('%Y-%m-%d')
    date = str(date)

    # move current answer to log
    prevAnswer = {
        "answer": prevQNA["answer"],
        "CMusername": prevQNA["CMusername"],
        "dateAnswered": prevQNA["dateAnswered"]
    }

    if "prevAnswer" in prevQNA:
        prevQNAs = prevQNA["prevAnswer"]
        prevQNAs.append(prevAnswer)
        qna["prevAnswer"] = prevQNAs
    else:
        qna["prevAnswer"] = [prevAnswer]


    qna["username"] = prevQNA["username"]
    qna["dateAsked"] = prevQNA["dateAsked"]
    qna["views"] = prevQNA["views"]
    qna["CMusername"] = username
    qna["dateAnswered"] = str(date)

    #add updated qna
    collection.insert_one(qna)

    results = {"results":"true"}
    client.close()
    return results


# add answered question to knowledge base
def addQNA(qna,username):

    collection = db.KnowledgeBase
    qCollection = db.UnansweredQuestions

    # retrieve question
    question = qCollection.find_one({"qnID":qna["qnID"]})

    # get timezone corrected date
    date = datetime.datetime.now(pytz.utc).astimezone(tz).strftime('%Y-%m-%d')
    date = str(date)
    
    qna["username"] = question["username"]
    qna["dateAsked"] = question["dateAsked"]

    qna["CMusername"] = username
    qna["dateAnswered"] = str(date)

    qna["views"] = 0

    collection.insert_one(qna)
    deleteUnanswered(qna["qnID"])
    
    checkNotification = createAnswerNotifications(qna)
    if checkNotification:
        results = {"results": "true"}

    results = {"results": "true"}

    client.close()
    return results

# cm add question to knowledge base
def cmAddQNA(qna,username):

    collection = db.KnowledgeBase
    counter = db.QuestionCounter

    # get timezone corrected date
    date = datetime.datetime.now(pytz.utc).astimezone(tz).strftime('%Y-%m-%d')
    date = str(date)

    # get qnID
    qnID = int(counter.find_one({"_id":"qnID"})["sequence_value"])
    counter.find_one_and_update({"_id":"qnID"}, {'$inc': {'sequence_value': 1}})
    
    qna["qnID"] = qnID

    qna["username"] = "FO"
    qna["dateAsked"] = str(date)

    qna["CMusername"] = username
    qna["dateAnswered"] = str(date)

    qna["views"] = 0

    collection.insert_one(qna)

    results = {"results": "true"}

    client.close()
    return results

# retrieve all qna
def retrieveAllQNA():
    collection = db.KnowledgeBase

    table = collection.find({},{"_id":0})
    qnaList = [item for item in table]

    qnaList = sorted(qnaList, key=itemgetter('question')) 

    results = {}
    results["results"] =  qnaList

    client.close()
    return results


# retrieve uncleaned qna (e.g. no intent)
def retrieveAllUnclean():
    collection = db.KnowledgeBase

    table = collection.find({"intent": { "$exists": False }},{"_id":0})
    qnaList = [item for item in table]

    results = {}
    results["results"] =  qnaList

    client.close()
    return results


# get answers for specific question
def getAnswer(question):

    collection = db.KnowledgeBase

    #get intents and entities
    intentEntity = interpreter.parse(question)
    intent = intentEntity["intent"]["name"]
    entities = {}
    for entity in intentEntity["entities"]:
        entities[entity["entity"]] = entity["value"]

    # retrieve all qna with similar intent
    table = collection.find({"intent": intent},{"_id":0})
    faqList = [item for item in table]
    match = []

    # filter by question similarity
    for q in faqList:
        for entity,value in entities.items():
            if q["entities"].get(entity) != None:
                if value in q["entities"][entity]:
                    quesVector1 = createVector(question)
                    quesVector2 = createVector(q["question"])
                    q["similarity"] = getCosSimilarity(quesVector1, quesVector2)
                    # q["similarity"] = SequenceMatcher(None, question, q["question"]).ratio()
                    match.append(q)

    # keep top 5
    match = sortBySimilarity(match)
    top5 = match[:5]

    # string matching for other results
    table = collection.find({"intent": {"$ne": intent}},{"_id":0})
    otherList = [item for item in table]
    extras = []

    for q in otherList:
        quesVector1 = createVector(question)
        quesVector2 = createVector(q["question"])
        q["similarity"] = getCosSimilarity(quesVector1, quesVector2)
        # q["similarity"] = SequenceMatcher(None, question, q["question"]).ratio()
        extras.append(q)

    # keep top 10 and return
    extras = sortBySimilarity(extras)
    top10 = []

    if len(top5)==0:
        top10 = extras
    else:
        top5.extend(extras)
        top10 = top5

    results = {
        "results": top10[:10]
    }

    client.close()
    return results

# increment views of question
def incrementViews(qnID):
    collection = db.KnowledgeBase

    # retrieve question
    collection.find_one_and_update({"qnID": int(qnID)}, {'$inc': {'views': 1}})

    results = {"results": "true"}

    client.close()
    return results


# ------------------------------------------------------------------- #
#                      Unanswered Qns Management                      #
# ------------------------------------------------------------------- #

# add unanswered question
def addQuestion(question,username):

    counter = db.QuestionCounter
    collection = db.UnansweredQuestions
    questionCollection = db.KnowledgeBase
    qnID = int(counter.find_one({"_id":"qnID"})["sequence_value"])
    counter.find_one_and_update({"_id":"qnID"}, {'$inc': {'sequence_value': 1}})

    # find duplicates in unanswered questions and knowledge base
    duplicate = collection.find_one({"question":question},{"_id":0})
    questionDuplicate = questionCollection.find_one({"question":question},{"_id":0})

    # get timezone corrected date
    date = datetime.datetime.now(pytz.utc).astimezone(tz).strftime('%Y-%m-%d')
    date = str(date)

    results = {"error": "duplicate question"}

    # add into unanswered only if no duplicates
    if duplicate == None and questionDuplicate == None:
        collection.insert_one({
            "qnID":qnID,
            "question":question,
            "username":username,
            "dateAsked":  str(date)
        })
        checkNotification = createQuestionNotifications(question,username,qnID)
        if checkNotification:
            results = {"results": "true"}

        results = {"results": "true"}
    
    client.close()
    return results 


# retrieve unanswered questions
def retrieveUnanswered():

    collection = db.UnansweredQuestions
    
    table = collection.find({},{"_id":0})
    questionList = [item for item in table]
    
    results = {"results" : questionList}
    client.close()
    return results


# delete unanswered question
def deleteUnanswered(qnID):

    collection = db.UnansweredQuestions
    
    deleted = collection.delete_one({"qnID": qnID})

    results = {}
    results["results"] = deleted.acknowledged
    results["items_deleted"] = deleted.deleted_count

    client.close()
    return results

# ------------------------------------------------------------------- #
#                        FO/CM specific methods                       #
# ------------------------------------------------------------------- #

# retrieve all questions asked by user
def userRetrieveAllQNA(username):
    answeredCollection = db.KnowledgeBase
    unansweredCollection = db.UnansweredQuestions

    table = answeredCollection.find({"username":username},{"_id":0})
    answeredList = [item for item in table]

    table = unansweredCollection.find({"username":username},{"_id":0})
    unansweredList = [item for item in table]

    results = {}
    results["results"] =  {
        "answered" : answeredList,
        "unanswered" : unansweredList
    }

    client.close()
    return results

# ------------------------------------------------------------------- #
#                            Helper methods                           #
# ------------------------------------------------------------------- #

def sortBySimilarity(match):
    retMatch = []
    if not match:
        return retMatch
    
    retMatch.append(match[0])
    for i in range(1,len(match)):
        matchVal = match[i]
        matchSim = matchVal.get("similarity")
        for j, retMatchValue in enumerate(retMatch):
            retMatchSim = retMatchValue.get("similarity")
            if matchSim > retMatchSim:
                retMatch.insert(j,match[i])
                break
            else:
                retMatch.append(match[i])
                break
            
    return retMatch


def getCosSimilarity(vec1, vec2):
    intersection = set(vec1.keys()) & set(vec2.keys())
    numerator = sum([vec1[x] * vec2[x] for x in intersection])

    sum1 = sum([vec1[x]**2 for x in vec1.keys()])
    sum2 = sum([vec2[x]**2 for x in vec2.keys()])
    denominator = math.sqrt(sum1) * math.sqrt(sum2)

    if not denominator:
        return 0.0
    else:
        return float(numerator) / denominator


def createVector(text):
    regex = re.compile(r'\w+')
    words = regex.findall(text)
    return Counter(words)
