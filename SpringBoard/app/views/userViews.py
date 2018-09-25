from pymongo import MongoClient
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.response import Response
from rest_framework.generics import *
from app.serializers import *
from app.models import *

from app.utils.tokenCRUD import *
from app.utils.userCRUD import *

client = MongoClient('mongodb://localhost:27017/')
db = client.SpringBoard
ph = PasswordHasher()

# create and delete users
class ManageUsers(CreateAPIView,DestroyAPIView):
    serializer_class = UserSerializer

    #create user
    def post(self,request):

        # request parameters
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']

        newUsername = request.data['newUsername']
        newPassword = request.data['newPassword']
        newUserType = request.data['newUserType']
        newEmail = request.data['newEmail']
        name = request.data['newName']

        # authenticate
        results = tokenAuthenticate(username,token)
        if(len(results) != 0):
            client.close()
            return Response(results)
        if(not isAdmin(userType)):
            client.close()
            return Response({'error' : 'invalid userType' })

        # check for username/email duplication
        if(not checkIfUserExists(newUsername)):
            return Response({'error' : 'Username already used in database' })
        if(not checkIfEmailExists(newEmail)):
            return Response({'error' : 'Email already used in database' })

        # hash password
        hashedPw = ph.hash(newPassword)

        results = createUser(newUsername,hashedPw,newUserType,name,newEmail) 

        client.close()
        return Response(results)

    #delete user
    def delete(self,request):

        # request parameters
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']

        deleteUsername = request.data['deleteUsername']

        # authenticate
        results = tokenAuthenticate(username,token)
        if(len(results) != 0):
            client.close()
            return Response(results)
        if(not isAdmin(userType)):
            client.close()
            return Response({'error' : 'invalid userType' })

        results = deleteUser(deleteUsername)

        client.close()
        return Response(results)

class UpdateUsers(CreateAPIView):
    serializer_class = UserSerializer 
    queryset = db.Users.find()

    #update user
    def post(self,request):

        # request parameters
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']

        updateUsername = request.data['updateUsername']
        updatePassword = request.data['updatePassword']

        # authenticate
        results = tokenAuthenticate(username,token)
        if(len(results) != 0):
            client.close()
            return Response(results)
        if(not isAdmin(userType)):
            client.close()
            return Response({'error' : 'invalid userType' })
        
        # hash password
        hashedPw = ph.hash(updatePassword)

        results = updateUser(updateUsername,hashedPw)

        client.close()
        return Response(results)

# Retrieve all RM names
class FORetrieveRMNames(CreateAPIView):
    serializer_class = UserSerializer 
    queryset = db.Users.find()

    def post(self,request):

        # request parameters
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']

        # authenticate
        results = tokenAuthenticate(username,token)
        if(len(results) != 0):
            client.close()
            return Response(results)
        if(not isFO(userType)):
            client.close()
            return Response({'error' : 'invalid userType'})

        results = getAllRMNames()

        client.close()
        return Response(results)

class RetrieveDetails(CreateAPIView):
    serializer_class = UserSerializer

    def post(self, request):

        # request parameters
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']

        # authenticate
        results = tokenAuthenticate(username,token)
        if(len(results) != 0):
            client.close()
            return Response(results)

        name = getName(username)
        email = getEmail(username)

        return Response({'name' : name,'email':email})
        
class RetrieveUsers(CreateAPIView):
    serializer_class = UserSerializer

    def post(self, request):

        # request parameters
        username = request.data['username']
        token = request.data['token']
        userType = request.data['userType']

        # authenticate
        results = tokenAuthenticate(username,token)
        if(len(results) != 0):
            client.close()
            return Response(results)
        if(not isAdmin(userType)):
            client.close()
            return Response({'error' : 'invalid userType' })

        results = retrieveAllUser()
        
        client.close()
        return Response(results)