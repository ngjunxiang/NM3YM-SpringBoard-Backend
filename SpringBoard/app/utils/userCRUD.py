from pymongo import MongoClient
from pymongo import cursor

client = MongoClient('mongodb://localhost:27017/')
db = client.SpringBoard

def isAdmin(userType):
    return userType == "ADMIN"

def isCM(userType):
    return userType == "CM"

def isFO(userType):
    return (userType == "RM" or userType == "MA")

def isCompliance(userType):
    return userType == "COMPLIANCE"
    
def retrieveAllUser():
    collection = db.Users
    table = collection.find({},{"name":1,"username":1,"password":1,"userType":1,"email":1,"_id":0})
    results = {}
    rList = [item for item in table]
    results["users"] =  rList
    client.close()
    return results

def checkIfUserExists(username):
    collection = db.Users
    query = collection.find_one({'username':username},{'_id':0})
    return query == None

def checkIfEmailExists(email):
    collection = db.Users
    query = collection.find_one({'email':email},{'_id':0})
    return query == None

def createUser(username,password,userType,name,email):
    collection = db.Users
    newUser = {'username':username,'password':password,'userType':userType,'name':name,'email':email}
    results = {'results':'false'}

    try:
        collection.insert_one(newUser)
        results['results'] = 'true' 
    except Exception as e:
        results['error'] = str(e)

    client.close()
    return results

def deleteUser(username):
    collection = db.Users
    results = {}
    deleted = collection.delete_one({'username':username})
    results["results"] = deleted.acknowledged
    results["items_deleted"] = deleted.deleted_count
    client.close()
    return results

def updateUser(username,newPassword):
    collection = db.Users
    results = {}
    updated = collection.update_one({'username':username},{"$set" : {'password':newPassword}})
    results["results"] = "true" if updated.modified_count == 1 else "false"
    client.close()
    return results

def getName(username):
    collection = db.Users
    name = collection.find_one({'username':username},{'name':1, '_id':0})['name']
    return name

def getEmail(username):
    collection = db.Users
    email = collection.find_one({'username':username},{'email':1, '_id':0})['email']    
    return email

def getAllRMNames():
    collection = db.Users
    results = {}
    table = collection.find({'userType':'RM'},{'name':1,'_id':0})
    names = [item.get("name") for item in table]
    results["results"] = names
    return results

def getAllRMUsernames():
    collection = db.Users
    results = {}
    table = collection.find({'userType':'RM'},{'username':1,'_id':0})
    usernames = [item.get("username") for item in table]
    return usernames