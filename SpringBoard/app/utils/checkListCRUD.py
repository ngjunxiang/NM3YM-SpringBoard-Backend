from pymongo import MongoClient
from pymongo import cursor
import json
import datetime

client = MongoClient('mongodb://localhost:27017/')
db = client.SpringBoard

def createCheckList(input,name):

    collection = db.Checklists

    date = datetime.datetime.today()
    date = str(date)
    date = date[:date.index(".")]

    newInput = input[0:len(input)-1]
    
    newInput = newInput + ',"dateCreated":"' + date

    newInput = newInput + ',"updatedBy":"' + name + '"}'

    checklist = json.loads(newInput)

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

    table = collection.find({},{"name":1,"dateCreated":1,"updatedBy":1, "_id":0})
    results = {}
    clList = [item for item in table]
    results["clNames"] =  clList
    client.close()
    return results

def retrieveCheckList(clName):

    collection = db.Checklists
    
    results = collection.find_one({'name':clName},{'_id':0})
    if results == None:
        return {'error' : 'Invalid Checklist Name' }

    return results

def deleteCheckList(clName):

    collection = db.Checklists
    results = {}
    deleted = collection.delete_one({'name':clName})
    results["results"] = deleted.acknowledged
    results["items_deleted"] = deleted.deleted_count
    client.close()
    return results

def logCheckList(clName):
    collection = db.Checklists
    prevChecklist = retrieveCheckList(clName)
    if('error' in prevChecklist):
        client.close()
        return prevChecklist

    newCollection = db.ChecklistLogs

    try:
        newCollection.insert_one(prevChecklist)
        results['results'] = 'true' 
    except Exception as e:
        results['error'] = str(e)

    client.close()

    return results

def retrieveLoggedCheckLists(clName):
    collection = db.ChecklistLogs

    table = collection.find({},{"name":1,"_id":0})
    results = {}
    llList = [item for item in table]
    results["llNames"] =  llList
    client.close()
    return results

def filterSort(query):

    collection = db.Checklists
    
    table = collection.find({},{"_id":0})
    rList = [item for item in table]
