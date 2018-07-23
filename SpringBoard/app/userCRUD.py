from pymongo import MongoClient
from pymongo import cursor
#from .serializers import *

client = MongoClient('mongodb://localhost:27017/')
db = client.SpringBoard

def retrieveAllUser():
    collection = db.Users
    table = collection.find({},{"username":1,"password":1,"userType":1,"email":1,"_id":0})
    results = {}
    rList = [item for item in table]
    results["users"] =  rList
    return results

def createUser(username,password,userType,email):

    collection = db.Users
    newUser = {'username':username,'password':password,'userType':userType,'email':email}
    results = {'results':'false'}

    try:
        collection.insert_one(newUser)
        results['results'] = 'true' 
    except Exception as e:
        results['error'] = str(e)

    return results

def deleteUser(username):
    collection = db.Users
    results = {}
    deleted = collection.delete_one({'username':username})
    results["results"] = deleted.acknowledged
    results["items deleted"] = deleted.deleted_count
    return results
