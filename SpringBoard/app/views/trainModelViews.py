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
        synonyms = request.data['synonyms']

        # authentication
        tokenResults = tokenAuthenticate(username,token)
        if(len(tokenResults) != 0):
            client.close()
            return Response(tokenResults)
        if(not isCM(userType)):
            client.close()
            return Response({'error' : 'invalid userType'})

        results = updateSynonyms(synonyms)

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

        results = {"results": retrieveSynonyms()}

        client.close()
        return Response(results)

class RetrieveEntities(CreateAPIView):
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
        if (not isCM(userType)):
            client.close()
            return Response({'error' : 'invalid userType'})

        results = retrieveEntities()

        client.close()
        return Response(results)

class RetrieveIntents(CreateAPIView):
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
        if(not (isCM(userType) or isFO(userType))):
            client.close()
            return Response({'error' : 'invalid userType'})

        results = retrieveIntents()

        client.close()
        return Response(results)

class RetrieveByIntent(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.KnowledgeBase.find()

    def post(self,request):

        # request parameters
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']
        intent = request.data['intent']

        # authentication
        tokenResults = tokenAuthenticate(username,token)
        if(len(tokenResults) != 0):
            client.close()
            return Response(tokenResults)
        if(not (isCM(userType) or isFO(userType))):
            client.close()
            return Response({'error' : 'invalid userType'})

        results = retrieveByIntent(intent)

        client.close()
        return Response(results)

# retrieve all uncleaned questions from knowledge base
class RetrieveAllUncleanQNA(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.knowledgeBase.find()

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

        results = retrieveAllUnclean()

        client.close()
        return Response(results)

# retrieve all cleaned questions from knowledge base
class RetrieveAllCleanQNA(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.knowledgeBase.find()

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

        results = retrieveAllClean()

        client.close()
        return Response(results)

# store cleaned questions
class StoreCleanedQNA(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.knowledgeBase.find()

    def post(self,request):

        # request parameters
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']
        cleanedQNA = request.data['cleanedFAQ']

        # authentication
        tokenResults = tokenAuthenticate(username,token)
        if(len(tokenResults) != 0):
            client.close()
            return Response(tokenResults)
        if(not isCM(userType)):
            client.close()
            return Response({'error' : 'invalid userType'})

        results = {}
        results["results"] = storeCleanedQNA(cleanedQNA)

        client.close()
        return Response(results)
