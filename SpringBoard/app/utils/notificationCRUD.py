from pymongo import MongoClient
from pymongo import cursor

from app.utils.userCRUD import *
import json

client = MongoClient('mongodb://localhost:27017/')
db = client.SpringBoard

def createNotification(clID,version,docID,changed,input):
    if changed!=3 and not getSelectedNotification(clID,docID,input):
        return False

    collection = db.Notifications

    counter = db.NotificationCounter
    noID = int(counter.find_one({"_id":"noID"})["sequence_value"])
    db.NotificationCounter.update({"_id":"noID"}, {'$inc': {'sequence_value': 1}})

    rmUsernames = getAllRMUsernames()

    notification = {}
    notification["noID"] = noID
    notification["clID"] = clID
    if changed == 3:
        notification["version"] = str(int(version)-1)
    else:
        notification["version"] = version
    notification["docID"] = docID
    rms = []

    for username in rmUsernames:
        rms.append({"username":username,"changed":changed,"checked":False})

    notification["RMs"] = rms

    try:
        results = collection.insert_one(notification)
        print(results)
    except:
        return False

    client.close()
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

def getNotifications(username):
    collection = db.Notifications

    allNoti = collection.find({"RMs.username":username},{"_id":0,"clID":1,"version":1,"docID":1,"RMs.checked":1,"RMs.changed":1})

    results = {}
    allNotiCounter = 0
    #allNotificationList = []
    newNotificationList = []
    oldNotificationList = []
    newNotiCounter = 0
    for item in allNoti:
        rms = item["RMs"]
        checked = rms[0]["checked"]
        changed = rms[0]["changed"]
        
        clID = item["clID"]
        version = item["version"]
        docID = item["docID"]
        notification = getChecklistForNotification(clID,version,docID)
        if notification:
            notification["checked"] = checked
            if not checked:
                newNotiCounter += 1
                newNotificationList.append(notification)
            else:
                oldNotificationList.append(notification)
            #allNotificationList.append(notification)
            allNotiCounter += 1
        else:
            notification = getLoggedChecklistForNotification(clID,version,docID,changed)
            if notification:
                notification["checked"] = checked
                if not checked:
                    newNotiCounter += 1
                    newNotificationList.append(notification)
                else:
                    oldNotificationList.append(notification)
                #allNotificationList.append(notification)
                allNotiCounter += 1

    results["totalCount"] = allNotiCounter
    results["newCount"] = newNotiCounter
    #allNotificationList = sortNotifications(allNotificationList)
    newNotificationList = sortNotifications(newNotificationList)
    oldNotificationList = sortNotifications(oldNotificationList)
    results["newNotifications"] = newNotificationList
    results["oldNotifications"] = oldNotificationList
    #results["notifications"] = allNotificationList

    return results

def getNewNotifications(username):
    collection = db.Notifications

    table = collection.find({"RMs.username":username,"RMs.checked":False},{"_id":0,"clID":1,"version":1,"docID":1,"RMs.changed":1})
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

    results["count"] = counter
    notificationList = sortNotifications(notificationList)
    results["notifications"] = notificationList

    return results

def updateNotification(username):
    collection = db.Notifications

    results = collection.update({"RMs.username":username},{'$set':{"RMs.$.checked":True}},multi=True)
    return results["ok"] > 0

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
            else:
                sortedList.append(notificationList[i])

    return sortedList
        