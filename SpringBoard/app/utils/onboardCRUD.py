from pymongo import MongoClient
from pymongo import cursor

from app.utils.userCRUD import *

import json
import datetime
import pytz

client = MongoClient('mongodb://localhost:27017/')
db = client.SpringBoard

def checkProgress(input):
    compDocs = input["complianceDocuments"]
    legalDocs = input["legalDocuments"]

    compConditional = compDocs["conditional"]
    compMandatory = compDocs["mandatory"]
    compOptional = compDocs["optional"]
    
    legalConditional = legalDocs["conditional"]
    legalMandatory = legalDocs["mandatory"]
    legalOptional = legalDocs["optional"]

    totalCheckBoxes = 0
    totalCheckedBoxes = 0

    for index in compConditional:
        totalCheckBoxes = totalCheckBoxes + 1
        if(index["checked"]):
            totalCheckedBoxes = totalCheckedBoxes + 1

    for index in compMandatory:
        totalCheckBoxes = totalCheckBoxes + 1
        if(index["checked"]):
            totalCheckedBoxes = totalCheckedBoxes + 1

    for index in compOptional:
        totalCheckBoxes = totalCheckBoxes + 1
        if(index["checked"]):
            totalCheckedBoxes = totalCheckedBoxes + 1

    for index in legalConditional:
        totalCheckBoxes = totalCheckBoxes + 1
        if(index["checked"]):
            totalCheckedBoxes = totalCheckedBoxes + 1

    for index in legalMandatory:
        totalCheckBoxes = totalCheckBoxes + 1
        if(index["checked"]):
            totalCheckedBoxes = totalCheckedBoxes + 1

    for index in legalOptional:
        totalCheckBoxes = totalCheckBoxes + 1
        if(index["checked"]):
            totalCheckedBoxes = totalCheckedBoxes + 1

    return round(totalCheckedBoxes/totalCheckBoxes*100,1)

def loadUrgentJson(obID):
    results = {}
    results["obID"] = obID
    results["Urgent"] = False

    return json.loads(results)

def createNewOnBoard(input):

    collection = db.Onboards

    # urgentCollection = db.OnboardUrgentChecker

    counter = db.OnboardCounter

    obID = counter.find_one({"_id":"obID"})["sequence_value"]
    db.OnboardCounter.update({"_id":"obID"}, {'$inc': {'sequence_value': 1}})

    date = datetime.datetime.now(pytz.utc).astimezone(tz)
    date = str(date)
    date = date[:date.index(".")]

    input = json.loads(input)

    progress = checkProgress(input)
    
    input["obID"] =  str(obID)
    input["dateCreated"] =  str(date)
    input["progress"] = str(progress)

    if progress == 100:
        input['dataCompleted'] = str(date)

    results = {'results':'false'}
    
    try:
        collection.insert_one(input)
        # urgentCollection.insert_one(loadUrgentJson(obID))
        results['results'] = 'true' 

    except Exception as e:
        results['error'] = str(e)

    client.close()
    return results

def getAllCurrentOnboards(username):

    rmName = getName(username)
    collection = db.Onboards
    table = collection.find({"requiredFields.RM Name": rmName},{"name":1,"conditions":1,"requiredFields":1,"obID":1,"dateCreated":1,"progress":1,"_id":0})
    results = {}
    obList = [item for item in table]
    results["obLists"] =  obList
    client.close()
    return results

