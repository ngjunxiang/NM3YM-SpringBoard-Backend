"""
Definition of models.
"""

from django.db import models

# Create your models here.
class Login(models.Model):
    username = models.CharField(blank=False,unique=True,max_length=25)
    password = models.CharField(blank=False,max_length=25)

