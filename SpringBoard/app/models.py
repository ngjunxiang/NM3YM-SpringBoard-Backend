"""
Definition of models.
"""

from django.db import models
from rest_framework import serializers, viewsets, response
from django.utils import timezone
from django.utils.encoding import python_2_unicode_compatible
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.hashers import check_password, make_password
from django.contrib.auth.models import _user_has_perm, _user_get_all_permissions, _user_has_module_perms

#import mongoengine
#from mongoengine import fields, Document, ImproperlyConfigured

# Create your models here.

class Users(object):
    def __init__(self,username,password,userType,email):
        self.username = username
        self.password = password
        self.userType = userType
        self.email = email


