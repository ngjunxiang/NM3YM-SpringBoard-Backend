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

client = MongoClient('mongodb://localhost:27017/')
db = client.SpringBoard

class RMDashboard(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.Checklists.find()

    def post(self,request):

        # request parameters
        username = request.data['username']

        results = {}
        results["completedCount"] = getCompletedClients(username)
        results["pendingCount"] = getPendingClients(username)
        results["OnBoardedClients"] = getOnboardedClients(username)

        client.close()
        return Response(results)