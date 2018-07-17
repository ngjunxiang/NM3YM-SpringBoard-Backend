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

client = MongoClient('mongodb://localhost:27017/')
db = client.SpringBoard
collection = db.Users

class UserLogin(APIView):
    
    serializer_class = UserSerializer

    def post(self, request):

        username = request.data['username']
        password = request.data['password']

        pw = collection.find_one({'username':username},{'password':1, '_id':0})['password']
        results = {}

        if password == pw:
            results['userType'] = collection.find_one({'username':username},{'userType':1, '_id':0})['userType']
            results['token'] = 'sonofabitch'
            return Response(results)

        return Response('{error:\'invalid username/password\'}')
        

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