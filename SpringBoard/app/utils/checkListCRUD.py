from pymongo import MongoClient
from pymongo import cursor
import json
import datetime
import pytz
from app.utils.notificationCRUD import *

client = MongoClient('mongodb://localhost:27017/')
db = client.SpringBoard
tz = pytz.timezone('Asia/Singapore')

def createCheckList(input,name):

    collection = db.Checklists
    counter = db.ChecklistCounter

    # get latest clID from Checklist Counter
    clID = int(counter.find_one({"_id":"clID"})["sequence_value"])
    db.ChecklistCounter.update({"_id":"clID"}, {'$inc': {'sequence_value': 1}})

    # get timezone corrected date
    date = datetime.datetime.now(pytz.utc).astimezone(tz)
    date = str(date)
    date = date[:date.index(".")]

    latestDocID = 0

    # parse input from frontend
    input = json.loads(input)   

    # assign docID to each document
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

    # additional info 
    input["latestDocID"] =  str(latestDocID)
    input["clID"] =  str(clID)
    input["version"] =  "1"
    input["status"] =  "valid"
    input["dateCreated"] =  date
    input["updatedBy"] =  name

    results = {'results':'false'}
    
    try:
        collection.insert_one(input)
        results['results'] = 'true' 
    except Exception as e:
        results['error'] = str(e)

    client.close()
    return results

def updateCheckList(input,name,clID,version):
    
    logsCollection = db.ChecklistLogs
    collection = db.Checklists

    # get timezone corrected date
    date = datetime.datetime.now(pytz.utc).astimezone(tz)
    date = str(date)
    date = date[:date.index(".")]

    # parse input from frontend
    input = json.loads(input)  

    # load prev version
    prevCL = logsCollection.find_one({"clID": str(clID),"version": str(version-1)})

    # get the latest docID
    latestDocID = int(prevCL["latestDocID"])

    # "changed" field to track checklist changes in the fields
    #  0 = same
    #  1 = edited
    #  2 = new
    #  3 = deleted

    for section,value in input["complianceDocuments"].items():
        index = 0
        for document in value:
            # if new document, assign docID
            if document.get("docID") == "":
                input["complianceDocuments"][section][index]["docID"] = str(latestDocID)
                checkBool = createNotification(clID,str(version),str(latestDocID),2)
                latestDocID += 1
            changedVal = int(document.get("changed"))
            if changedVal != 0:
                docID = document.get("docID")
                checkBool = createNotification(clID,str(version),docID,changedVal)
                
            index += 1

    for section,value in input["legalDocuments"].items():
        index = 0
        for document in value:
            # if new document, assign docID
            if document.get("docID") == "":
                input["legalDocuments"][section][index]["docID"] = str(latestDocID)
                checkBool = createNotification(clID,str(version),str(latestDocID),2)
                latestDocID += 1
            changedVal = int(document.get("changed"))
            if changedVal != 0:
                docID = document.get("docID")
                checkBool = createNotification(clID,str(version),docID,changedVal)
            index += 1

    # additional info 
    input["latestDocID"] =  str(latestDocID) 
    input["clID"] =  str(clID) 
    input["version"] =  str(version)
    input["dateCreated"] =  date
    input["updatedBy"] =  name

    results = {'results':'false'}
    
    try:
        collection.insert_one(input)
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

# get current version number of the given checklist
def getCLversion(clID):

    collection = db.Checklists

    return collection.find_one({"clID": clID })["version"]

# returns names of all the current checklists
def retrieveCheckListByName():

    collection = db.Checklists
    
    # retrieve names of all current checklists
    table = collection.find({},{"name":1,"dateCreated":1,"updatedBy":1, "clID":1, "version":1,"_id":0})
    clList = [item for item in table]

    results = {}
    results["clNames"] =  clList

    client.close()
    return results

# returns checklist with given ID
def retrieveCheckList(clID):

    collection = db.Checklists
    
    # retrieve checklist with given ID
    results = collection.find_one({'clID':clID},{"_id":0})
    if results == None:
        return {'error' : 'Invalid Checklist ID' }
    
    # remove deleted values (changed == 3)
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

# moves checklist to log
def logCheckList(clID,toDelete = False):

    # check if this checklist exists
    prevChecklist = retrieveCheckList(clID)
    if('error' in prevChecklist):
        client.close()
        return prevChecklist

    # mark as deleted if it is a delete call
    if toDelete:
        prevChecklist["status"] = "deleted"
    
    collection = db.ChecklistLogs

    results = {}

    # insert checklist into log
    try:
        collection.insert_one(prevChecklist)
        results['results'] = 'true' 
    except Exception as e:
        results['error'] = str(e)

    client.close()

    return results

# retrieves all current/deleted checklist names and their versions
def retrieveNamesWithVersions():
    collection = db.Checklists
    delCollection = db.ChecklistLogs

    results = {}

    # retrieve clID, name and version of all current checklists
    currentCLs = collection.find({},{"clID":1,"name":1,"version":1,"_id":0})

    currCLVer = []
    
    # insert each result into a list
    for checklist in currentCLs:
        
        cl = {}
        cl["clID"] = checklist["clID"]
        cl["name"] = checklist["name"]

        # get current version
        version = int(checklist["version"])
        versions = []

        # add version for latest version... 1
        while version > 0:
            versions.append(version)
            version -= 1
        
        cl["versions"] = versions
        currCLVer.append(cl)
    
    # all current checklists
    results["current"] = currCLVer

    # retrieve clID, name and version of all deleted checklists
    delCLs = delCollection.find({"status":"deleted"},{"clID":1,"name":1,"version":1,"_id":0})

    delCLVer = []
    
    # insert each result into a list
    for checklist in delCLs:

        cl = {}
        cl["clID"] = checklist["clID"]
        cl["name"] = checklist["name"]

        # get current version
        version = int(checklist["version"])
        versions = []

        # add version for latest version... 1
        while version > 0:
            versions.append(version)
            version -= 1
        
        cl["versions"] = versions
        delCLVer.append(cl)
    
    # all deleted checklists
    results["deleted"] = delCLVer
    
    client.close()
    return results

# retrieves a specific checklist version
def retrieveLoggedCheckLists(clID,version):
    
    collection = db.Checklists
    logCollection = db.ChecklistLogs

    # checks current checklists
    results = collection.find_one({"clID":clID,"version":version},{"_id":0})

    # if doesnt exist, check logs
    if results == None:
        results = logCollection.find_one({"clID":clID,"version":version},{"_id":0})

    client.close()
    return results

def filterSort(query):

    collection = db.Checklists
    
    table = collection.find({},{"_id":0})
    rList = [item for item in table]
