from pymongo import MongoClient
from pymongo import cursor
import json

client = MongoClient('mongodb://localhost:27017/')
db = client.SpringBoard

def createCheckList(input):

    collection = db.Checklists

    checklist = json.loads(input)

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

    table = collection.find({},{"name":1,"_id":0})
    results = {}
    clList = [item for item in table]
    results["clnames"] =  clList
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