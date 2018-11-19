from pymongo import MongoClient
from pymongo import cursor

from app.utils.userCRUD import *
import json
import pymongo
import datetime
from datetime import timedelta
import pytz

client = MongoClient('mongodb://localhost:27017/')
db = client.SpringBoard
tz = pytz.timezone('Asia/Singapore')

def createNotification(clID,version,docID,changed,input):
    if changed!=3 and not getSelectedNotification(clID,docID,input):
        return False

    collection = db.Notifications

    counter = db.NotificationCounter
    noID = int(counter.find_one({"_id":"noID"})["sequence_value"])
    db.NotificationCounter.update({"_id":"noID"}, {'$inc': {'sequence_value': 1}})

    rmUsernames = getAllRMUsernames()
    maUsernames = getAllMAUsernames()

    notification = {}
    notification["noID"] = noID
    notification["clID"] = clID
    notification["version"] = version
    notification["docID"] = docID
    rms = []
    usernameList = []

    for username in rmUsernames:
        rms.append({"username":username,"changed":changed,"checked":False})
        usernameList.append(username)
    for username in maUsernames:
        rms.append({"username":username,"changed":changed,"checked":False})
        usernameList.append(username)

    notification["RMs"] = rms
    notification["usernameList"] = usernameList

    try:
        results = collection.insert_one(notification)
    except:
        return False

    client.close()
    return True

def createQuestionNotifications(question,username,qnID):
    collection = db.QuestionNotifications
    counter = db.QuestionNotificationCounter

    noID = int(counter.find_one({"_id":"noID"})["sequence_value"])
    db.QuestionNotificationCounter.update({"_id":"noID"}, {'$inc': {'sequence_value': 1}})
    
    cmUsernames = getAllCMUsernames()

    notification = {}
    notification["noID"] = noID
    notification["qnID"] = qnID
    notification["question"] = question
    notification["username"] = username

    cms = []
    usernameList = []

    for username in cmUsernames:
        cms.append({"username":username,"checked":False})
        usernameList.append(username)

    notification["CMs"] = cms
    notification["usernameList"] = usernameList
    notification["isAnswered"] = False

    try:
        collection.insert_one(notification)
    except:
        return False

    client.close()
    return True

def createAnswerNotifications(qna):
    collection = db.AnswerNotifications
    counter = db.AnswerNotificationCounter
    questionCollection = db.QuestionNotifications

    noID = int(counter.find_one({"_id":"noID"})["sequence_value"])
    db.AnswerNotificationCounter.update({"_id":"noID"}, {'$inc': {'sequence_value': 1}})
    

    notification = {}
    notification["noID"] = noID
    qnID = qna["qnID"]
    username = questionCollection.find_one({"qnID":qnID})["username"]

    notification["qnID"] = qnID
    notification["question"] = qna["question"]
    notification["answer"] = qna["answer"]
    notification["username"] = username
    notification["checked"] = False

    try:
        collection.insert_one(notification)
    except:
        return False

    client.close()
    return True

def createReq51UploadNotification():
    collection = db.Req51Notifications

    date = datetime.datetime.now(pytz.utc).astimezone(tz).strftime('%Y-%m-%d')
    date = str(date)

    checkForRec = collection.find_one()

    try:
        if not checkForRec:
            toInsert = {}
            toInsert["toShow"] = True
            toInsert["date"] =  date
            collection.insert_one(toInsert)
        else:
            collection.update({},{"toShow":True,"date":date})
    except:
        return False

    return True


