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
    notification = json.loads(notification)

    try:
        collection.insert_one(notification)
    except:
        return False

    client.close()
    return True

def getNotifications(username):
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
        notificationList.append(notification)
        counter += 1

    results["count"] = counter
    results["notifications"] = notificationList

    return results

