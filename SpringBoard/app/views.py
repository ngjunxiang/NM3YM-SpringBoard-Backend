"""
Definition of views.
"""

from django.shortcuts import render
#from django.http import HttpRequest
#from django.template import RequestContext
from datetime import datetime
from .serializers import UserSerializer
from rest_framework import *
from .views import *



import json

class ObtainAuthToken(views.APIView):
    authentication_classes = (TokenAuthentication, )
    serializer_class = AuthTokenSerializer

    def post(self,request, *args, **kwargs):
        serailizer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})

obtain_auth_token = ObtainAuthToken.as_view()