def getSelectedOnboard(obID):

    obCollection = db.Onboards
    clCollection = db.Checklists
    logCollection = db.ChecklistLogs
    
    onboard = obCollection.find_one({"obID":obID},{"_id":0})
    clID = onboard["clID"]
    version = int(onboard["version"])

    current = clCollection.find_one({"clID":clID},{"_id":0})
    clVersion = int(current["version"])

    onboard["version"] = str(clVersion)

    if onboard == None:
        client.close()
        return {'error' : 'Invalid Onboard ID'}

    # if not same version
    if version != clVersion:

        # stacked comparison
        while version < clVersion-1:
            version += 1
            log = logCollection.find_one({"clID":clID, "version":version},{"_id":0})
            # compare each version from oldest
            for section,value in log["complianceDocuments"].items():
                for document in value:
                    if document.get("changed") != "0":
                        added = False
                        # edit/delete
                        index = 0
                        for item in onboard["complianceDocuments"][section]:
                            if item["docID"] == document["docID"]:
                                onboard["complianceDocuments"][section][index] = document
                                added = True
                            index += 1
                        
                        if not added:
                            onboard["complianceDocuments"][section].append(document)

            for section,value in log["legalDocuments"].items():
                for document in value:
                    if document.get("changed") != "0":
                        added = False
                        # edit/delete
                        index = 0
                        for item in onboard["legalDocuments"][section]:
                            if item["docID"] == document["docID"]:
                                onboard["legalDocuments"][section][index] = document
                                added = True
                            index += 1
                        
                        if not added:
                            onboard["legalDocuments"][section].append(document)

        # if diff == 1
        # direct comparison
        for section,value in current["complianceDocuments"].items():
            for document in value:
                if document.get("changed") != "0":
                    added = False
                    # edit/delete
                    index = 0
                    for item in onboard["complianceDocuments"][section]:
                        if item["docID"] == document["docID"]:
                            onboard["complianceDocuments"][section][index] = document
                            added = True
                        index += 1
                    
                    if not added:
                        onboard["complianceDocuments"][section].append(document)

                    

        for section,value in current["legalDocuments"].items():
            for document in value:
                if document.get("changed") != "0":
                    added = False
                    # edit/delete
                    index = 0
                    for item in onboard["legalDocuments"][section]:
                        if item["docID"] == document["docID"]:
                            onboard["legalDocuments"][section][index] = document
                            added = True
                        index += 1
                    
                    if not added:
                        onboard["legalDocuments"][section].append(document)
    client.close()
    return onboard

def deleteSelectedOnboard(obID):

    collection = db.Onboards
    results = {}
    deleted = collection.delete_one({'obID':obID})
    results["results"] = deleted.acknowledged
    results["items_deleted"] = deleted.deleted_count
    client.close()
    return results

def updateSelectedOnboard(obID,input):

    collection = db.Onboards

    deletedResults = deleteSelectedOnboard(obID)

    results = {'results':'false'}

    if(deletedResults["items_deleted"]==0):
        client.close()
        return results

    date = datetime.datetime.now(pytz.utc).astimezone(tz)
    date = str(date)
    date = date[:date.index(".")]

    input = json.loads(input)

    for section,value in input["complianceDocuments"].items():
        docArray = []
        for document in value:
            if document.get("changed") != "3":
                document["changed"] = "0"
                docArray.append(document)
        input["complianceDocuments"][section] = docArray

    for section,value in input["legalDocuments"].items():
        docArray = []
        for document in value:
            if document.get("changed") != "3":
                document["changed"] = "0"
                docArray.append(document)
        input["legalDocuments"][section] = docArray

    progress = checkProgress(input)
    
    input["obID"] =  str(obID)
    input["dateCreated"] =  date
    input["progress"] = str(progress)
    input["urgent"] = getUrgency(obID)

    if progress == 100:
        input['dataCompleted'] = str(date)
    
    try:
        collection.insert_one(input)
        results['results'] = 'true' 
    except Exception as e:
        results['error'] = str(e)

    client.close()
    return results

def getUrgency(obID):

    collection = db.OnboardUrgentChecker

    results = collection.find_one({"obID":obID},{"_id":0})

    if results == None:
        return {'error' : 'Invalid Onboard ID'}

    return results

def updateUrgency(obID,urgency):

    collection = db.OnboardUrgentChecker
    results = {}
    updated = collection.update({'obID':obID},{"$set":{'Urgent':urgency}})
    results["items_updated"] = updated.ok
    client.close()

    return results


