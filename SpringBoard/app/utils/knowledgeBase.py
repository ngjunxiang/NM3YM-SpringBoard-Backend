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

interpreter = None
client = MongoClient('mongodb://localhost:27017/')
db = client.SpringBoard
tz = pytz.timezone('Asia/Singapore')

def initialiseModel():
    """Initialises NLU model."""

    global interpreter
    interpreter = Interpreter.load('./model/default/SpringBoardKMS/')
    return True
    
# ------------------------------------------------------------------- #
#                      Knowledge Base Management                      #
# ------------------------------------------------------------------- #

# delete qna
def deleteQNA(qnID):
    """Deletes QNA with the given qnID.
    
    Args:
    qnID (str) : question ID 

    """

    collection = db.KnowledgeBase
    deleted = collection.delete_one({"qnID": qnID})

    results = {}
    results["results"] = deleted.acknowledged
    results["items_deleted"] = deleted.deleted_count

    client.close()
    return results

# edit qna
def editQNA(qna,username):
    """Edits QNA.
    
    Args:
    qna (dict) : updated QNA object 
    username (str) : username of user editing

    """
    
    collection = db.KnowledgeBase

    # retrieve existing qna
    prevQNA = collection.find_one({"qnID":qna["qnID"]})

    qnID = qna["qnID"]

    # get timezone corrected date
    date = datetime.datetime.now(pytz.utc).astimezone(tz).strftime('%Y-%m-%d %H:%M')
    date = str(date)

    # move current answer to log
    prevAnswer = {
        "answer": prevQNA["answer"],
        "CMusername": prevQNA["CMusername"],
        "dateAnswered": prevQNA["dateAnswered"],
        "refPages": prevQNA["refPages"],
    }

    if prevQNA.get("qnIDRef") != None:
        prevAnswer["qnIDRef"] = prevQNA["qnIDRef"]

    if "prevAnswer" in prevQNA:
        prevQNAs = prevQNA["prevAnswer"]
        prevQNAs.append(prevAnswer)
        qna["prevAnswer"] = prevQNAs
    else:
        qna["prevAnswer"] = [prevAnswer]

    try:
        qna["intent"] = prevQNA["intent"]
        qna["entities"] = prevQNA["entities"]
    except:
        pass

    qna["username"] = prevQNA["username"]
    qna["dateAsked"] = prevQNA["dateAsked"]

    qna["views"] = prevQNA["views"]
    qna["CMusername"] = username
    qna["dateAnswered"] = str(date)

    # delete existing qna
    deleteQNA(qna["qnID"])

    #add updated qna
    collection.insert_one(qna)


    results = {}
    if createQnAUpdateNotification(qnID):
        results["notification"] = "Notification update fail"

    results["results"] = "true"
    client.close()
    return results

# add answered question to knowledge base
def addQNA(qna,username):
    """Adds answered QNA to knowledge base.
    
    Args:
    qna (dict) : QNA object 
    username (str) : username of user 

    """

    collection = db.KnowledgeBase
    qCollection = db.UnansweredQuestions

    # retrieve question
    question = qCollection.find_one({"qnID":qna["qnID"]})

    # get timezone corrected date

    date = datetime.datetime.now(pytz.utc).astimezone(tz).strftime('%Y-%m-%d %H:%M')
    date = str(date)
    
    qna["username"] = question["username"]
    qna["dateAsked"] = question["dateAsked"]

    qna["CMusername"] = username
    qna["dateAnswered"] = str(date)

    qna["views"] = 0

    collection.insert_one(qna)
    deleteUnanswered(qna["qnID"])
    
    checkNotification = createAnswerNotifications(qna)
    updateCMNotification(username)
    if checkNotification:
        results = {"results": "true"}

    results = {"results": "true"}

    client.close()
    return results

# cm add question to knowledge base
def cmAddQNA(qna,username):
    """Adds QNA created by CM to knowledge base.
    
    Args:
    qna (dict) : QNA object 
    username (str) : username of CM 

    """

    collection = db.KnowledgeBase
    uqCollection = db.UnansweredQuestions
    counter = db.QuestionCounter

    # find duplicates in unanswered questions and knowledge base
    duplicate = collection.find_one({"question":qna["question"]},{"_id":0})
    questionDuplicate = uqCollection.find_one({"question":qna["question"]},{"_id":0})

    if ((duplicate != None) or (questionDuplicate != None)):
        return {"error": "duplicate question"}

    # get timezone corrected date
    date = datetime.datetime.now(pytz.utc).astimezone(tz).strftime('%Y-%m-%d %H:%M')
    date = str(date)

    # get qnID
    qnID = int(counter.find_one({"_id":"qnID"})["sequence_value"])
    counter.find_one_and_update({"_id":"qnID"}, {'$inc': {'sequence_value': 1}})
    

    qna["qnID"] = qnID

    qna["username"] = "CM"
    qna["dateAsked"] = str(date)

    qna["CMusername"] = username
    qna["dateAnswered"] = str(date)

    qna["views"] = 0

    collection.insert_one(qna)

    results = {"results": "true"}

    client.close()
    return results

