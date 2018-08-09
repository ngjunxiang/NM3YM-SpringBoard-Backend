"""
Definition of views.
"""

from django.shortcuts import render
#from django.http import HttpRequest
#from django.template import RequestContext
from datetime import datetime
from .serializers import *
from rest_framework.generics import *
from .views import *
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from pymongo import MongoClient
import jwt
from app.utils.userCRUD import *
import datetime
from app.utils.checkListCRUD import *
from argon2 import PasswordHasher
from argon2 import exceptions


client = MongoClient('mongodb://localhost:27017/')
db = client.SpringBoard
SECRET_KEY = 'NM^3YM'
ph = PasswordHasher()

def checkLogonStatus(username,token):
    return ({'username': username} == jwt.decode(token, SECRET_KEY, algorithms=['HS256']))

def isAdmin(userType):
    return userType == "ADMIN"

def isCM(userType):
    return userType == "CM"

def isRM(userType):
    return userType == "RM"

def tokenAuthenticate(username,token):
    results = {}
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

class UserLogin(CreateAPIView):
    serializer_class = UserSerializer

    def post(self, request):
        collection = db.Users
        username = request.data['username']
        password = request.data['password']

        query = collection.find_one({'username':username},{'password':1, '_id':0})


        results = {'error' : 'invalid username/password' }

        if query == None:
            client.close()
            return Response(results)
        
        pw = collection.find_one({'username':username},{'password':1, '_id':0})['password']

        try:
            ph.verify(pw,password)
            results = {}
            results['userType'] = collection.find_one({'username':username},{'userType':1, '_id':0})['userType']

            encoded_token = jwt.encode({
                'username': username,
                # 'iat': datetime.datetime.utcnow(),
                # 'nbf': datetime.datetime.utcnow() + datetime.timedelta(minutes=-5),
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
                }, SECRET_KEY, algorithm='HS256')
            results['token'] = encoded_token
            client.close()
            return Response(results)
        except exceptions.VerifyMismatchError as e:
            client.close()
            return Response(results)

class authenticateAdmin(CreateAPIView):
    serializer_class = UserSerializer

    def post(self,request):
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']

        results = tokenAuthenticate(username,token)
        if(len(results) != 0):
            client.close()
            return Response(results)
        if(not isAdmin(userType)):
            client.close()
            return Response({'error' : 'invalid userType' })

        return Response(results)

class authenticateCM(CreateAPIView):
    serializer_class = UserSerializer

    def post(self,request):
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']

        results = tokenAuthenticate(username,token)
        if(len(results) != 0):
            client.close()
            return Response(results)
        if(not isCM(userType)):
            client.close()
            return Response({'error' : 'invalid userType' })

        return Response(results)

class authenticateRM(CreateAPIView):
    serializer_class = UserSerializer

    def post(self,request):
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']

        results = tokenAuthenticate(username,token)
        if(len(results) != 0):
            client.close()
            return Response(results)
        if(not isRM(userType)):
            client.close()
            return Response({'error' : 'invalid userType' })

        return Response(results)

class RetrieveUsers(CreateAPIView):
    serializer_class = UserSerializer

    def post(self, request):
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']

        results = tokenAuthenticate(username,token)
        if(len(results) != 0):
            client.close()
            return Response(results)
        if(not isAdmin(userType)):
            client.close()
            return Response({'error' : 'invalid userType' })

        results = retrieveAllUser()
        client.close()
        return Response(results)

class ManageUsers(CreateAPIView,DestroyAPIView):
    serializer_class = UserSerializer

    #create user
    def post(self,request):
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']

        results = tokenAuthenticate(username,token)
        if(len(results) != 0):
            client.close()
            return Response(results)
        if(not isAdmin(userType)):
            client.close()
            return Response({'error' : 'invalid userType' })

        newUsername = request.data['newUsername']
        newPassword = request.data['newPassword']
        newUserType = request.data['newUserType']
        newEmail = request.data['newEmail']
        
        if(not checkIfUserExists(newUsername)):
            return Response({'error' : 'Username already used in database' })
        if(not checkIfEmailExists(newEmail)):
            return Response({'error' : 'Email already used in database' })


        hashedPw = ph.hash(newPassword);

        results = createUser(newUsername,hashedPw,newUserType,newEmail) 

        client.close()
        return Response(results)

    #delete user
    def delete(self,request):
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']

        results = tokenAuthenticate(username,token)
        if(len(results) != 0):
            client.close()
            return Response(results)
        if(not isAdmin(userType)):
            client.close()
            return Response({'error' : 'invalid userType' })

        deleteUsername = request.data['deleteUsername']
        results = deleteUser(deleteUsername)
        client.close()
        return Response(results)

