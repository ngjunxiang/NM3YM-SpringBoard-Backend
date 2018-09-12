from pymongo import MongoClient
import json

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import *
from app.serializers import *
from app.models import *

from app.utils.agmtCodes import *
from app.utils.tokenCRUD import *
from app.utils.userCRUD import *

client = MongoClient('mongodb://localhost:27017/')
db = client.SpringBoard

class UploadAgmtCodes(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.AgmtCodes.find()

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

        # check if file ends with .csv
        csv_file = request.FILES["uploadedFile"]
        if not csv_file.name.endswith('.csv'):
            return Response({'error':'file is not csv'})
        
        # decode file
        try:
            csv_file = csv_file.read().decode("utf-8").split("\r\n")
        except:
            return Response({'error':'file may be corrupted, check file format and try again.'})

        results = {}
        results["results"] = bootstrapAgmt(csv_file)
        
        client.close()
        return Response(results)

class RetrieveAgmtCodes(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.AgmtCodes.find()

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

        if(not (isCM(userType) or isCompliance(userType))):
            client.close()
            return Response({'error' : 'invalid userType'})

        results = {}
        results["results"] = retrieveAgmt()
        
        client.close()
        return Response(results)