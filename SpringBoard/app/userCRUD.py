from pymongo import MongoClient
from pymongo import cursor
from .serializers import *

client = MongoClient('mongodb://localhost:27017/')
db = client.SpringBoard

def retrieveAllUser():
    collection = db.Users
    cur = collection.find()
    serializer = UserSerializer(cur, many=True)
    return serializer.data

def createUser(username,password,userType,email):

    collection = db.Users
    newUser = {'username':username,'password':password,'userType':userType,'email':email}
    results = {'Results':'False'}

    try:
        collection.insert_one(newUser)
        results['Results'] = 'True' 
    except Exception as e:
        results['Error'] = str(e)

    return results

def deleteUser(username):
    collection = db.Users
    result = collection.delete_one({'username':username})
    return result.acknowledged
