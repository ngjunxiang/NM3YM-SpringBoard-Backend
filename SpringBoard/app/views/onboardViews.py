from pymongo import MongoClient
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.response import Response
from rest_framework.generics import *
from app.serializers import *
from app.models import *

from app.utils.tokenCRUD import *
from app.utils.onboardCRUD import *

client = MongoClient('mongodb://localhost:27017/')
db = client.SpringBoard

# ------------------------------------------------------------------- #
#                            Onboard CRUD                             #
# ------------------------------------------------------------------- #

#Create new onboard
class CreateOnboard(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.Onboards.find()

    def post(self,request):
        """Creates an onboard."""

        # request parameters
        onboard = request.data['checklist']
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']

        # authentication
        tokenResults = tokenAuthenticate(username,token)
        if(len(tokenResults) != 0):
            client.close()
            return Response(tokenResults)
        if(not isFO(userType)):
            client.close()
            return Response({'error' : 'invalid userType'})

        results = createNewOnBoard(onboard,username)

        client.close()
        return Response(results)

#update onboard and delete onboard endpoints
class ManageOnboard(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.Onboards.find()

    #update onboard
    def post(self,request):
        """Updates an onboard."""

        # request parameters
        obID = request.data['obID']
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']
        onboard = request.data['checklist']

        # authentication
        tokenResults = tokenAuthenticate(username,token)
        if(len(tokenResults) != 0):
            client.close()
            return Response(tokenResults)
        if(not isFO(userType)):
            client.close()
            return Response({'error' : 'invalid userType'})

        results = updateSelectedOnboard(obID,onboard)

        client.close()
        return Response(results)

    #delete onboard
    def delete(self,request):
        """Deletes an onboard."""

        # request parameters
        obID = request.data['obID']
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
            return Response({'error' : 'invalid userType' })

        results = deleteSelectedOnboard(obID)

        client.close()
        return Response(results)

#Retrieve all onboard handled by logged on FO
class RetrieveAllOnboards(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.Onboards.find()

    def post(self,request):
        """Retrieves all onboards involving the user."""

        # request parameters
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']

        # authentication
        tokenResults = tokenAuthenticate(username,token)
        if(len(tokenResults) != 0):
            client.close()
            return Response(tokenResults)
        if(not isFO(userType)):
            client.close()
            return Response({'error' : 'invalid userType'})

        results = {}
        results['results'] = getAllCurrentOnboards(username,userType)

        client.close()
        return Response(results)

#Retrieve selected onboard
class RetrieveSelectedOnboard(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.Onboards.find()

    def post(self,request):
        """Retrieves the onboard with the given obID."""

        # request parameters
        obID = request.data['obID']
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']

        # authentication
        tokenResults = tokenAuthenticate(username,token)
        if(len(tokenResults) != 0):
            client.close()
            return Response(tokenResults)
        if(not isFO(userType)):
            client.close()
            return Response({'error' : 'invalid userType'})

        results = getSelectedOnboard(obID)

        client.close()
        return Response(results)

class FilterSortOnboard(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.Onboards.find()

    def post(self,request):
        """Retrieves sorted onboards."""
    
        # request parameters
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']
        sortBy = request.data['sortBy']
        obList = request.data['obList']
    
        # authentication
        tokenResults = tokenAuthenticate(username,token)
        if(len(tokenResults) != 0):
            client.close()
            return Response(tokenResults)
        if(not isFO(userType)):
            client.close()
            return Response({'error' : 'invalid userType'})

        results = {}
        results["results"] = getSortedOnboards(sortBy,obList)
        
        client.close()
        return Response(results)

class FilterByOnboard(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.Onboards.find()

    def post(self,request):
        """Retrieves filtered onboards."""
    
        # request parameters
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']
        filterBy = request.data['filterBy']
        obList = request.data['obList']

        # authentication
        tokenResults = tokenAuthenticate(username,token)
        if(len(tokenResults) != 0):
            client.close()
            return Response(tokenResults)
        if(not isFO(userType)):
            client.close()
            return Response({'error' : 'invalid userType'})

        results = {}
        results["results"] = getFilteredOnboards(filterBy,obList)
        
        client.close()
        return Response(results)