# retrieve qna by qnID
def retrieveQNA(qnID):
    """Retrieves QNA with given qnID.
    
    Args:
    qnID (str) : question ID

    """

    collection = db.KnowledgeBase

    qna = collection.find_one({"qnID":int(qnID)},{"_id":0})

    results = {}
    results["results"] =  qna

    client.close()
    return results


# retrieve all qna
def retrieveAllQNA(userType):
    """Retrieves all QNA. Default sorting depends on user type.
    
    Args:
    userType (str) : user type

    """

    collection = db.KnowledgeBase
    viewTracker = db.ViewTracker

    table = collection.find({},{"_id":0})

    qnaList = []
    for item in table:
        qnID = item["qnID"]
        viewers = viewTracker.find_one({"qnID":qnID},{"_id":0})
        if viewers:
            item["views"] = len(viewers["usersViewed"])
        else:
            item["views"] = 0
        qnaList.append(item)

    qnaList = sorted(qnaList, key=itemgetter('question'))
    if userType=="CM": 
        qnaList = sortByViewsAndDate(qnaList)
    else:
        qnaList = sortByDate(qnaList)
    results = {}
    results["results"] =  qnaList

    client.close()
    return results

#sort qna
def retrieveAllQNABy(retrieveBy,sortBy,filterRef):
    """Retrieves all QNA with filter/sort.
    
    Args:
    retrieveBy (str) : Intent/Category to filter by
    sortBy (str) : Views or Date
    filterRef (bool) : True = only return QNA with reg51 reference 

    """
    collection = db.KnowledgeBase
    viewTracker = db.ViewTracker

    table = collection.find({},{"_id":0})

    if filterRef:
        table = collection.find({"refPages":{ "$exists": "true", "$ne": [] }},{"_id":0})
    
    if retrieveBy:
        if filterRef:
            table = collection.find({"refPages":{ "$exists": "true", "$ne": [] },"intent":retrieveBy},{"_id":0})
        else:
            table = collection.find({"intent":retrieveBy},{"_id":0})

    qnaList = []
    for item in table:
        qnID = item["qnID"]
        viewers = viewTracker.find_one({"qnID":qnID},{"_id":0})
        if viewers:
            item["views"] = len(viewers["usersViewed"])
        else:
            item["views"] = 0
        qnaList.append(item)

    qnaList = sorted(qnaList, key=itemgetter('question'))
    if sortBy=="views": 
        qnaList = sortByViews(qnaList)
    elif sortBy=="date":
        qnaList = sortByDate(qnaList)
    else:
        qnaList = sortByViewsAndDate(qnaList)
    results = {}
    results["results"] =  qnaList

    client.close()
    return results

# get answers for specific question
def getAnswer(question, num=10):
    """Retrieve top "num" similar answers for the given question.
    
    Args:
    question (str) : Search string
    num (int) : Number of results to return

    """
    
    from app.utils.trainModel import retrieveSynonyms

    collection = db.KnowledgeBase
    viewTracker = db.ViewTracker

    quesVector1 = createVector(question.lower())

    intentBoost = 0.04
    entityBoost = 0.4

    #get intents and entities
    intentEntity = interpreter.parse(question)
    intent = intentEntity["intent"]["name"]
    entities = {}
    for entity in intentEntity["entities"]:
        entities[entity["entity"]] = entity["value"]

    # retrieve all qna 
    table = collection.find({},{"_id":0})
    faqList = []
    for item in table:
        qnID = item["qnID"]
        viewers = viewTracker.find_one({"qnID":qnID},{"_id":0})
        if viewers:
            item["views"] = len(viewers["usersViewed"])
        else:
            item["views"] = 0
        faqList.append(item)

    match = []

    # filter by question similarity
    for q in faqList:
        quesVector2 = createVector(q["question"].lower())
        q["similarity"] = getCosSimilarity(quesVector1, quesVector2)
        match.append(q)

    # keep top 20
    match = sorted(match, key=itemgetter('similarity'), reverse=True) 
    top20 = match[:20]

    # adjust similarity by boosting intent/ entities
    mostSim = []
    takenQues = []
    for q in top20:

        if q.get("intent") == intent : 
            q["similarity"] = q["similarity"] + intentBoost
        
        if q.get("entities") != None:

            # get number of entities
            numEnt = 0
            for e in q["entities"]:
                numEnt += len(e)
            
            for entity,value in entities.items():
                if q["entities"].get(entity) != None:
                    if value in q["entities"][entity]:
                        q["similarity"] = q["similarity"] + entityBoost/numEnt

        if q["similarity"] >= 0.4:
            mostSim.append(q)
            takenQues.append(q["qnID"])


    # do keyword search by synonyms if no results
    if len(mostSim) < 3 and len(question.split(" ")) < 4:
        synonyms = retrieveSynonyms()
        keyword = ""
        
        # find the synonyms
        for key, value in synonyms.items():
            quesVector2 = createVector(key.lower())
            if getCosSimilarity(quesVector1, quesVector2) > 0.3:
                keyword = key
                break
            for val in value:
                quesVector2 = createVector(val.lower())
                if getCosSimilarity(quesVector1, quesVector2) > 0.3:
                    keyword = key
            if keyword != "":
                break
        
        # if keyword exists
        if keyword != "":
            keyValues = [key]
            keyValues.extend(synonyms[key])
            for q in faqList:
                added = 0
                if q["qnID"] not in takenQues:
                    if q.get("entities") != None:
                        for entity,value in q["entities"].items():
                            if key in value:
                                mostSim.append(q)
                                added = 1
                                break

                    if added == 0:
                        for value in keyValues:
                            quesVector1 = createVector(value.lower())
                            quesVector2 = createVector(q["question"].lower())
                            q["similarity"] = getCosSimilarity(quesVector1, quesVector2)
                            if q["similarity"] >= 0.3:
                                mostSim.append(q)
                                break    
                        

    # keep num results
    mostSim = sorted(mostSim, key=itemgetter('similarity'), reverse=True) 
    topNum = mostSim[:num]

    results = {
        "results": topNum
    }

    client.close()
    return results