def createQnAUpdateNotification(qnID):
    collection = db.QnANotifications
    counter = db.QnANotificationCounter
    viewTracker = db.ViewTracker
    kBCollection = db.KnowledgeBase

    date = datetime.datetime.now(pytz.utc).astimezone(tz)
    thirtyDaysAgo = date - timedelta(days=31)
    thirtyDaysAgo = thirtyDaysAgo.strftime('%Y-%m-%d')

    table =  viewTracker.find({"qnID":qnID},{"_id":0})
    
    usersViewed = []
    usernameList = []
    for item in table:
        usersViewed = item["usersViewed"]
        for i in range(len(usersViewed)):
            usernameView = list(usersViewed[i].keys())[0]
            userViewedDate = usersViewed[i][usernameView]
            if(userViewedDate > thirtyDaysAgo):
                usernameList.append(usernameView)

    
    noID = int(counter.find_one({"_id":"noID"})["sequence_value"])
    db.QnANotificationCounter.update({"_id":"noID"}, {'$inc': {'sequence_value': 1}})


    fos = []

    for username in usernameList:
        fos.append({"username":username,"checked":False})

    notification = {}
    notification["noID"] = noID
    notification["FOs"] = fos
    notification["usernameList"] = usernameList
    notification["qnID"] = qnID

    kBTable = kBCollection.find_one({"qnID":qnID},{"_id":0,"question":1,"answer":1})

    notification["question"] = kBTable["question"]
    notification["answer"] = kBTable["answer"]

    try:
        collection.insert_one(notification)
    except:
        return False

    return True

def getAllNotifications(username):
    collection = db.Notifications

    table = collection.find({"RMs.username":username},{"_id":0,"clID":1,"version":1,"docID":1,"RMs.changed":1})

    results = {}
    notificationList = []
    counter = 0
    for item in table:
        clID = item["clID"]
        version = item["version"]
        docID = item["docID"]
        rms = item["RMs"]
        changed = rms[0]["changed"]
        notification = getChecklistForNotification(clID,version,docID)
        if notification:
            notificationList.append(notification)
            counter += 1
        else:
            notification = getLoggedChecklistForNotification(clID,version,docID,changed)
            if notification:
                notificationList.append(notification)
                counter += 1
    
    results["totalCount"] = counter
    notificationList = sortNotifications(notificationList)
    results["notifications"] = notificationList

    return results

def getFONotifications(username):
    collection = db.Notifications
    ansCollection = db.AnswerNotifications
    qnaCollection = db.QnANotifications

    allNoti = collection.find({"RMs.username":username},{"_id":0,"clID":1,"version":1,"docID":1,"RMs":1,"usernameList":1})
    ansNoti = ansCollection.find({"username":username,"checked":False},{"_id":0,"qnID":1,"question":1,"answer":1}).sort("noID",pymongo.DESCENDING)
    ansCount = ansCollection.find({"username":username,"checked":False}).count()
    qnaNoti = qnaCollection.find({"FOs.username":username,"FOs.checked":False},{"_id":0,"qnID":1,"question":1,"answer":1}).sort("noID",pymongo.DESCENDING)
    qnaCount = qnaCollection.find({"FOs.username":username,"FOs.checked":False},{}).count()

    results = {}
    allNotiCounter = 0
    notificationList = []
    newNotiCounter = 0
    oldNotiCounter = 0
    for item in allNoti:
        userIndex = 0
        usernameList = item["usernameList"]

        for i,user in enumerate(usernameList):
            if user == username:
                userIndex = i
                break

        rms = item["RMs"]
        checked = rms[userIndex]["checked"]
        changed = rms[userIndex]["changed"]
        
        clID = item["clID"]
        version = item["version"]
        docID = item["docID"]
        notification = getChecklistForNotification(clID,version,docID)
        if notification:
            notification["checked"] = checked
            if not checked:
                newNotiCounter += 1
                notificationList.append(notification)
            else:
                oldNotiCounter += 1
                notificationList.append(notification)
                
            allNotiCounter += 1
        else:
            notification = getLoggedChecklistForNotification(clID,version,docID,changed)
            if notification:
                notification["checked"] = checked
                if not checked:
                    newNotiCounter += 1
                    notificationList.append(notification)
                else:
                    oldNotiCounter += 1
                    notificationList.append(notification)

                allNotiCounter += 1



    results["checklistTotalCount"] = allNotiCounter
    results["checkListNewCount"] = newNotiCounter
    results["checkListOldCount"] = oldNotiCounter
    notificationList = sortNotifications(notificationList)
    results["checkListNotifications"] = notificationList

    ansNotificationList = [item for item in ansNoti]
    results["answerCount"] = ansCount
    results["answerNotifications"] = ansNotificationList

    qnaNotificationList = [item for item in qnaNoti]
    results["qnaCount"] = qnaCount
    results["qnaNotifications"] = qnaNotificationList

    return results

