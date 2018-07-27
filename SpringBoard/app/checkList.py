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