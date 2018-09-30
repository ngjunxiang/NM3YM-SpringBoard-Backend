from pymongo import MongoClient
from pymongo import cursor

from app.utils.userCRUD import *

import json
import datetime
import pytz

client = MongoClient('mongodb://localhost:27017/')
db = client.SpringBoard
tz = pytz.timezone('Asia/Singapore')

# ------------------------------------------------------------------- #
#                            Onboard CRUD                             #
# ------------------------------------------------------------------- #

def createNewOnBoard(input,username):

    collection = db.Onboards
    # urgentCollection = db.OnboardUrgentChecker
    counter = db.OnboardCounter

    # get latest obID from Onboard Counter
    obID = int(counter.find_one({"_id":"obID"})["sequence_value"])
    db.OnboardCounter.update({"_id":"obID"}, {'$inc': {'sequence_value': 1}})

    # get timezone corrected date
    date = datetime.datetime.now(pytz.utc).astimezone(tz)
    date = str(date)
    date = date[:date.index(".")]

    # parse input from frontend
    input = json.loads(input)

    # get onboard progress
    progress = checkProgress(input)
    
    # update additional info
    input["obID"] =  str(obID)
    input["dateCreated"] =  str(date)
    input["progress"] = progress
    input["createdBy"] = getName(username)

    if int(progress) == 100:
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


def updateSelectedOnboard(obID,input):

    collection = db.Onboards

    results = {'results':'false'}

    getCreatedBy = collection.find_one({"obID":obID},{"createdBy":1,"_id":0})["createdBy"]

    # delete current record
    deletedResults = deleteSelectedOnboard(obID)
    if(deletedResults["items_deleted"]==0):
        client.close()
        return results

    # get timezone corrected date
    date = datetime.datetime.now(pytz.utc).astimezone(tz)
    date = str(date)
    date = date[:date.index(".")]

    # parse input from frontend
    input = json.loads(input)

    # unless row has been deleted, reset "changed" to 0
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

    # get onboard progress
    progress = checkProgress(input)
    
    # update additional info
    input["obID"] =  str(obID)
    input["dateCreated"] =  date
    input["progress"] = progress
    input["urgent"] = getUrgency(obID)
    input["createdBy"] = getCreatedBy

    if int(progress) == 100:
        input['dateCompleted'] = str(date)
    
    try:
        collection.insert_one(input)
        results['results'] = 'true' 
    except Exception as e:
        results['error'] = str(e)

    client.close()
    return results

def deleteSelectedOnboard(obID):

    collection = db.Onboards

    results = {}

    deleted = collection.delete_one({'obID':obID})
    results["results"] = deleted.acknowledged
    results["items_deleted"] = deleted.deleted_count

    client.close()
    return results

def getSelectedOnboard(obID):

    obCollection = db.Onboards
    clCollection = db.Checklists
    logCollection = db.ChecklistLogs
    
    # get clID and version of the onboard
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
            log = logCollection.find_one({"clID":clID, "version":str(version)},{"_id":0})
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


# ------------------------------------------------------------------- #
#                           Other Methods                             #
# ------------------------------------------------------------------- #

def getAllCurrentOnboards(username,userType):

    name = getName(username)
    collection = db.Onboards
    obList = []
    if userType=="RM":
        table = collection.find({"requiredFields.RM Name": name},{"name":1,"conditions":1,"requiredFields":1,"obID":1,"dateCreated":1,"progress":1,"_id":0})
        obList = [item for item in table]
    else:
        table = collection.find({"createdBy": name},{"name":1,"conditions":1,"requiredFields":1,"obID":1,"dateCreated":1,"progress":1,"_id":0})
        obList = [item for item in table]
        
    obList = filterSort(obList)

    results = {}
    results["obLists"] =  obList
    
    client.close()
    return results


