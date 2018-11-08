from pymongo import MongoClient
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.response import Response
from rest_framework.generics import *
from app.serializers import *
from app.models import *
from django.http import HttpResponse

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
        try:
            num = request.data['num']
        except:
            num = None

        # authentication
        tokenResults = tokenAuthenticate(username,token)
        if(len(tokenResults) != 0):
            client.close()
            return Response(tokenResults)
        if(not (isCM(userType) or isFO(userType))):
            client.close()
            return Response({'error' : 'invalid userType'})

        if num != None:
            results = getAnswer(question,int(num))
        else: 
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

        results = addQNA(qna,username)

        client.close()
        return Response(results)

# CM add to knowledge base
class CMAddAnsweredQuestion(CreateAPIView):
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

        results = cmAddQNA(qna,username)

        client.close()
        return Response(results)

# delete from knowledge base
class DeleteAnsweredQuestion(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.knowledgeBase.find()

    def post(self,request):

        # request parameters
        qnID = request.data['qnID']
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

        results = deleteQNA(qnID)

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

        results = editQNA(qna,username)

        client.close()
        return Response(results)

# retrieve question by qnID
class RetrieveQNA(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.knowledgeBase.find()

    def post(self,request):

        # request parameters
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']
        qnID = request.data['qnID']


        # authentication
        tokenResults = tokenAuthenticate(username,token)
        if(len(tokenResults) != 0):
            client.close()
            return Response(tokenResults)
        if(not (isCM(userType) or isFO(userType))):
            client.close()
            return Response({'error' : 'invalid userType'})

        results = retrieveQNA(qnID)
        
        client.close()
        return Response(results)

# retrieve questions with references
class RetrieveRefQNA(CreateAPIView):
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

        results = retrieveRefQNA()
        
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

        results = retrieveAllQNA(userType)
        
        client.close()
        return Response(results)

# retrieve all questions by views or date from knowledge base
class RetrieveAllQNABy(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.knowledgeBase.find()

    def post(self,request):

        # request parameters
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']
        retrieveBy = request.data['retrieveBy']
        sortBy = request.data['sortBy']

        # authentication
        tokenResults = tokenAuthenticate(username,token)
        if(len(tokenResults) != 0):
            client.close()
            return Response(tokenResults)
        if(not (isCM(userType) or isFO(userType))):
            client.close()
            return Response({'error' : 'invalid userType'})

        results = retrieveAllQNABy(retrieveBy,sortBy)
        
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

        results = addQuestion(question,username)

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
        qnID = request.data['qnID']
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

        results = deleteUnanswered(qnID)

        client.close()
        return Response(results)

# increment view
class incrementQNAViews(CreateAPIView):
    serializer_class = CLSerializer
    queryset = db.unansweredQuestions.find()

    def post(self,request):

        # request parameters
        qnID = request.data['qnID']
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

        results = incrementViews(qnID,username)

        client.close()
        return Response(results)

# ------------------------------------------------------------------- #
#                        FO/CM specific methods                       #
# ------------------------------------------------------------------- #

class UserRetrieveAnswers(CreateAPIView):
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
        if(not isFO(userType)):
            client.close()
            return Response({'error' : 'invalid userType'})

        results = userRetrieveAllQNA(username)

        client.close()
        return Response(results)

class CMUserRetrieveAnswers(CreateAPIView):
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

        results = cmUserRetrieveAllQNA(username)

        client.close()
        return Response(results)

# ------------------------------------------------------------------- #
#                                PDF File                             #
# ------------------------------------------------------------------- #

class RetrieveFile(CreateAPIView):
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

        returnFile =  open("./app/data/reg51.pdf", 'rb')
        
        results = HttpResponse(returnFile, content_type='application/pdf')
        results['Content-Disposition'] = 'attachment; filename="reg51.pdf"'

        client.close()
        return results