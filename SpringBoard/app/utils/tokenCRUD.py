from pymongo import MongoClient
from pymongo import cursor
from argon2 import PasswordHasher
from argon2 import exceptions
import jwt
import datetime

client = MongoClient('mongodb://localhost:27017/')
db = client.SpringBoard
SECRET_KEY = 'NM^3YM'
ph = PasswordHasher()

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

def checkLogonStatus(username,token):
    return ({'username': username} == jwt.decode(token, SECRET_KEY, algorithms=['HS256']))

def tokenAuthenticate(username,token):
    results = {}
    if('error' in checkToken(token)):
        results = {'error' : 'Invalid Token'}
        return (results) 
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        if(not username == payload['username']):
            results = {'error' : 'Invalid Token'}
            return (results)
    except(jwt.DecodeError):
        results = {'error' : 'Invalid Token'}
        return (results)
    except(jwt.ExpiredSignatureError):
        results = {'error' : 'Token has expired'}
        return (results)
    return results

def createToken(username):
    encoded_token = jwt.encode({
                'username': username,
                # 'iat': datetime.datetime.utcnow(),
                # 'nbf': datetime.datetime.utcnow() + datetime.timedelta(minutes=-5),
                'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
                }, SECRET_KEY, algorithm='HS256')
    return encoded_token