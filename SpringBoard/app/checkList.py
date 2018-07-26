from pymongo import MongoClient
from pymongo import cursor

client = MongoClient('mongodb://localhost:27017/')
db = client.SpringBoard

def createCheckList(document):
    try:
        db.CheckLists.insert_one(document)
    except Exception as e:
        print(str(e))
    client.close()