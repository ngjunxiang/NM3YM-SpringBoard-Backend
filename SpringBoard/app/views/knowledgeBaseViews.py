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

# ------------------------------------------------------------------- #
#                      Knowledge Base Management                      #
# ------------------------------------------------------------------- #

#Retrieve answers
class RetrieveAnswers(CreateAPIView):
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
        if(not (isCM(userType) or isFO(userType))):
            client.close()
            return Response({'error' : 'invalid userType'})

        results = getAnswer(question)

        client.close()
        return Response(results)

# add to knowledge base
class AddAnsweredQuestion(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.knowledgeBase.find()

    def post(self,request):

        # request parameters
        qna = request.data['qna']
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

        results = addQNA(qna)

        client.close()
        return Response(results)

# delete from knowledge base
class DeleteAnsweredQuestion(CreateAPIView):
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
        if(not isCM(userType)):
            client.close()
            return Response({'error' : 'invalid userType'})

        results = deleteQNA(question)

        client.close()
        return Response(results)

# edit question from knowledge base
class EditAnsweredQuestion(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.knowledgeBase.find()

    def post(self,request):

        # request parameters
        qna = request.data['qna']
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

        results = editQNA(qna)

        client.close()
        return Response(results)

# retrieve all questions from knowledge base
class RetrieveAllQNA(CreateAPIView):
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
        if(not (isCM(userType) or isFO(userType))):
            client.close()
            return Response({'error' : 'invalid userType'})

        results = retrieveAllQNA()

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


# ------------------------------------------------------------------- #
#                      Unanswered Qns Management                      #
# ------------------------------------------------------------------- #

# Add question
class AddUnansweredQuestion(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.unansweredQuestions.find()

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
        if(not isFO(userType)):
            client.close()
            return Response({'error' : 'invalid userType'})

        results = addQuestion(question)

        client.close()
        return Response(results)

# retrieve unanswered questions
class RetrieveUnansweredQuestion(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.unansweredQuestions.find()

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

        results = retrieveUnanswered()

        client.close()
        return Response(results)

# delete unanswered question from knowledge base
class DeleteUnansweredQuestion(CreateAPIView):
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
        if(not isCM(userType)):
            client.close()
            return Response({'error' : 'invalid userType'})

        results = deleteUnanswered(question)

        client.close()
        return Response(results)

