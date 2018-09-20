from pymongo import MongoClient
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.response import Response
from rest_framework.generics import *
from app.serializers import *
from app.models import *

from app.utils.tokenCRUD import *
from app.utils.knowledgeBase import *

client = MongoClient('mongodb://localhost:27017/')
db = client.SpringBoard

#Retrieve answers
class retrieveAnswers(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.knowledgeBase.find()

    def post(self,request):

        # request parameters
        question = request.data['question']
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']

        # authentication
        tokenResults = tokenAuthenticate(username,token)
        if(len(tokenResults) != 0):
            client.close()
            return Response(tokenResults)
        if(not isRM(userType)):
            client.close()
            return Response({'error' : 'invalid userType'})

        results = getAnswer(question)

        client.close()
        return Response(results)