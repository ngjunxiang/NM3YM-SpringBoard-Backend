from django.conf.urls import url
from django.contrib import admin
from django.urls import include, path
from . import views
from .views import *
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    url('admin/', admin.site.urls),
    url('loginList', LoginView.as_view(), name="loginList"),
]

urlpatterns = format_suffix_patterns(urlpatterns)