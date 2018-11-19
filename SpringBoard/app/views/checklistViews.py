from pymongo import MongoClient
import json

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import *
from app.serializers import *
from app.models import *

from app.utils.tokenCRUD import *
from app.utils.userCRUD import *
from app.utils.checkListCRUD import *

client = MongoClient('mongodb://localhost:27017/')
db = client.SpringBoard

# ------------------------------------------------------------------- #
#                            Checklist CRUD                           #
# ------------------------------------------------------------------- #

#Allows CM to create new checklists
class CreateCL(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.Checklists.find()

    def post(self,request):
        """Checklist creation. Takes in checklist as JSON object."""

        # request parameters
        document = request.data['checklist']
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']
        name = request.data['name']

        # authentication
        tokenResults = tokenAuthenticate(username,token)
        if(len(tokenResults) != 0):
            client.close()
            return Response(tokenResults)
        if(not isCM(userType)):
            client.close()
            return Response({'error' : 'invalid userType'})

        results = createCheckList(document,name)

        client.close()
        return Response(results)

# For COM/CM to manage CL details. post is for retrieving of checklists, delete is for deleting of checklists
class ManageCL(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.Checklists.find()

    #retrieve a single checklist
    def post(self,request):
        """Retrieve checklist with the given clID."""
        # request parameters
        clID = request.data['clID']
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

        results = retrieveCheckList(clID)

        client.close()
        return Response(results)

    #delete checklist
    def delete(self,request):
        """Deletes checklist with the given clID."""

        # request parameters
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']
        clID = request.data['clID'] 
        
        # authentication
        results = tokenAuthenticate(username,token)
        if(len(results) != 0):
            client.close()
            return Response(results)
        if(not isCM(userType)):
            client.close()
            return Response({'error' : 'invalid userType' })

        # log checklist
        results = logCheckList(clID,True) # True = to delete
        if('error' in results):
            return Response(results)

        # delete checklist
        results = deleteCheckList(clID)

        client.close()
        return Response(results)

# Allows CM to update selected CL details
class UpdateCL(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.Checklists.find()

    def post(self,request):
        """Replaces checklist with the given clID."""

        # request parameters
        document = request.data['checklist']
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']
        clID = request.data['clID']
        name = request.data['name']

        # authentication
        tokenResults = tokenAuthenticate(username,token)
        if(len(tokenResults) != 0):
            client.close()
            return Response(tokenResults)
        if (not isCM(userType)):
            client.close()
            return Response({'error' : 'invalid userType'})
        
        # log checklist
        results = logCheckList(clID)
        if('error' in results):
            client.close()
            return Response(results)

        # get version 
        version = int(getCLversion(clID)) + 1
        createdDate = getCreatedDate(clID)
        createdBy = getCreatedBy(clID)

        # delete checklist
        results = deleteCheckList(clID)

        # insert updated checklist
        if(results["items_deleted"] != 0):
            results = updateCheckList(document,name,clID,version,createdDate,createdBy)
        
        client.close()
        return Response(results)


# ------------------------------------------------------------------- #
#                             CM Methods                              #
# ------------------------------------------------------------------- #

# Retrieve all Checklist names and versions
class CMRetrieveNamesAndVersions(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.ChecklistLogs.find()

    def post(self,request):
        """Retrieve clID, name and version numbers of all checklists."""
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
        results["results"] = retrieveNamesWithVersions()

        client.close()
        return Response(results)

# Retrieve previous version list by passing in the clID and version number
class CMRetrieveLoggedLists(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.ChecklistLogs.find()

    def post(self,request):
        """Retrieve checklist with the specific clID and version."""

        # request parameters
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']
        clID = request.data['clID']
        version = request.data['version']

        # authentication
        tokenResults = tokenAuthenticate(username,token)
        if(len(tokenResults) != 0):
            client.close()
            return Response(tokenResults)
        if(not isCM(userType)):
            client.close()
            return Response({'error' : 'invalid userType'})

        results = {}
        results["results"] = retrieveLoggedCheckLists(clID,version)

        client.close()
        return Response(results)

# Restores a logged checklist
class CMRestoreChecklist(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.ChecklistLogs.find()

    def post(self,request):
        """Restore checklist from log with the specific clID and version."""

        # request parameters
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']
        clID = request.data['clID']
        version = request.data['version']

        # authentication
        tokenResults = tokenAuthenticate(username,token)
        if(len(tokenResults) != 0):
            client.close()
            return Response(tokenResults)
        if(not isCM(userType)):
            client.close()
            return Response({'error' : 'invalid userType'})

        results = {}
        results["results"] = restoreCheckList(clID,version)

        client.close()
        return Response(results)

# Returns all checklist names for CMs
class CMRetrieveCLNames(CreateAPIView):
     serializer_class = CLSerializer
     queryset = db.Checklists.find()

     def post(self,request):
        """Retrieve names of all checklists."""

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

        results = retrieveCheckListByName()

        client.close()
        return Response(results)


# ------------------------------------------------------------------- #
#                             FO Methods                              #
# ------------------------------------------------------------------- #

# Retrieve a single checklist for FOs
class FORetrieveCL(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.Checklists.find()

    def post(self,request):
        """Retrieve checklist with the given clID."""

        # request parameters
        clID = request.data['clID']
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

        results = retrieveCheckList(clID)

        client.close()
        return Response(results)

# Returns all checklist names for FOs
class FORetrieveCLNames(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.Checklists.find()

    def post(self,request):
        """Retrieve names of all checklists."""

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

        results = retrieveCheckListByName()

        client.close()
        return Response(results)

