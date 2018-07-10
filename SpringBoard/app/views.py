"""
Definition of views.
"""

from django.shortcuts import render
from django.http import HttpRequest
from django.template import RequestContext
from datetime import datetime
from app.serializers import LoginSerializer
from app.models import Login
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import rest_framework_jwt
import json
import forms


class LoginView(viewsets.ModelViewSet):
    queryset = Login.objects.all()
    serializer_class = LoginSerializer
    print("wtf")
    def post(request):
        print("ran herejfsndjkfndskjnfkdsnfkds")
        if not request.data:
            return Response({'Error': "Please provide username/password"}, status="400")
        
        username = request.data['username']
        password = request.data['password']

        try:
            user = Login.objects.get(username=username, password=password)
        except Login.DoesNotExist:
            return Response({'Error': "Invalid username/password"}, status="400")
        if user:
            try:
                payload = jwt_payload_handler(user)
                token = rest_framework_jwt.encode(payload, "NMMMYMS3Cr3tK3y5")
                user_details = {}
                user_details['name'] = "%s %s" % (username)
                user_details['token'] = token
                print(user_details)
                user_logged_in.send(sender=user.__class__,
                                    request=request, user=user)
                print(user_details)
                return Response(
                    user_details
                )
            except Exception as e:
                raise e
        else:
            res = {
                'error': 'can not authenticate with the given credentials or the account has been deactivated'}
            return Response(res)

class adminView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    quertset = Login.objects.all()
    serializer_class = LoginSerializer


def home(request):
    """Renders the home page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/index.html',
        {
            'title':'Home Page',
            'year':datetime.now().year,
        }
    )

def contact(request):
    """Renders the contact page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/contact.html',
        {
            'title':'Contact',
            'message':'Your contact page.',
            'year':datetime.now().year,
        }
    )

def about(request):
    """Renders the about page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/about.html',
        {
            'title':'About',
            'message':'Your application description page.',
            'year':datetime.now().year,
        }
    )
