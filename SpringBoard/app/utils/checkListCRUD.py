from pymongo import MongoClient
from pymongo import cursor
import json
import datetime

client = MongoClient('mongodb://localhost:27017/')
db = client.SpringBoard

def createCheckList(input,name):

    collection = db.Checklists

    counter = db.ChecklistCounter

    clID = counter.find_one({"_id":"clID"})["sequence_value"]
    db.ChecklistCounter.update({"_id":"clID"}, {'$inc': {'sequence_value': 1}})

    date = datetime.datetime.today()
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

def getCLversion(clID):
    collection = db.Checklists
    return collection.find_one({"clID": clID })["version"]
    

def updateCheckList(input,name,clID,version):
    
    logsCollection = db.ChecklistLogs
    collection = db.Checklists

    date = datetime.datetime.today()
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
            index += 0

    for section,value in input["legalDocuments"].items():
        index = 0
        for document in value:
            if document.get("docID") == "":
                input["legalDocuments"][section][index]["docID"] = str(latestDocID)
                latestDocID += 1
            index += 0

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

def deleteCheckList(clID):

    collection = db.Checklists
    results = {}
    deleted = collection.delete_one({'clID':clID})
    results["results"] = deleted.acknowledged
    results["items_deleted"] = deleted.deleted_count
    client.close()
    return results

def logCheckList(clID):
    prevChecklist = retrieveCheckList(clID)
    if('error' in prevChecklist):
        client.close()
        return prevChecklist

    newCollection = db.ChecklistLogs

    results = {}

    try:
        newCollection.insert_one(prevChecklist)
        results['results'] = 'true' 
    except Exception as e:
        results['error'] = str(e)

    client.close()

    return results

def retrieveLoggedCheckLists(clID):
    collection = db.ChecklistLogs

    table = collection.find({"clID":clID},{"_id":0})
    results = {}
    llList = [item for item in table]
    results["llNames"] =  llList
    client.close()
    return results

def retrieveAllLoggedCheckLists():
    collection = db.ChecklistLogs

    table = collection.find({},{"_id":0})
    results = {}
    llList = [item for item in table]
    results["llNames"] =  llList
    client.close()
    return results

def filterSort(query):

    collection = db.Checklists
    
    table = collection.find({},{"_id":0})
    rList = [item for item in table]
