from django.conf.urls import url
from django.contrib import admin
from django.urls import include, path
from . import views
from .views import *
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_jwt.views import *
from django.http import HttpRequest

urlpatterns = [
    url('admin/', admin.site.urls),
    url('loginList', LoginView.post, name="LoginView"),
    url('adminView', adminView, name="adminView"),
    url('auth/obtain_token', obtain_jwt_token, name="obtain_token"),
    url('auth/refresh_token', refresh_jwt_token, name="refresh_token"),
    url('auth/verify_token', verify_jwt_token, name="verify_token"),

]

urlpatterns = format_suffix_patterns(urlpatterns)