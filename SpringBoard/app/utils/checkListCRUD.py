from pymongo import MongoClient
from pymongo import cursor
import json
import datetime
import pytz

client = MongoClient('mongodb://localhost:27017/')
db = client.SpringBoard
tz = pytz.timezone('Asia/Singapore')

def createCheckList(input,name):

    collection = db.Checklists

    counter = db.ChecklistCounter

    clID = int(counter.find_one({"_id":"clID"})["sequence_value"])
    db.ChecklistCounter.update({"_id":"clID"}, {'$inc': {'sequence_value': 1}})

    date = datetime.datetime.now(pytz.utc).astimezone(tz)
    date = str(date)
    date = date[:date.index(".")]

    latestDocID = 0
    input = json.loads(input)   

    for section,value in input["complianceDocuments"].items():
        for document in value:
            document["docID"] = str(latestDocID)
            document["changed"] = "0"
            latestDocID += 1

    for section,value in input["legalDocuments"].items():
        for document in value:
            document["docID"] = str(latestDocID)
            document["changed"] = "0"
            latestDocID += 1

    input["latestDocID"] =  str(latestDocID)

    input["clID"] =  str(clID)

    input["version"] =  "1"

    input["status"] =  "valid"

    input["dateCreated"] =  date

    input["updatedBy"] =  name

    checklist = input

    results = {'results':'false'}
    
    try:
        collection.insert_one(checklist)
        results['results'] = 'true' 
    except Exception as e:
        results['error'] = str(e)

    client.close()
    return results

def updateCheckList(input,name,clID,version):
    
    logsCollection = db.ChecklistLogs
    collection = db.Checklists

    date = datetime.datetime.now(pytz.utc).astimezone(tz)
    date = str(date)
    date = date[:date.index(".")]

    input = json.loads(input)  

    prevCL = logsCollection.find_one({"clID": str(clID),"version": str(version-1)})

    latestDocID = int(prevCL["latestDocID"])

    # "changed" 
    #  0 = same
    #  1 = edited
    #  2 = new
    #  3 = deleted
    for section,value in input["complianceDocuments"].items():
        index = 0
        for document in value:
            # if added document
            if document.get("docID") == "":
                input["complianceDocuments"][section][index]["docID"] = str(latestDocID)
                latestDocID += 1
            index += 1

    for section,value in input["legalDocuments"].items():
        index = 0
        for document in value:
            if document.get("docID") == "":
                input["legalDocuments"][section][index]["docID"] = str(latestDocID)
                latestDocID += 1
            index += 1

    input["latestDocID"] =  str(latestDocID) 

    input["clID"] =  str(clID) 

    input["version"] =  str(version)

    input["dateCreated"] =  date

    input["updatedBy"] =  name

    checklist = input

    results = {'results':'false'}
    
    try:
        collection.insert_one(checklist)
        results['results'] = 'true' 
    except Exception as e:
        results['error'] = str(e)

    client.close()
    return results

def deleteCheckList(clID):

    collection = db.Checklists
    results = {}
    deleted = collection.delete_one({'clID':clID})
    results["results"] = deleted.acknowledged
    results["items_deleted"] = deleted.deleted_count
    client.close()
    return results

def getCLversion(clID):
    collection = db.Checklists
    return collection.find_one({"clID": clID })["version"]

def retrieveCheckListByName():

    collection = db.Checklists

    table = collection.find({},{"name":1,"dateCreated":1,"updatedBy":1, "clID":1, "version":1,"_id":0})
    results = {}
    clList = [item for item in table]
    results["clNames"] =  clList
    client.close()
    return results

def retrieveCheckList(clID):

    collection = db.Checklists
    
    results = collection.find_one({'clID':clID},{"_id":0})
    if results == None:
        return {'error' : 'Invalid Checklist ID' }
    
    # remove deleted values
    
    for section,value in results["complianceDocuments"].items():
        docArray = []
        for document in value:
            if document.get("changed") != "3":
                docArray.append(document)
        results["complianceDocuments"][section] = docArray

    for section,value in results["legalDocuments"].items():
        docArray = []
        for document in value:
            if document.get("changed") != "3":
                docArray.append(document)
        results["legalDocuments"][section] = docArray

    return results

def logCheckList(clID,toDelete = False):
    prevChecklist = retrieveCheckList(clID)
    
    if('error' in prevChecklist):
        client.close()
        return prevChecklist

    if toDelete:
        prevChecklist["status"] = "deleted"
    
    newCollection = db.ChecklistLogs

    results = {}

    try:
        newCollection.insert_one(prevChecklist)
        results['results'] = 'true' 
    except Exception as e:
        results['error'] = str(e)

    client.close()

    return results

def retrieveNamesWithVersions():
    collection = db.Checklists
    delCollection = db.ChecklistLogs

    results = {}

    currentCLs = collection.find({},{"clID":1,"name":1,"version":1,"_id":0})

    currCLVer = []
    
    for checklist in currentCLs:
        cl = {}
        cl["clID"] = checklist["clID"]
        cl["name"] = checklist["name"]

        version = int(checklist["version"])
        versions = []

        while version > 0:
            versions.append(version)
            version -= 1
        
        cl["versions"] = versions
        currCLVer.append(cl)
    
    results["current"] = currCLVer

    delCLs = delCollection.find({"status":"deleted"},{"clID":1,"name":1,"version":1,"_id":0})

    delCLVer = []
    
    for checklist in delCLs:
        cl = {}
        cl["clID"] = checklist["clID"]
        cl["name"] = checklist["name"]

        version = int(checklist["version"])
        versions = []

        while version > 0:
            versions.append(version)
            version -= 1
        
        cl["versions"] = versions
        delCLVer.append(cl)
    
    results["deleted"] = delCLVer
    
    return results

def retrieveLoggedCheckLists(clID,version):
    collection = db.Checklists
    logCollection = db.ChecklistLogs

    results = collection.find_one({"clID":clID,"version":version},{"_id":0})

    if results == None:
        results = logCollection.find_one({"clID":clID,"version":version},{"_id":0})

    client.close()
    return results


def filterSort(query):

    collection = db.Checklists
    
    table = collection.find({},{"_id":0})
    rList = [item for item in table]