def getCMNotifications(username):
    collection = db.QuestionNotifications

    allNoti = collection.find({"CMs.username":username},{"_id":0,"noID":1,"qnID":1,"question":1,"CMs":1,"isAnswered":1,"usernameList":1}).sort("noID",pymongo.DESCENDING)

    results = {}
    newNotiCounter = 0
    notificationList = []
    oldNotiCounter = 0
    counter = 0

    for item in allNoti:
        counter += 1
        userIndex = 0
        usernameList = item["usernameList"]

        for i,user in enumerate(usernameList):
            if user == username:
                userIndex = i
                break

        cms = item["CMs"]
        checked = cms[userIndex]["checked"]
        isAnswered = item["isAnswered"]

        notification = {}
        notification["noID"] = item["noID"]
        notification["qnID"] = item["qnID"]
        notification["question"] = item["question"]
        notification["isAnswered"] = item["isAnswered"]
        notification["checked"] = checked

        if not checked and not isAnswered:
            newNotiCounter += 1
            notificationList.append(notification)
        else:
            oldNotiCounter += 1
            notificationList.append(notification)

    results["totalCount"] = counter
    results["newCount"] = newNotiCounter
    results["notifications"] = notificationList
    results["oldCount"] = oldNotiCounter

    return results

def getReg51Notification():
    collection = db.Req51Notifications

    reg51Notification = collection.find_one({},{"_id":0})
    
    if not reg51Notification or not reg51Notification["toShow"]:
        return {"toShow": False}

    return {"toShow":True,"lastUpdatedDate":reg51Notification["date"]}
    
    
        

# def getNewNotifications(username):
#     collection = db.Notifications

#     table = collection.find({"RMs.username":username,"RMs.checked":False},{"_id":0,"clID":1,"version":1,"docID":1,"RMs.changed":1})
#     results = {}
#     notificationList = []
#     counter = 0
#     for item in table:
#         clID = item["clID"]
#         version = item["version"]
#         docID = item["docID"]
#         rms = item["RMs"]
#         changed = rms[0]["changed"]
#         notification = getChecklistForNotification(clID,version,docID)
#         if notification:
#             notificationList.append(notification)
#             counter += 1
#         else:
#             notification = getLoggedChecklistForNotification(clID,version,docID,changed)    
#             if notification:
#                 notificationList.append(notification)
#                 counter += 1

#     results["count"] = counter
#     notificationList = sortNotifications(notificationList)
#     results["notifications"] = notificationList

#     return results

def updateChecklistNotification(username):
    collection = db.Notifications

    try:
        results = collection.update({"RMs.username":username},{'$set':{"RMs.$.checked":True}},multi=True)
    except:
        return False
    return True

def updateReq51Notification(triggerNoti):
    collection = db.Req51Notifications
    dateCheck = collection.find_one({},{"_id":0,"date":1})
    if dateCheck:
        date = dateCheck["date"]
    else:
        return False
    try:
        collection.update({},{"toShow":triggerNoti,"date":date})
            
    except:
        return False
    return True

def updateAnswerNotification(username):
    collection = db.AnswerNotifications

    try:
        results = collection.update({"username":username},{'$set':{"checked":True}},multi=True)
    except:
        return False
    return True

def updateCMNotification(username):
    collection = db.QuestionNotifications

    try:
        results = collection.update({"CMs.username":username},{'$set':{"CMs.$.checked":True,"isAnswered":True}},multi=True)
    except:
        return False
    return True

def updateQnANotification(username):
    collection = db.QnANotifications
    try:
        results = collection.update({"FOs.username":username},{'$set':{"FOs.$.checked":True}},multi=True)
    except:
        return False
    return True

