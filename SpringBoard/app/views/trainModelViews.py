from pymongo import MongoClient
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.response import Response
from rest_framework.generics import *
from app.serializers import *
from app.models import *

from app.utils.trainModel import *
from app.utils.tokenCRUD import *
from app.utils.userCRUD import *

client = MongoClient('mongodb://localhost:27017/')
db = client.SpringBoard

class TrainKMSModel(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.KnowledgeBase.find()

    def post(self,request):

        # request parameters
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']

        # authentication
        tokenResults = tokenAuthenticate(username,token)
        if(len(tokenResults) != 0):
            client.close()
            return Response(tokenResults)
        if(not isCM(userType)):
            client.close()
            return Response({'error' : 'invalid userType'})

        results = trainKMSModel()

        client.close()
        return Response(results)

class UpdateSynonyms(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.KnowledgeBase.find()

    def post(self,request):

        # request parameters
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']

        # authentication
        tokenResults = tokenAuthenticate(username,token)
        if(len(tokenResults) != 0):
            client.close()
            return Response(tokenResults)
        if(not isCM(userType)):
            client.close()
            return Response({'error' : 'invalid userType'})

        results = updateSynonyms()

        client.close()
        return Response(results)

class RetrieveSynonyms(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.KnowledgeBase.find()

    def post(self,request):

        # request parameters
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']

        # authentication
        tokenResults = tokenAuthenticate(username,token)
        if(len(tokenResults) != 0):
            client.close()
            return Response(tokenResults)
        if(not isCM(userType)):
            client.close()
            return Response({'error' : 'invalid userType'})

        results = retrieveSynonyms()

        client.close()
        return Response(results)