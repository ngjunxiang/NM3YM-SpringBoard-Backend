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
SECRET_KEY = 'NM^3YM'
ph = PasswordHasher()


class UserLogin(CreateAPIView):
    serializer_class = UserSerializer

    def post(self, request):

        collection = db.Users

        # request parameters
        username = request.data['username']
        password = request.data['password']

        # retrieve password hash of user
        query = collection.find_one({'username':username},{'password':1, '_id':0})

        results = {'error' : 'invalid username/password' }

        # if no such user return invalid
        if query == None:
            client.close()
            return Response(results)
        
        # retrieve password hash if user exists
        pw = query['password']

        # verify password and generate token
        try:
            ph.verify(pw,password)
            
            results = {}
            results['userType'] = collection.find_one({'username':username},{'userType':1, '_id':0})['userType']

            # encode token
            encoded_token = jwt.encode(
                {
                    'username': username,
                    'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
                }, 
                SECRET_KEY, 
                algorithm='HS256'
            )

            storeToken(username,encoded_token)

            results['token'] = encoded_token
            results['name'] = getName(username)

            client.close()
            return Response(results)

        except exceptions.VerifyMismatchError as e:

            client.close()
            return Response(results)