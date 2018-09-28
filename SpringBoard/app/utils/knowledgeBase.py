from pymongo import MongoClient
from pymongo import cursor
from rasa_nlu.model import Metadata, Interpreter
from difflib import SequenceMatcher

from app.utils.userCRUD import *
import json

interpreter = Interpreter.load('./model')

# ------------------------------------------------------------------- #
#                      Knowledge Base Management                      #
# ------------------------------------------------------------------- #

# delete qna
def deleteQNA(question):

    collection = db.knowledgeBase
    deleted = collection.delete_one({"question": question})

    results = {}
    results["results"] = deleted.acknowledged
    results["items_deleted"] = deleted.deleted_count

    client.close()
    return results


# edit qna
def editQNA(qna):
    
    #delete existing qna
    deleteQNA(qna["question"])

    #add updated qna
    results = addQNA(qna)

    client.close()
    return results


# add answered question to knowledge base
def addQNA(qna):

    collection = db.knowledgeBase

    collection.insert_one(qna)
    deleteUnanswered(qna["question"])
    
    results = {"results": "true"}

    client.close()
    return results


# retrieve all qna
def retrieveAllQNA():
    collection = db.knowledgeBase

    table = collection.find({},{"_id":0})
    qnaList = [item for item in table]

    print(qnaList)
    results = {}
    results["results"] =  qnaList

    client.close()
    return results


# retrieve uncleaned qna (e.g. no intent)
def retrieveAllUnclean():
    collection = db.knowledgeBase

    table = collection.find({"intent": { "$exists": False }},{"_id":0})
    qnaList = [item for item in table]

    results = {}
    results["results"] =  qnaList

    client.close()
    return results


# get answers for specific question
def getAnswer(question):

    collection = db.knowledgeBase

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
                    q["similarity"] = SequenceMatcher(None, question, q["question"]).ratio()
                    match.append(q)

    # keep top 5
    match = sortBySimilarity(match)
    top5 = match[:5]

    # string matching for other results
    table = collection.find({"intent": {"$ne": intent}},{"_id":0})
    otherList = [item for item in table]
    extras = []

    for q in otherList:
        q["similarity"] = SequenceMatcher(None, question, q["question"]).ratio()
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


# ------------------------------------------------------------------- #
#                      Unanswered Qns Management                      #
# ------------------------------------------------------------------- #

# add unanswered question
def addQuestion(question):

    collection = db.unansweredQuestions
    questionCollection = db.knowledgeBase

    # find duplicates in unanswered questions and knowledge base
    duplicate = collection.find_one({"question":question},{"_id":0})
    questionDuplicate = questionCollection.find_one({"question":question},{"_id":0})

    results = {"error": "duplicate question"}

    # add into unanswered only if no duplicates
    if duplicate == None and questionDuplicate == None:
        collection.insert_one({"question":question})
        results = {"results": "true"}
    
    client.close()
    return results 


# retrieve unanswered questions
def retrieveUnanswered():

    collection = db.unansweredQuestions
    
    table = collection.find({},{"_id":0})
    questionList = [item for item in table]
    
    results = {"results" : questionList}

    client.close()
    return results


# delete unanswered question
def deleteUnanswered(question):

    collection = db.unansweredQuestions
    
    deleted = collection.delete_one({"question": question})

    results = {}
    results["results"] = deleted.acknowledged
    results["items_deleted"] = deleted.deleted_count

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



