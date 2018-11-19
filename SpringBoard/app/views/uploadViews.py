from pymongo import MongoClient
import json
import PyPDF2

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import *
from app.serializers import *
from app.models import *

from app.utils.upload import *
from app.utils.tokenCRUD import *
from app.utils.userCRUD import *
from app.utils.notificationCRUD import *

client = MongoClient('mongodb://localhost:27017/')
db = client.SpringBoard
filename = "./app/data/reg51.pdf"

class UploadAgmtCodes(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.AgmtCodes.find()

    def post(self,request):
        """Extract Agmt Codes into DB."""

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

        # check if file ends with .csv or .xlsx
        file = request.FILES["uploadedFile"]
        if not file.name.endswith(('.csv','xlsx','xls')):
            return Response({'error':'file is not csv or excel'})
        filename = file.name
        destination = open(filename,'wb+')
        for chunk in file.chunks():
            destination.write(chunk)
        destination.close()

        # decode file
        try:
            if file.name.endswith('csv'):
                file = file.read().decode("utf-8").split("\r\n")
        except:
            return Response({'error':'file may be corrupted, check file format and try again.'})

        results = {}
        agmtResults = bootstrapAgmt(filename)

        if "error" in agmtResults.keys():
            client.close()
            return Response(agmtResults)

        results["results"] = agmtResults
        
        client.close()
        return Response(results)

class UploadReg51(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.AgmtCodes.find()

    def post(self,request):
        """Stores latest reg 51 in the server."""

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

         # check if file ends with .pdf
        file = request.FILES["uploadedFile"]
        if not file.name.endswith(('.pdf')):
            return Response({'error':'file is not pdf'})
        results = {}
        try:
            destination = open(filename,'wb+')
            for chunk in file.chunks():
                destination.write(chunk)
            destination.close()
        except:
            return Response({"error":"Failed to upload file"})
        
        if(not createReq51UploadNotification()):
            return Response({"error":"Notification failed to populate but file uploaded"})

        results["results"] = True
        return Response(results)

class RetrieveAgmtCodes(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.AgmtCodes.find()

    def post(self,request):
        """Retrieves Agmt Codes."""
        
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

        results = {}
        results["results"] = retrieveAgmt()
        
        client.close()
        return Response(results)

class RetrieveReg51PageCount(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.AgmtCodes.find()

    def post(self,request):
        """Retrieve number of pages in reg 51."""
        
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

        results = {}
        reader = PyPDF2.PdfFileReader(open(filename,'rb'))
        pageCount = reader.getNumPages()
        results["results"] = {"pageCount":pageCount}
        
        client.close()
        return Response(results)