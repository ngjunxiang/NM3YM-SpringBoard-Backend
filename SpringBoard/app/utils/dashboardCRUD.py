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
def getCompletedClients(username):

    collection = db.Onboards

    rmName = getName(username)
    completedCount = collection.find({"requiredFields.RM Name": rmName,"progress":"100"}).count()

    return completedCount

# retrieve number of pending onboards for given RM
def getPendingClients(username):
    collection = db.Onboards

    rmName = getName(username)
    totalCount = collection.find({"requiredFields.RM Name": rmName}).count()
    completedCount = getCompletedClients(username)

    return totalCount - completedCount
    
# retrieve all completed onboards for given RM
def getOnboardedClients(username):
    collection = db.Onboards

    rmName = getName(username)
    table = collection.find({"requiredFields.RM Name": rmName,"progress":"100"},{"dateCompleted":1,"_id":0})
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
    checkLists = getAllNotifications(username)

    cl = collections.OrderedDict(checkLists)

    if len(cl) < 10:
        return cl

    return itertools.islice(cl.items(),0,10)

def clientsAffectedByChanges(username):
    notiCollection = db.Notifications
    onboardCollection = db.Onboards

    noti = notiCollection.find({},{"_id":0,"clID":1,"version":1}).sort([["noID",pymongo.DESCENDING]]).limit(10)
    onboardsList = []
    rmName = getName(username)

    for item in noti:
        clID = item["clID"]
        version = item["version"]

        onboards = onboardCollection.find({"clID":clID,"version":version,"requiredFields.RM Name": rmName},{"_id":0,"requiredFields.Client Name": 1,"progress":1,"name":1})
        
        for ob in onboards:
            if int(ob.get("progress")) != 100:
                data = {}
                data["Client"] = ob.get("requiredFields.Client Name")
                data["DocName"] = ob.get("name")
                onboardsList.append(data)

    return onboardsList
    





