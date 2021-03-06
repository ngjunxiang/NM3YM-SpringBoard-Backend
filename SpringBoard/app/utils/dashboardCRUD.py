from pymongo import MongoClient
from pymongo import cursor
import pymongo

from app.utils.userCRUD import *
from app.utils.notificationCRUD import *

import json
import datetime
import itertools
import collections

client = MongoClient('mongodb://localhost:27017/')
db = client.SpringBoard

# retrieve number of completed onboards for given RM
def getCompletedClients(username,userType):
    """Retrieves count of number of completed clients for specific user.

    Args:
    username (str) : username 
    userType (str) : user type

    """    

    collection = db.Onboards

    name = getName(username)
    completedCount = 0

    if (userType =="RM"):
        completedCount = collection.find({"requiredFields.RM Name": name,"progress":100}).count()
    else:
        completedCount = collection.find({"createdBy": name,"progress":100}).count()

    return completedCount

# retrieve number of pending onboards for given RM
def getPendingClients(username,userType):
    """Retrieves count of number of pending clients for specific user.

    Args:
    username (str) : username 
    userType (str) : user type

    """    

    collection = db.Onboards

    name = getName(username)
    totalCount = 0
    if (userType=="RM"):
        totalCount = collection.find({"requiredFields.RM Name": name}).count()
    else:
        totalCount = collection.find({"createdBy": name}).count()
    
    completedCount = getCompletedClients(username,userType)

    return totalCount - completedCount

def getAllPendingClients(username,userType):
    """Retrieves all pending clients for specific user.

    Args:
    username (str) : username 
    userType (str) : user type

    """    

    collection = db.Onboards

    name = getName(username)
    table = collection.find({"requiredFields.RM Name": name,"progress":{"$lt":100}},{"clID":1,"obID":1,"name":1,"requiredFields":1,"dateCreated":1,"_id":0})
    if (userType=="MA"):
        table = collection.find({"createdBy": name,"progress":{"$lt":100}},{"clID":1,"obID":1,"name":1,"requiredFields":1,"dateCreated":1,"_id":0})

    pendingList = [item for item in table]

    return pendingList

# retrieve all completed onboards for given RM
def getOnboardedClients(username,userType):
    """Retrieves all completed clients for specific user.

    Args:
    username (str) : username 
    userType (str) : user type

    """    

    collection = db.Onboards

    name = getName(username)

    
    table = collection.find({"requiredFields.RM Name": name,"progress":100},{"dateCompleted":1,"_id":0})
    if (userType=="MA"):
        table = collection.find({"createdBy": name,"progress":100},{"dateCompleted":1,"_id":0})
    
    results = {}

    for item in table:
        date = item["dateCompleted"]
        year = date[:4]
        month = int(date[5:7])
        if year in results.keys():
            months = results[year]
            months[month] = months[month] + 1
            results[year] = months
        else:
            months = {
                1 : 0,
                2 : 0,
                3 : 0,
                4 : 0,
                5 : 0,
                6 : 0,
                7 : 0,
                8 : 0,
                9 : 0,
                10 : 0,
                11 : 0,
                12 : 0
            }
            months[month] = months[month] + 1   
            results[year] = months

    return results

def changesInChecklists(username):
    """Retrieves checklist changes by username.

    Args:
    username (str) : username 

    """    

    checkLists = getAllNotifications(username)

    cl = collections.OrderedDict(checkLists)

    if len(cl) < 10:
        return cl

    return itertools.islice(cl.items(),0,10)

def clientsAffectedByChanges(username,userType):
    """Retrieves affected clients by user.

    Args:
    username (str) : username 
    userType (str) : user type

    """    

    notiCollection = db.Notifications
    onboardCollection = db.Onboards

    noti = notiCollection.find({},{"_id":0,"noID":1,"clID":1}).sort("noID",pymongo.DESCENDING).limit(10)
    onboardsList = []
    name = getName(username)
    obIDList = []

    for item in noti:
        clID = item["clID"]
        
        if userType=="RM":
            onboards = onboardCollection.find({"clID":clID,"requiredFields.RM Name": name},{"_id":0,"requiredFields": 1,"progress":1,"name":1,"obID":1})
        elif userType=="MA":
            onboards = onboardCollection.find({"clID":clID,"createdBy": name},{"_id":0,"requiredFields": 1,"progress":1,"name":1,"obID":1})
        else:
            return onboardsList

        for ob in onboards:
            if ob.get("progress") != 100.0:
                data = {}
                obID = ob.get("obID")
                data["obID"] = obID
                data["Client"] = ob.get("requiredFields")[0]["Client Name"]
                data["DocName"] = ob.get("name")
                if obID not in obIDList:
                    onboardsList.append(data)
                    obIDList.append(obID)
                   

    return onboardsList

