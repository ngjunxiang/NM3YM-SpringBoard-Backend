"""
Definition of views.
"""

from django.shortcuts import render
#from django.http import HttpRequest
#from django.template import RequestContext
from datetime import datetime
from .serializers import UserSerializer
#from rest_framework import *
from .views import *
import json
from rest_framework_mongoengine import viewsets as mviewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from pymongo import MongoClient
import jwt

client = MongoClient('mongodb://localhost:27017/')
db = client.SpringBoard

class UserLogin(APIView):

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

            encoded_token = jwt.encode({'username': username}, 'NM3YM', algorithm='HS256')
            results['token'] = encoded_token
            return Response(results)

        return Response(results)

class CreateUser(APIView):

    def post(self,request):

        collection = db.Users

        username = request.data['username']
        password = request.data['password']
        userType = request.data['userType']

        newUser = {'username':username,'password':password,'userType':userType}
        
        results = {'Results':'False'}

        try:
            collection.insert_one(newUser)
            results['Results'] = 'True' 
        except Exception as e:
            results['Error'] = str(e)

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