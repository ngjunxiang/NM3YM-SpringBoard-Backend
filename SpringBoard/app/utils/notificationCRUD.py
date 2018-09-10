from pymongo import MongoClient
from pymongo import cursor

from app.utils.userCRUD import *
import json

client = MongoClient('mongodb://localhost:27017/')
db = client.SpringBoard

def createNotification(clID,version,docID,changed):
    collection = db.Notifications

    counter = db.NotificationCounter
    noID = int(counter.find_one({"_id":"noID"})["sequence_value"])
    db.NotificationCounter.update({"_id":"clID"}, {'$inc': {'sequence_value': 1}})

    rmUsernames = getAllRMUsernames()

    notification = {}
    notification["noID"] = noID
    notification["clID"] = clID
    notification["version"] = version
    notification["docID"] = docID
    rms = []

    for username in rmUsernames:
        rms.append({"username":username,"changed":changed,"checked":False})

    notification["RMs"] = rms

    try:
        collection.insert_one(notification)
    except:
        return False

    client.close()
    return True

def getAllNotifications(username):
    collection = db.Notifications

    table = collection.find({"RMs.username":username},{"_id":0,"clID":1,"version":1,"docID":1})

    results = {}
    notificationList = []
    counter = 0
    for item in table:
        clID = item["clID"]
        version = item["version"]
        docID = item["docID"]
        notification = getChecklistForNotification(clID,version,docID)
        if notification:
            notificationList.append(notification)
            counter += 1
        else:
            notification = getLoggedChecklistForNotification(clID,version,docID)
            if notification:
                notificationList.append(notification)
                counter += 1

    results["totalCount"] = counter
    results["notifications"] = notificationList

    return results

def getNewNotifications(username):
    collection = db.Notifications

    table = collection.find({"RMs.username":username,"RMs.checked":False},{"_id":0,"clID":1,"version":1,"docID":1})
    results = {}
    notificationList = []
    counter = 0
    for item in table:
        clID = item["clID"]
        version = item["version"]
        docID = item["docID"]
        notification = getChecklistForNotification(clID,version,docID)
        if notification:
            notificationList.append(notification)
            counter += 1

    results["count"] = counter
    results["notifications"] = notificationList

    return results

def updateNotification(username):
    collection = db.Notifications

    results = collection.update({"RMs.username":username},{'$set':{"RMs.checked":True}},multi=True)
    return results["ok"] > 0

def getChecklistForNotification(clID,version,docID):
    collection = db.Checklists
    results = {}

    docs = collection.find_one({"clID":clID,"version":version},{"complianceDocuments":1,"legalDocuments":1,"username":1,"dateCreated":1,"_id":0})
    if docs == None:
        return results

    results["username"] = docs.get("username")
    result["dateCreated"] = docs.get("dateCreated")
    for section, value in docs["complianceDocuments"].items():
        for document in value:
            if document.get("docID") == docID:
                results["DocChanged"] = "Compliance Documents"
                results["type"] = document
                break

    if "type" not in results:
        for section, value in docs["legalDocuments"].items():
            for document in value:
                if document.get("docID") == docID:
                    results["DocChanged"] = "Legal Documents"
                    results["type"] = document
                    break

    client.close()
    return results

def getLoggedChecklistForNotification(clID,version,docID):
    collection = db.ChecklistLogs
    results = {}

    docs = collection.find_one({"clID":clID,"version":version},{"complianceDocuments":1,"legalDocuments":1,"username":1,"dateCreated":1,"_id":0})
    if docs == None:
        return results

    results["username"] = docs.get("username")
    result["dateCreated"] = docs.get("dateCreated")
    for section, value in docs["complianceDocuments"].items():
        for document in value:
            if document.get("docID") == docID:
                results["DocChanged"] = "Compliance Documents"
                results["type"] = document
                break

    if "type" not in results:
        for section, value in docs["legalDocuments"].items():
            for document in value:
                if document.get("docID") == docID:
                    results["DocChanged"] = "Legal Documents"
                    results["type"] = document
                    break

    client.close()
    return results
