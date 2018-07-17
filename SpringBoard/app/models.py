"""
Definition of models.
"""
import datetime
import binascii
import os

from django.db import models
from rest_framework_mongoengine import serializers, viewsets
from rest_framework import response
#from django.utils import timezone
#from django.utils.encoding import python_2_unicode_compatible
#from django.utils.translation import ugettext_lazy as _

from mongoengine import fields, Document

# Create your models here.

class Users(Document):
    username = fields.StringField(primary_key=True,required=True,max_length=25)
    password = fields.StringField(required=True,max_length=25)
    userType = fields.StringField(required=True,max_length=5)

    #def is_authenticated(self):
    #    return True

    #def check_password(self, raw_password):
    #   """
    #   Checks the user's password against a provided password - always use
    #   this rather than directly comparing to
    #   :attr:`~mongoengine.django.auth.User.password` as the password is
    #   hashed before storage.
    #   """
    #   return check_password(raw_password, self.password)

#class Token(Document):
#    """
#    This is a mongoengine adaptation of DRF's default Token.
#    The default authorization token model.
#    """
#    key = fields.StringField(blank=True)
#    #user = fields.ReferenceField(User, reverse_delete_rule=mongoengine.CASCADE)
#    created = fields.DateTimeField(default=timezone.now)

#    def save(self, *args, **kwargs):
#        if not self.key:
#            self.key = self.generate_key()
#        return super(Token, self).save(*args, **kwargs)

#   def generate_key(self):
#        return binascii.hexlify(os.urandom(20)).decode()

#    def __str__(self):
#        return self.key
