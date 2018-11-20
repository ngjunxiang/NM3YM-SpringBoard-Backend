from pymongo import MongoClient
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.response import Response
from rest_framework.generics import *
from app.serializers import *
from app.models import *

from app.utils.tokenCRUD import *
from app.utils.dashboardCRUD import *
from app.utils.userCRUD import *

client = MongoClient('mongodb://localhost:27017/')
db = client.SpringBoard

class FODashboard(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.Checklists.find()

    def post(self,request):
        """Retrieves all data for FO dashboard"""

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

        content = {}
        content["completedCount"] = getCompletedClients(username,userType)
        content["pendingCount"] = getPendingClients(username,userType)
        content["onBoardedClients"] = getOnboardedClients(username,userType)
        
        results = {}
        results["results"] = content
        results["docChanges"] = changesInChecklists(username)
        results["clientsAffected"] = clientsAffectedByChanges(username, userType)
        results["pendingClients"] = getAllPendingClients(username, userType)
        results["recentlyAnswerQuestions"] = mostRecentAnswerQuestions(username)

        client.close()
        return Response(results)

class CMDashboard(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.Checklists.find()

    def post(self,request):
        """Retrieves all data for CM dashboard"""

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

        content = {}
        content["unansweredCount"] = unansweredQuestions()
        content["answeredCount"] = numberOfAnsweredQuestions(username)
        
        results = {}
        results["results"] = content
        results["updatedChecklists"] = getUpdatedChecklists()
        results["mostRecentQuestions"] = mostRecentQuestions()
        results["mostPopularQuestions"] = mostPopularQuestions()
        #results["pendingClients"] = getAllPendingClients(username, userType)

        client.close()
        return Response(results)