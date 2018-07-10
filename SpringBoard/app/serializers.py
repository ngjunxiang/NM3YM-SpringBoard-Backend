from rest_framework import serializers
from app.models import Login

class LoginSerializer(serializers.ModelSerializer):

    class Meta:
        model = Login
        fields = ('username', 'password')

