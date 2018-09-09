from pymongo import MongoClient
from pymongo import cursor
import json

client = MongoClient('mongodb://localhost:27017/')
db = client.SpringBoard

def bootstrap(file):

    db.AgmtCodes.drop()
    
    collection = db.AgmtCodes

    results = {'results':'false'}

    row = 0

    file = file.read().decode("utf-8").split("\r\n")

    inserted = 0
    errors = 0

    for line in file:

        print(line)

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