# increment views of question
def incrementViews(qnID,username):
    """Increments the views of the question with the given qnID.
    
    Args:
    qnID (str) : question ID
    username (str) : username of user who viewed the question

    """

    #collection = db.KnowledgeBase
    qnViewTracker = db.ViewTracker

    # retrieve question
    #collection.find_one_and_update({"qnID": int(qnID)}, {'$inc': {'views': 1}})

    #populate question view table to see who have seen the question
    doc = qnViewTracker.find_one({"qnID":qnID},{"_id":0})
    date = datetime.datetime.now(pytz.utc).astimezone(tz).strftime('%Y-%m-%d')

    usersViewed = []
    viewedUsers = {}

    if doc:
        usersViewed = doc["usersViewed"]
        for i in range(len(usersViewed)):
            uvObj = usersViewed[i]
            if username in uvObj.keys():
                usersViewed.pop(i)
                break
        viewedUsers[username] = date
        usersViewed.append(viewedUsers)
        try:
            qnViewTracker.update_one({"qnID":qnID},{"$set":{"usersViewed":usersViewed}})
            #collection.find_one_and_update({"qnID": int(qnID)}, {'$inc': {'views': 1}})
        except Exception as e:
            #collection.find_one_and_update({"qnID": int(qnID)}, {'$inc': {'views': -1}})
            results = {"error":str(e)}
            client.close()
            return results
    else:
        viewedUsers[username] = date
        usersViewed.append(viewedUsers)
        toInsert = {}
        toInsert["qnID"] = qnID
        toInsert["usersViewed"] = usersViewed
        try:
            qnViewTracker.insert_one(toInsert)
            #collection.find_one_and_update({"qnID": int(qnID)}, {'$inc': {'views': 1}})
        except Exception as e:
            #collection.find_one_and_update({"qnID": int(qnID)}, {'$inc': {'views': -1}})
            results = {"error":str(e)}
            client.close()
            return results

    results = {"results": "true"}

    client.close()
    return results


# ------------------------------------------------------------------- #
#                      Unanswered Qns Management                      #
# ------------------------------------------------------------------- #

# add unanswered question
def addQuestion(question,username):
    """Stores question asked by FO.
    
    Args:
    question (str) : question from FO
    username (str) : username of user who asked

    """ 

    counter = db.QuestionCounter
    collection = db.UnansweredQuestions
    questionCollection = db.KnowledgeBase
    qnID = int(counter.find_one({"_id":"qnID"})["sequence_value"])
    counter.find_one_and_update({"_id":"qnID"}, {'$inc': {'sequence_value': 1}})

    # find duplicates in unanswered questions and knowledge base
    duplicate = collection.find_one({"question":question},{"_id":0})
    questionDuplicate = questionCollection.find_one({"question":question},{"_id":0})

    # get timezone corrected date

    date = datetime.datetime.now(pytz.utc).astimezone(tz).strftime('%Y-%m-%d %H:%M')
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
    """Retrieves all unanswered questions."""

    collection = db.UnansweredQuestions
    
    table = collection.find({},{"_id":0})
    questionList = [item for item in table]
    
    results = {"results" : questionList}
    client.close()
    return results

