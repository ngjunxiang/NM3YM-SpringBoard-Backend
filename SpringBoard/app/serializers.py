
from django.utils.translation import ugettext_lazy as _

#from rest_framework_mongoengine.serializers import DocumentSerializer
from rest_framework import serializers
from .models import Login

class UserSerializer(serializers.Serializer):
    class meta:
        model = Login
        fields = '__all__'

#class AuthTokenSerializer(serializers.Serializer):
#    username = serializers.CharField(label=_("Username"))
#    password = serializers.CharField(label=_("Password"), style={'input_type': 'password'})

#    def validate(self, attrs):
#        username = attrs.get('username')
#        password = attrs.get('password')

#        if username and password:
#            user = authenticate(username=username, password=password)

 #           if user:
                # From Django 1.10 onwards the `authenticate` call simply
                # returns `None` for is_active=False users.
                # (Assuming the default `ModelBackend` authentication backend.)
#                if not user.is_active:
#                    msg = _('User account is disabled.')
#                    raise serializers.ValidationError(msg)
#            else:
#                msg = _('Unable to log in with provided credentials.')
#                raise serializers.ValidationError(msg)
#        else:
#            msg = _('Must include "username" and "password".')
#            raise serializers.ValidationError(msg)

#       attrs['user'] = user
#        return attrs