from pymongo import MongoClient
from pymongo import cursor
import json
import datetime

client = MongoClient('mongodb://localhost:27017/')
db = client.SpringBoard

def CreateNewOnBoard(input):

    collection = db.Onboards

    counter = db.OnBoardCounter

    obID = counter.find_one({"_id":"obID"})["sequence_value"]
    db.OnboardCounter.update({"_id":"obID"}, {'$inc': {'sequence_value': 1}})

    date = datetime.datetime.today()
    date = str(date)
    date = date[:date.index(".")]

    input = json.loads(input)
    input["obID"] =  str(obID)
    input["dateCreated"] =  date

    results = {'results':'false'}
    
    try:
        collection.insert_one(input)
        results['results'] = 'true' 
    except Exception as e:
        results['error'] = str(e)

    client.close()
    return results

