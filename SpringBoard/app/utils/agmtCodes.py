from pymongo import MongoClient
from pymongo import cursor
import json

client = MongoClient('mongodb://localhost:27017/')
db = client.SpringBoard

def bootstrapAgmt(file):

    # clear prev bootstrap
    collection = db.AgmtCodes
    collection.drop()

    results = {'results':'false'}

    # tracking variables
    row = 0
    inserted = 0
    errors = 0

    # decode file
    file = file.read().decode("utf-8").split("\r\n")

    for line in file:

        # Skip header
        if row == 0:
            row += 1
            continue
        
        fields = line.split(",")

        record = {
            "code" : fields[0], 
            "document" : fields[1]
            }

        try:
            collection.insert_one(record)
            inserted += 1
            
        except Exception as e:
            errors += 1

    results = {
        "inserted" : inserted,
        "errors" : errors
    }

    client.close()
    return results

def retrieveAgmt():

    collection = db.AgmtCodes

    table = collection.find({},{"_id":0})

    results = {}

    for item in table:
        results[item["code"]] = item["document"]

    client.close()

    return results