from pymongo import MongoClient
from pymongo import cursor
import pandas as pd

import json

client = MongoClient('mongodb://localhost:27017/')
db = client.SpringBoard

def bootstrapAgmt(filename):
    """Stores Agmt codes into the DB.
    
    Args:
    filename (str) : filename

    """

    # clear prev bootstrap
    collection = db.AgmtCodes

    results = {'results':'false'}
     # tracking variables
    try:
        if filename.endswith('csv'):
            df = pd.read_csv(filename)
            agmtDict = df.to_dict('records')

            inserted = 0
            errors = 0

            dfList = list(df)

            for x in agmtDict:
                code = x[dfList[0]]
                desc = x[dfList[1]]

                record = {
                    "code" : code,
                    "document" : desc
                }

                try:
                    collection.update({'code':code}, record, True)
                    inserted += 1
                    
                except Exception as e:
                    errors += 1

            results = {
                "inserted" : inserted,
                "errors" : errors
            }

            client.close()
            return results

        else:
            df = pd.read_excel(filename)
            agmtDict = df.to_dict('records')

            inserted = 0
            errors = 0

            dfList = list(df)

            for x in agmtDict:
                code = x[dfList[0]]
                desc = x[dfList[1]]

                record = {
                    "code" : code,
                    "document" : desc
                }

                try:
                    collection.update({'code':code}, record, True)
                    inserted += 1
                    
                except Exception as e:
                    errors += 1

            results = {
                "inserted" : inserted,
                "errors" : errors
            }

            client.close()
            return results

    except Exception as e:
        results = {"error":"file may be corrupted, check file format and try again."}
        client.close()
        return results

    client.close()
    return results

def retrieveAgmt():
    """Retrieves Agmt codes from the DB."""

    collection = db.AgmtCodes

    table = collection.find({},{"_id":0})

    results = {}

    for item in table:
        results[item["code"]] = item["document"]

    client.close()

    return results