def getUpdatedChecklists():
    """Retrieves checklists that have been updated."""    

    collection = db.Checklists

    table = collection.find({},{"_id":0,"clID":1,"name":1,"dateCreated":1,"dateUpdated":1})

    clList = []
    for item in table:
        cl = {}
        if item["dateCreated"] != item["dateUpdated"]:
            cl["clID"] = item["clID"]
            cl["name"] = item["name"]
            cl["dateUpdated"] = item["dateUpdated"]
            clList.append(cl)
    
    return clList

def unansweredQuestions():
    """Retrieves count of number of unanswered questions."""    

    questionCollection = db.QuestionNotifications

    unansweredCount = questionCollection.find({"isAnswered":False}).count()

    return unansweredCount

    

def numberOfAnsweredQuestions(username):
    """Retrieves count of number of answered questions.
    
    Args:
    username (str) : username 

    """    

    knowledgeCollection = db.KnowledgeBase

    answeredCount = knowledgeCollection.find({"username":username}).count()

    return answeredCount

def mostRecentQuestions():
    """Retrieves the most recent questions.""" 

    unansweredCollection = db.UnansweredQuestions

    questionTable = unansweredCollection.find({},{"_id":0}).sort("qnID",pymongo.DESCENDING)
    unansweredCount = unansweredCollection.find().count()

    questionList = []

    for item in questionTable:
        item["answer"] = "unanswered"
        questionList.append(item)

    if unansweredCount < 10:
        qnaCollection = db.KnowledgeBase
        limit = 10 - unansweredCount
        qnaTable = qnaCollection.find({},{"_id":0,"qnID":1,"question":1,"answer":1,"qnIDRef":1}).sort("qnID",pymongo.DESCENDING).limit(limit)

        for item in qnaTable:
            questionList.append(item)

    return questionList
        
def mostPopularQuestions():
    """Retrieves the most viewed questions.""" 

    viewTrackerCollection = db.ViewTracker
    kBCollection = db.KnowledgeBase

    viewTrackerTable = viewTrackerCollection.find({},{"_id":0,"qnID":1,"usersViewed":1})

    viewTrackerList = []

    for item in viewTrackerTable:
        newQNA = {}
        viewsCount = len(item["usersViewed"])
        newQNA["viewCount"] = viewsCount
        qnID = item["qnID"]
        newQNA["qnID"] = qnID
        kBObj = kBCollection.find_one({"qnID":qnID},{"_id":0,"question":1,"answer":1,"qnIDRef":1})
        newQNA["question"] = kBObj["question"]
        newQNA["answer"] = kBObj["answer"]
        viewTrackerList.append(newQNA)
        
    viewTrackerList = sortQNAListByViews(viewTrackerList)


    return viewTrackerList[:5]

def mostRecentAnswerQuestions(username):

    collection = db.KnowledgeBase

    table = collection.find({"username":username},{"_id":0,"qnID":1,"question":1,"dateAnswered":1,"qnIDRef":1,"answer":1})
    qnList = [item for item in table]
    sortedQnList = []
    if not qnList:
        return qnList
    sortedQnList.append(qnList[0])

    for i in range(1,len(qnList)):
        date = qnList[i]["dateAnswered"]
        dateInDateTime = datetime.datetime.strptime(date, '%Y-%m-%d %H:%M')
        for j, item in enumerate(sortedQnList):
            sortedDate = item["dateAnswered"]
            sortedDateInDateTime = datetime.datetime.strptime(sortedDate, '%Y-%m-%d %H:%M')
            if sortedDateInDateTime >=  dateInDateTime:
                sortedQnList.insert(j,qnList[i])
                break
            if j == len(sortedQnList)-1:
                sortedQnList.append(qnList[i])
                break

    return sortedQnList[:5]



def sortQNAListByViews(qnaList):
    """Retrieves the most viewed questions.

    Args:
    qnaList (list) : list of qna
    
    """ 

    retQNAList = []
    
    if not qnaList:
        return qnaList

    retQNAList.append(qnaList[0])
    for i in range(1,len(qnaList)):
        qnaViewsCount = qnaList[i]["viewCount"]
        for j,item in enumerate(retQNAList):
            retqnaViewsCount = item["viewCount"]
            if(qnaViewsCount>retqnaViewsCount):
                retQNAList.insert(j,qnaList[i])
                break
            if(len(retQNAList)-1 == j):
                retQNAList.append(qnaList[i])
                break

    return retQNAList