def getChecklistForNotification(clID,version,docID):
    collection = db.Checklists
    results = {}

    docs = collection.find_one({"clID":clID,"version":version},{"complianceDocuments":1,"legalDocuments":1,"name":1,"dateCreated":1,"_id":0})
    if docs == None:
        return results

    results["name"] = docs.get("name")
    results["dateCreated"] = docs.get("dateCreated")
    for section, value in docs["complianceDocuments"].items():
        for document in value:
            if document.get("docID") == docID:
                results["docChanged"] = "Compliance Documents"
                results["type"] = document
                break

    if "type" not in results:
        for section, value in docs["legalDocuments"].items():
            for document in value:
                if document.get("docID") == docID:
                    results["docChanged"] = "Legal Documents"
                    results["type"] = document
                    break

    client.close()
    return results

def getLoggedChecklistForNotification(clID,version,docID,changed):
    collection = db.ChecklistLogs
    results = {}

    docs = collection.find_one({"clID":clID,"version":version},{"complianceDocuments":1,"legalDocuments":1,"name":1,"dateCreated":1,"_id":0})
    if docs == None:
        return results

    results["name"] = docs.get("name")
    results["dateCreated"] = docs.get("dateCreated")
    for section, value in docs["complianceDocuments"].items():
        for document in value:
            if document.get("docID") == docID:
                if changed == 3:
                    document["changed"] = str(changed)
                results["docChanged"] = "Compliance Documents"
                results["type"] = document
                break

    if "type" not in results:
        for section, value in docs["legalDocuments"].items():
            for document in value:
                if document.get("docID") == docID:
                    if changed == 3:
                        document["changed"] = str(changed)
                    results["docChanged"] = "Legal Documents"
                    results["type"] = document
                    break

    client.close()
    return results

def getSelectedNotification(clID,docID,input):
    logCollection = db.ChecklistLogs
    clCollection = db.Checklists

    preCL = logCollection.find({"clID":clID},{"_id":0})

    if preCL == None:
        return True

    for item in preCL:
        for section,value in item["complianceDocuments"].items():
            for doc1 in value:
                if doc1.get("docID") == docID:
                    for sect,val in input["complianceDocuments"].items():
                        for doc2 in val:
                            docNameCheck = doc1.get("documentName") == doc2.get("documentName")
                            agmtCheck = doc1.get("agmtCode") == doc2.get("agmtCode")
                            signCheck = doc1.get("signature") == doc2.get("signature")
                            remarksCheck = doc1.get("remarks") == doc2.get("remarks")
                            waiverCheck = doc1.get("canWaiver") == doc2.get("canWaiver")
                            if (docNameCheck and agmtCheck and signCheck and remarksCheck and waiverCheck):
                                return False

        for section,value in item["legalDocuments"].items():
            for doc1 in value:
                if doc1.get("docID") == docID:
                    for sect,val in input["legalDocuments"].items():
                        for doc2 in val:
                            docNameCheck = doc1.get("documentName") == doc2.get("documentName")
                            agmtCheck = doc1.get("agmtCode") == doc2.get("agmtCode")
                            signCheck = doc1.get("signature") == doc2.get("signature")
                            remarksCheck = doc1.get("remarks") == doc2.get("remarks")
                            waiverCheck = doc1.get("canWaiver") == doc2.get("canWaiver")
                            if (docNameCheck and agmtCheck and signCheck and remarksCheck and waiverCheck):
                                return False

    return True


#sorting methods

def sortNotifications(notificationList):
    if not notificationList:
        return notificationList
    sortedList = []
    if not sortedList:
        sortedList.append(notificationList[0])
    
    for i in range(1,len(notificationList)):
        itemDate = notificationList[i].get("dateCreated")
        itemType = notificationList[i].get("type")
        itemDocID = int(itemType.get("docID"))
        itemChanged = itemType.get("changed")
        for j,noti in enumerate(sortedList):
            date = noti.get("dateCreated")
            type = noti.get("type")
            docID = int(type.get("docID"))
            changed = type.get("changed")
            if itemDate > date:
                sortedList.insert(j,notificationList[i])
                break
            elif date == itemDate:
                if int(itemChanged) > int(changed):
                    sortedList.insert(j,notificationList[i])
                    break
                elif itemDocID < docID:
                    sortedList.insert(j,notificationList[i])
                    break
            if j == len(sortedList)-1:
                sortedList.append(notificationList[i])
                break

    return sortedList
        

