"""
Definition of views.
"""

from django.shortcuts import render
from django.http import *   
from django.template import RequestContext
from datetime import datetime
from app.serializers import LoginSerializer
from app.models import Login
from rest_framework import viewsets
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
import rest_framework_jwt
import json
import app.forms
import jwt


class LoginView(viewsets.ModelViewSet):
    #serializer_class = LoginSerializer
    
    def post(request):
        username = request.POST.get('username')
        password = request.POST.get('password')
        #user = authenticate(username="RandyLai", password="qwer1234")
        if (username=="RandyLai" and password=="qwer1234"):
            payload = {
                'username' : username    
            }
            token = jwt.encode(payload, "NMMMYMS3Cr3tK3y5",algorithm='HS256').decode('utf-8')
            return HttpResponse(
                json.dumps(token),
                content_type="application/json"
            )
        else:
            return HttpResponse(
                json.dumps({'Error': "Invalid credentials"}),
                status=400,
                content_type="application/json"
            )

class adminView(viewsets.ModelViewSet):
    #permission_classes = (IsAuthenticated,)
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