# delete unanswered question
def deleteUnanswered(qnID):
    """Delete an unanswered question with the given qnID.
    
    Args:
    qnID (str) : question ID

    """

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
    """Retrieve all questions asked by the given FO user.
    
    Args:
    username (str) : username

    """

    answeredCollection = db.KnowledgeBase
    unansweredCollection = db.UnansweredQuestions
    viewTracker = db.ViewTracker

    table = answeredCollection.find({"username":username},{"_id":0})
    answeredList = []
    for item in table:
        qnID = item["qnID"]
        viewers = viewTracker.find_one({"qnID":qnID},{"_id":0})
        if viewers:
            item["views"] = len(viewers["usersViewed"])
        else:
            item["views"] = 0
        answeredList.append(item)

    table = unansweredCollection.find({"username":username},{"_id":0})
    unansweredList = [item for item in table]

    results = {}
    results["results"] =  {
        "answered" : answeredList,
        "unanswered" : unansweredList
    }

    client.close()
    return results

# retrieve all questions answered by user
def cmUserRetrieveAllQNA(username):
    """Retrieve all questions answered by the given CM user.
    
    Args:
    username (str) : username

    """

    answeredCollection = db.KnowledgeBase
    viewTracker = db.ViewTracker

    table = answeredCollection.find({"CMusername":username},{"_id":0})
    answeredList = []
    for item in table:
        qnID = item["qnID"]
        viewers = viewTracker.find_one({"qnID":qnID},{"_id":0})
        if viewers:
            item["views"] = len(viewers["usersViewed"])
        else:
            item["views"] = 0
        answeredList.append(item)

    answeredList = sorted(answeredList, key=itemgetter('dateAnswered'), reverse=True) 

    table = answeredCollection.find({"prevAnswer.CMusername": username, "CMusername":{"$ne":username}},{"_id":0})
    prevAnsweredList = [item for item in table]
    prevAnsweredList = sorted(prevAnsweredList, key=itemgetter('dateAnswered'), reverse=True) 

    results = {}
    results["results"] =  {
        "answered" : answeredList,
        "prevAnswered" : prevAnsweredList
    }

    client.close()
    return results

# ------------------------------------------------------------------- #
#                            Helper methods                           #
# ------------------------------------------------------------------- #

def sortByViewsAndDate(qnaList):
    """Sorts given QNA List by views then date.
    
    Args:
    qnaList (list) : list of QNAs 

    """

    if not qnaList:
        return qnaList
    retList = []
    retList.append(qnaList[0])
    for i in range(1,len(qnaList)):
        views = qnaList[i]["views"]
        for j,qnItem in enumerate(retList):
            retViews = qnItem["views"]
            if(views>retViews):
                retList.insert(j,qnaList[i])
                break
            elif(views==retViews):
                dateAsked = qnaList[i]["dateAsked"]
                retDateAsked = qnItem["dateAsked"]
                if(dateAsked>retDateAsked):
                    retList.insert(j,qnaList[i])
                    break
            if(j==len(retList)-1):
                retList.append(qnaList[i])
                break
    return retList

def sortByViews(qnaList):
    """Sorts given QNA List by views.
    
    Args:
    qnaList (list) : list of QNAs 

    """

    if not qnaList:
        return qnaList
    retList = []
    retList.append(qnaList[0])
    for i in range(1,len(qnaList)):
        views = qnaList[i]["views"]
        for j,qnItem in enumerate(retList):
            retViews = qnItem["views"]
            if(views>retViews):
                retList.insert(j,qnaList[i])
                break
            if(j==len(retList)-1):
                retList.append(qnaList[i])
                break
    return retList

def sortByDate(qnaList):
    """Sorts given QNA List by date.
    
    Args:
    qnaList (list) : list of QNAs 

    """

    if not qnaList:
        return qnaList
    retList = []
    retList.append(qnaList[0])
    for i in range(1,len(qnaList)):
        dateAsked = qnaList[i]["dateAsked"]
        for j,qnItem in enumerate(retList):
            retDateAsked = qnItem["dateAsked"]
            if(dateAsked>retDateAsked):
                retList.insert(j,qnaList[i])
                break
            if(j==len(retList)-1):
                retList.append(qnaList[i])
                break
    return retList

def getCosSimilarity(vec1, vec2):
    """Calculates cosine similarity between 2 vectors.
    
    Args:
    vec1 (Counter) : vector of first string
    vec2 (Counter) : vector of second string

    """
     
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
    """Creates a vector of the given text.
    
    Args:
    text (str) : string to convert to vector

    """
    
    regex = re.compile(r'\w+')
    words = regex.findall(text)
    return Counter(words)
