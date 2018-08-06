from datetime import datetime
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import include, url

#from rest_framework_mongoengine import routers as mrouter
from app import views


#router = mrouter.DefaultRouter()
#router.register(r'login', views.UserLogin, base_name = 'login')
#router.add_api_view(r'auth', url(r'^auth/$', ObtainAuthToken.as_view(), name=r"auth"))

urlpatterns = [
    #url(r'^', include(router.urls)),
    url(r'^login', views.UserLogin.as_view()),
    url(r'^authenticateAdmin',views.authenticateAdmin.as_view()),
    url(r'^authenticateCM',views.authenticateCM.as_view()),
    url(r'^authenticateRM',views.authenticateRM.as_view()),
    url(r'^retrieve-users', views.RetrieveUsers.as_view()),
    url(r'^manage-users', views.ManageUsers.as_view()),
    url(r'^update-users', views.UpdateUsers.as_view()),
    url(r'^create-checklist', views.CreateCL.as_view()),
    url(r'^cm-manage-checklist', views.ManageCL.as_view()),
    url(r'^update-checklist', views.UpdateCL.as_view()),
    url(r'^rm-retrieve-checklistNames', views.RMRetrieveCLNames.as_view()),
    url(r'^rm-retrieve-checklist', views.RMRetrieveCL.as_view()),
    url(r'^cm-retrieve-checklistNames', views.CMRetrieveCLNames.as_view()),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
    # root view of our REST api, generated by Django REST Framework's router
    #url(r'^api/', include(router.urls, namespace='api')),
]
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)