
from pymongo import MongoClient
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.response import Response
from rest_framework.generics import *
from app.serializers import *
from app.models import *

from app.utils.tokenCRUD import *
from app.utils.userCRUD import *

client = MongoClient('mongodb://localhost:27017/')
db = client.SpringBoard
SECRET_KEY = 'NM^3YM'
ph = PasswordHasher()

class authenticateAdmin(CreateAPIView):
    serializer_class = UserSerializer

    def post(self,request):
        """Authenticates admin."""

        # request parameters
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']

        # authentication
        results = tokenAuthenticate(username,token)
        if(len(results) != 0):
            client.close()
            return Response(results)
        if(not isAdmin(userType)):
            client.close()
            return Response({'error' : 'Invalid userType' })

        # create token
        newToken = createToken(username)
        checkResults = removeToken(username,token)
        if (checkResults['items_deleted']!=1):
            return Response({'error' : 'Failed to delete token'})
        checkStore = storeToken(username,newToken)
        if('error' in checkStore):
            return Response({'error':'Failed to store token'})

        return Response({'newToken' : newToken})

class authenticateCM(CreateAPIView):
    serializer_class = UserSerializer

    def post(self,request):
        """Authenticates CM."""

        # request parameters
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']

        # authentication
        results = tokenAuthenticate(username,token)
        if(len(results) != 0):
            client.close()
            return Response(results)
        if(not isCM(userType)):
            client.close()
            return Response({'error' : 'Invalid userType' })

        # create token
        newToken = createToken(username)
        checkResults = removeToken(username,token)
        if (checkResults['items_deleted'] != 1):
            return Response({'error' : 'Failed to delete token'})
        checkStore = storeToken(username,newToken)
        if('error' in checkStore):
            return Response({'error':'Failed to store token'})

        return Response({'newToken' : newToken})

class authenticateFO(CreateAPIView):
    serializer_class = UserSerializer

    def post(self,request):
        """Authenticates FO."""

        # request parameters
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']

        # authentication
        results = tokenAuthenticate(username,token)
        if(len(results) != 0):
            client.close()
            return Response(results)
        if(not isFO(userType)):
            client.close()
            return Response({'error' : 'Invalid userType' })

        # create token
        newToken = createToken(username)
        checkResults = removeToken(username,token)
        if (checkResults['items_deleted']!=1):
            return Response({'error' : 'Failed to delete token'})
        checkStore = storeToken(username,newToken)
        if('error' in checkStore):
            return Response({'error':'Failed to store token'})

        return Response({'newToken' : newToken})

class InvalidateUser(CreateAPIView):
    serializer_class = UserSerializer

    def post(self, request):
        """Invalidates token."""

        # request parameters
        username = request.data['username']
        token = request.data['token']

        results = removeToken(username,token)
        
        client.close()
        return Response(results)