from pymongo import MongoClient
from pymongo import cursor

from app.utils.userCRUD import *

import json
import datetime

client = MongoClient('mongodb://localhost:27017/')
db = client.SpringBoard

def getCompletedClients(username):
    collection = db.Onboards

    results = {}
    rmName = getName(username)
    completedCount = collection.find({"requiredFields.RM Name": rmName,"progress":"100"}).count()
    return completedCount

def getPendingClients(username):
    collection = db.Onboards

    results= {}
    rmName = getName(username)
    totalCount = collection.find({"requiredFields.RM Name": rmName}).count()
    completedCount = getCompletedClients(username)
    return totalCount - completedCount
    
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

def changesInChecklists():
    collection = db.ChecklistLogs