# returns onboarding progress for given onboard
def checkProgress(input):

    compDocs = input["complianceDocuments"]
    legalDocs = input["legalDocuments"]

    compConditional = compDocs["conditional"]
    compMandatory = compDocs["mandatory"]
    #compOptional = compDocs["optional"]
    
    legalConditional = legalDocs["conditional"]
    legalMandatory = legalDocs["mandatory"]
    #legalOptional = legalDocs["optional"]

    totalCheckBoxes = 0
    totalCheckedBoxes = 0

    # iterate through all documents
    for index in compConditional:
        totalCheckBoxes = totalCheckBoxes + 1
        if(index["checked"]):
            totalCheckedBoxes = totalCheckedBoxes + 1

    for index in compMandatory:
        totalCheckBoxes = totalCheckBoxes + 1
        if(index["checked"]):
            totalCheckedBoxes = totalCheckedBoxes + 1

    #for index in compOptional:
    #    totalCheckBoxes = totalCheckBoxes + 1
    #    if(index["checked"]):
    #        totalCheckedBoxes = totalCheckedBoxes + 1

    for index in legalConditional:
        totalCheckBoxes = totalCheckBoxes + 1
        if(index["checked"]):
            totalCheckedBoxes = totalCheckedBoxes + 1

    for index in legalMandatory:
        totalCheckBoxes = totalCheckBoxes + 1
        if(index["checked"]):
            totalCheckedBoxes = totalCheckedBoxes + 1

    #for index in legalOptional:
    #    totalCheckBoxes = totalCheckBoxes + 1
    #    if(index["checked"]):
    #        totalCheckedBoxes = totalCheckedBoxes + 1

    return round(totalCheckedBoxes/totalCheckBoxes*100,1)


# ------------------------------------------------------------------- #
#                          Urgency Methods                            #
# ------------------------------------------------------------------- #

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

def loadUrgentJson(obID):
    results = {}
    results["obID"] = obID
    results["Urgent"] = False

    return json.loads(results)

# ------------------------------------------------------------------- #
#                          Sorting Methods                            #
# ------------------------------------------------------------------- #
    
def getSortedOnboards(sortBy,obList):

    collection = db.Onboards
    obList = sortListBy(obList,sortBy)

    results = {}
    results["obLists"] =  obList
    
    client.close()
    return results

def getFilteredOnboards(filterBy,obList):
    
    collection = db.Onboards
    
    obList = filterListBy(obList,filterBy)

    results = {}
    results["obLists"] =  obList
    
    client.close()
    return results

def filterSort(obList):
    if not obList:
        return obList

    newObList = []
    newObList.append(obList[0])

    for i in range(1,len(obList)):
        obDict = obList[i]
        obName = obDict.get("name")
        obProgress = float(obDict.get("progress"))
        for j,item in enumerate(newObList):
            newObName = item.get("name")
            if obName<newObName:
                newObList.insert(j,obList[i])
                break
            elif obName == newObName:
                newObProgress = float(item.get("progress"))
                if obProgress>newObProgress:
                    newObList.insert(j,obList[i])
                    break
            if(len(newObList)-j==1):
                newObList.append(obList[i])
                break

    return newObList

def sortListBy(obList,sortBy):
    if not obList:
        return obList
    newObList =  []
    if sortBy == "progress":
        newObList.append(obList[0])

        for i in range(1,len(obList)):
            obDict = obList[i]
            obProgress = float(obDict.get("progress"))
            for j,item in enumerate(newObList):
                newObProgress = float(item.get("progress"))
                if obProgress > newObProgress:
                    newObList.insert(j,obList[i])
                    break
                if(len(newObList)-j==1):
                    newObList.append(obList[i])
                    break
        return newObList
    elif sortBy == "date":
        newObList.append(obList[0])

       
        for i in range(1,len(obList)):
            obDict = obList[i]
            obDateCreated = obDict.get("dateCreated")
            for j,item in enumerate(newObList):
                newObDateCreated = item.get("dateCreated")
                if obDateCreated > newObDateCreated:
                    newObList.insert(j,obList[i])
                    break
                if(len(newObList)-j==1):
                    newObList.append(obList[i])
                    break
        return newObList
    elif sortBy == "name":
        newObList.append(obList[0])

        for i in range(1,len(obList)):
            obDict = obList[i]
            obName = obDict.get("name")
            for j,item in enumerate(newObList):
                newObName = item.get("name")
                if obName < newObName:
                    newObList.insert(j,obList[i])
                    break
                if(len(newObList)-j==1):
                    newObList.append(obList[i])
                    break
        return newObList
    else:
        return obList

def filterListBy(obList,filterBy):
    if not obList:
        return obList
    
    newObList =  []

    if filterBy == "pending":
        for i in range(0,len(obList)):
            obDict = obList[i]
            obProgress = obDict.get("progress")
            if not int(obProgress) == 100:
                newObList.append(obList[i])
        return newObList
    elif filterBy == "completed":
        for i in range(0,len(obList)):
            obDict = obList[i]
            obProgress = obDict.get("progress")
            if int(obProgress) == 100:
                newObList.append(obList[i])
        return newObList
    else:
        return obList