class UpdateUsers(CreateAPIView):
    serializer_class = UserSerializer
    queryset = db.Users.find()

    #update user
    def post(self,request):
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']

        results = tokenAuthenticate(username,token)
        if(len(results) != 0):
            client.close()
            return Response(results)
        if(not isAdmin(userType)):
            client.close()
            return Response({'error' : 'invalid userType' })

        updateUsername = request.data['updateUsername']
        updatePassword = request.data['updatePassword']
        results = updateUser(updateUsername,updatePassword)
        client.close()
        return Response(results)

#Allows CM to create new checklists
class CreateCL(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.Checklists.find()

    def post(self,request):
        document = request.data['checklist']
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']

        tokenResults = tokenAuthenticate(username,token)
        if(len(tokenResults) != 0):
            client.close()
            return Response(tokenResults)
        if(not isCM(userType)):
            client.close()
            return Response({'error' : 'invalid userType'})

        results = createCheckList(document)
        client.close()
        return Response(results)

# For CM to manage CL details. post is for retrieving of checklists, delete is for deleting of checklists
class ManageCL(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.Checklists.find()

    #retrieve a single checklist
    def post(self,request):
        clName = request.data['clName']
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']

        tokenResults = tokenAuthenticate(username,token)
        if(len(tokenResults) != 0):
            client.close()
            return Response(tokenResults)
        if(not isCM(userType)):
            client.close()
            return Response({'error' : 'invalid userType'})

        results = retrieveCheckList(clName)
        client.close()
        return Response(results)

    #delete checklist
    def delete(self,request):
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']
        

        results = tokenAuthenticate(username,token)
        if(len(results) != 0):
            client.close()
            return Response(results)
        if(not isCM(userType)):
            client.close()
            return Response({'error' : 'invalid userType' })

        clName = request.data['clName']
        results = deleteCheckList(clName)
        client.close()
        return Response(results)

# Allows CM to update selected CL details
class UpdateCL(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.Checklists.find()

    def post(self,request):
        document = request.data['checklist']
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']
        clName = request.data['clName']

        tokenResults = tokenAuthenticate(username,token)
        if(len(tokenResults) != 0):
            client.close()
            return Response(tokenResults)
        if(not isCM(userType)):
            client.close()
            return Response({'error' : 'invalid userType'})

        results = deleteCheckList(clName)
        if(results["items_deleted"] != 0):
            results = createCheckList(document)
            client.close()

        return Response(results)

# Returns all checklist names for CMs
class CMRetrieveCLNames(CreateAPIView):
     serializer_class = CLSerializer
     queryset = db.Checklists.find()

     def post(self,request):
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']

        tokenResults = tokenAuthenticate(username,token)
        if(len(tokenResults) != 0):
            client.close()
            return Response(tokenResults)
        if(not isCM(userType)):
            client.close()
            return Response({'error' : 'invalid userType'})

        results = retrieveCheckListByName()
        client.close()
        return Response(results)

#Retrieve a single checklist for RMs
class RMRetrieveCL(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.Checklists.find()

    def post(self,request):
        clName = request.data['clName']
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']

        tokenResults = tokenAuthenticate(username,token)
        if(len(tokenResults) != 0):
            client.close()
            return Response(tokenResults)
        if(not isRM(userType)):
            client.close()
            return Response({'error' : 'invalid userType'})

        results = retrieveCheckList(clName)
        client.close()
        return Response(results)

# Returns all checklist names for RMs
class RMRetrieveCLNames(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.Checklists.find()

    def post(self,request):
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']

        tokenResults = tokenAuthenticate(username,token)
        if(len(tokenResults) != 0):
            client.close()
            return Response(tokenResults)
        if(not isRM(userType)):
            client.close()
            return Response({'error' : 'invalid userType'})

        results = retrieveCheckListByName()
        client.close()
        return Response(results)

#class ObtainAuthToken(views.APIView):
#    authentication_classes = (TokenAuthentication, )
#    serializer_class = AuthTokenSerializer

#    def post(self,request, *args, **kwargs):
#        serailizer = self.serializer_class(data=request.data)
#        serializer.is_valid(raise_exception=True)
#        user = serializer.validated_data['user']
#        token, created = Token.objects.get_or_create(user=user)
#        return Response({'token': token.key})

#obtain_auth_token = ObtainAuthToken.as_view()