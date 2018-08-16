from pymongo import MongoClient
from pymongo import cursor

client = MongoClient('mongodb://localhost:27017/')
db = client.SpringBoard

def removeToken(username,token):
    collection = db.Tokens
    results = {}
    binToken = "b'" + token + "'"
    deleted = collection.delete_one({'username':username,'token':binToken})
    results["results"] = deleted.acknowledged
    results["items_deleted"] = deleted.deleted_count
    client.close()
    return results

def storeToken(username, token):
    collection = db.Tokens
    newToken = {'username':username,'token':str(token)}
    results = {'results':'false'}

    try:
        collection.insert_one(newToken)
        results['results'] = 'true' 
    except Exception as e:
        results['error'] = str(e)

    client.close()
    return results

def checkToken(token):
    collection = db.Tokens
    binToken = "b'" + token + "'"
    results = collection.find_one({'token':binToken},{'_id':0})

    if results == None:
        return {'error' : 'Invalid Checklist Name' }

    return results