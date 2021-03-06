from pymongo import MongoClient
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.response import Response
from rest_framework.generics import *
from app.serializers import *
from app.models import *

from app.utils.tokenCRUD import *
from app.utils.notificationCRUD import *
from app.utils.userCRUD import *

client = MongoClient('mongodb://localhost:27017/')
db = client.SpringBoard

# class FORetrieveLatestNotification(CreateAPIView):
#     serializer_class = CLSerializer
#     queryset = db.Notifications.find()

#     def post(self,request):

#         # request parameters
#         username = request.data['username']
#         token = request.data['token']
#         userType = request.data['userType']

#         tokenResults = tokenAuthenticate(username,token)
#         if(len(tokenResults) != 0):
#             client.close()
#             return Response(tokenResults)
#         if(not isFO(userType)):
#             client.close()
#             return Response({'error' : 'invalid userType'})

#         results = {}
#         results["results"] = getNewNotifications(username)

#         client.close()
#         return Response(results)

# class FORetrieveAllNotification(CreateAPIView):
#     serializer_class = CLSerializer
#     queryset = db.Notifications.find()

#     def post(self,request):

#         # request parameters
#         username = request.data['username']
#         token = request.data['token']
#         userType = request.data['userType']

#         tokenResults = tokenAuthenticate(username,token)
#         if(len(tokenResults) != 0):
#             client.close()
#             return Response(tokenResults)
#         if(not isFO(userType)):
#             client.close()
#             return Response({'error' : 'invalid userType'})

#         results = {}
#         results["results"] = getAllNotifications(username)

#         client.close()
#         return Response(results)

class FORetrieveNotifications(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.Notifications.find()

    def post(self,request):

        # request parameters
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']

        tokenResults = tokenAuthenticate(username,token)
        if(len(tokenResults) != 0):
            client.close()
            return Response(tokenResults)
        if(not isFO(userType)):
            client.close()
            return Response({'error' : 'invalid userType'})

        results = {}
        results["results"] = getFONotifications(username)

        client.close()
        return Response(results)
        
        
class FOUpdateNotification(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.Notifications.find()

    def post(self,request):

        # request parameters
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']

        tokenResults = tokenAuthenticate(username,token)
        if(len(tokenResults) != 0):
            client.close()
            return Response(tokenResults)
        if(not isFO(userType)):
            client.close()
            return Response({'error' : 'invalid userType'})

        results = {"error": "Notifications not updated"}
        notiBool = updateChecklistNotification(username)
        ansNotiBool = updateAnswerNotification(username)
        qnaNotiBool = updateQnANotification(username)
        if(notiBool and ansNotiBool and qnaNotiBool):
            results = {"Success":"Notifications updated"}

        client.close()
        return Response(results)

class CMRetrieveNotifications(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.Notifications.find()

    def post(self,request):

        # request parameters
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']

        tokenResults = tokenAuthenticate(username,token)
        if(len(tokenResults) != 0):
            client.close()
            return Response(tokenResults)
        if(not isCM(userType)):
            client.close()
            return Response({'error' : 'invalid userType'})

        results = {}
        results["results"] = getCMNotifications(username)

        client.close()
        return Response(results)

class CMUpdateNotification(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.Notifications.find()

    def post(self,request):

        # request parameters
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']

        tokenResults = tokenAuthenticate(username,token)
        if(len(tokenResults) != 0):
            client.close()
            return Response(tokenResults)
        if(not isCM(userType)):
            client.close()
            return Response({'error' : 'invalid userType'})

        results = {}
        results["results"]= updateCMNotification(username)

        client.close()
        return Response(results)

class CMUpdateReq51Notification(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.Notifications.find()

    def post(self,request):

        # request parameters
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']
        triggerNoti = request.data['reg51Notification']

        tokenResults = tokenAuthenticate(username,token)
        if(len(tokenResults) != 0):
            client.close()
            return Response(tokenResults)
        if(not isCM(userType)):
            client.close()
            return Response({'error' : 'invalid userType'})

        results = {}
        if(updateReq51Notification(triggerNoti)):
            results["results"]= "true"
        else:
            results["error"]= "Notification failed to populate. Either no Req51 is uploaded or server has an issue."

        client.close()
        return Response(results)

class CMRetrieveReq51Notification(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.Notifications.find()

    def post(self,request):

        # request parameters
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']

        tokenResults = tokenAuthenticate(username,token)
        if(len(tokenResults) != 0):
            client.close()
            return Response(tokenResults)
        if(not isCM(userType)):
            client.close()
            return Response({'error' : 'invalid userType'})

        results = {}
        results = {"results":getReg51Notification()}

        client.close()
        return Response(results)

class FORetrieveReq51Notification(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.Notifications.find()

    def post(self,request):

        # request parameters
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']

        tokenResults = tokenAuthenticate(username,token)
        if(len(tokenResults) != 0):
            client.close()
            return Response(tokenResults)
        if(not isFO(userType)):
            client.close()
            return Response({'error' : 'invalid userType'})

        results = {}
        results = {"results":getReg51Notification()}

        client.close()
        return Response(results)