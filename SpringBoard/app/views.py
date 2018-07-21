"""
Definition of views.
"""

from django.shortcuts import render
#from django.http import HttpRequest
#from django.template import RequestContext
from datetime import datetime
from .serializers import UserSerializer
from rest_framework.generics import *
#from rest_framework import *
from .views import *
import json
#from rest_framework_mongoengine import viewsets as mviewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from pymongo import MongoClient
import jwt
from .userCRUD import *
import datetime

client = MongoClient('mongodb://localhost:27017/')
db = client.SpringBoard
SECRET_KEY = 'NM^3YM'

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
            return Response(results)
        
        pw = collection.find_one({'username':username},{'password':1, '_id':0})['password']

        if password == pw:
            results = {}
            results['userType'] = collection.find_one({'username':username},{'userType':1, '_id':0})['userType']

            encoded_token = jwt.encode({
                'username': username,
                'iat': datetime.datetime.utcnow(),
                'nbf': datetime.datetime.utcnow() + datetime.timedelta(minutes=-5),
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
                }, SECRET_KEY, algorithm='HS256')
            results['token'] = encoded_token
            return Response(results)

        return Response(results)

class RetrieveUsers(CreateAPIView):
    serializer_class = UserSerializer

    def post(self, request):
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']

        results = tokenAuthenticate(username,token)
        if(results[0] == "error"):
            return Response(results)
        if(not isAdmin(userType)):
            return Response({'error' : 'invalid userType' })

        results = retrieveAllUser()
        return Response(results)

class ManageUsers(CreateAPIView,DestroyAPIView):
    serializer_class = UserSerializer

    #create user
    def post(self,request):
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']

        if(not checkLogonStatus(username,token)):
            return Response({'error' : 'Invalid token' })
        if(not isAdmin(userType)):
            return Response({'error' : 'invalid userType' })
        
        newUsername = request.data['newUsername']
        newPassword = request.data['newPassword']
        newUserType = request.data['newUserType']
        newEmail = request.data['newEmail']
        
        results = createUser(newUsername,newPassword,newUserType,newEmail) 

        return Response(results)

    #delete user
    def delete(self,request):
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']

        if(not checkLogonStatus(username,token)):
            return Response({'error' : 'Invalid token' })
        if(not isAdmin(userType)):
            return Response({'error' : 'invalid userType' })

        deleteUsername = request.data['deleteUsername']
        results = deleteUser(deleteUsername)

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