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

import mongoengine
from mongoengine import fields, Document, ImproperlyConfigured

# Create your models here.

class User(Document):
    username  = fields.StringField(primary_key=True,required=True,null=True,max_length=25)
    password = fields.StringField(required=True,max_length=25)
    userType = fields.StringField(required=True,max_length=5)

    def is_authenticated(self):
        return True

    def check_password(self, raw_password):
       """
       Checks the user's password against a provided password - always use
       this rather than directly comparing to
       :attr:`~mongoengine.django.auth.User.password` as the password is
       hashed before storage.
       """
       return check_password(raw_password, self.password)

class Token(Document):
    """
    This is a mongoengine adaptation of DRF's default Token.
    The default authorization token model.
    """
    key = fields.StringField(required=True)
    user = fields.ReferenceField(User, reverse_delete_rule=mongoengine.CASCADE)
    created = fields.DateTimeField(default=timezone.now)

    def save(self, *args, **kwargs):
        if not self.key:
            self.key = self.generate_key()
        return super(Token, self).save(*args, **kwargs)

    def generate_key(self):
        return binascii.hexlify(os.urandom(20)).decode()

    def __str__(self):
        return self.key
