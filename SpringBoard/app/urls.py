from datetime import datetime
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import include, url

#from rest_framework_mongoengine import routers as mrouter
from app.views import agmtCodeViews
from app.views import checklistViews
from app.views import dashboardViews
from app.views import loginViews
from app.views import notificationViews
from app.views import onboardViews
from app.views import tokenViews
from app.views import userViews
from app.views import knowledgeBaseViews
from app.utils.knowledgeBase import initialiseModel
from app.views import trainModelViews

initialiseModel()
#router = mrouter.DefaultRouter()
#router.register(r'login', views.UserLogin, base_name = 'login')
#router.add_api_view(r'auth', url(r'^auth/$', ObtainAuthToken.as_view(), name=r"auth"))

urlpatterns = [
    #url(r'^', include(router.urls)),

    # authentication endpoints
    url(r'^login', loginViews.UserLogin.as_view()),
    url(r'^authenticateAdmin',tokenViews.authenticateAdmin.as_view()),
    url(r'^authenticateCM',tokenViews.authenticateCM.as_view()),
    url(r'^authenticateFO',tokenViews.authenticateFO.as_view()),
    url(r'^authenticateCompliance',tokenViews.authenticateCompliance.as_view()),

    # admin endpoints
    url(r'^admin/retrieve-users', userViews.RetrieveUsers.as_view()),
    url(r'^admin/manage-users', userViews.ManageUsers.as_view()),
    url(r'^admin/update-users', userViews.UpdateUsers.as_view()),

    # CM endpoints
    url(r'^cm/create-checklist', checklistViews.CreateCL.as_view()),
    url(r'^cm/manage-checklist', checklistViews.ManageCL.as_view()),
    url(r'^cm/update-checklist', checklistViews.UpdateCL.as_view()),
    url(r'^cm/retrieve-checklistNames', checklistViews.CMRetrieveCLNames.as_view()),
    url(r'^cm/retrieve-loggedLists', checklistViews.CMRetrieveLoggedLists.as_view()),
    url(r'^cm/retrieve-clIDWithVersion', checklistViews.CMRetrieveNamesAndVersions.as_view()),
    url(r'^cm/upload-AgmtCodes', agmtCodeViews.UploadAgmtCodes.as_view()),
    url(r'^cm/upload-reg51', agmtCodeViews.UploadReg51.as_view()),
    url(r'^cm/retrieve-AgmtCodes', agmtCodeViews.RetrieveAgmtCodes.as_view()),
    url(r'^cm/retrieve-notifications', notificationViews.CMRetrieveNotifications.as_view()),
    url(r'^cm/update-notifications', notificationViews.CMUpdateNotification.as_view()),
    url(r'^cm/retrieve-req51-notifications', notificationViews.CMRetrieveReq51Notification.as_view()),
    url(r'^cm/update-req51-notifications', notificationViews.CMUpdateReq51Notification.as_view()),
    url(r'^cm/retrieve-dashboard', dashboardViews.CMDashboard.as_view()),

    # FO endpoints
    url(r'^fo/retrieve-dashboard', dashboardViews.FODashboard.as_view()),
    url(r'^fo/create-onboard', onboardViews.CreateOnboard.as_view()),
    url(r'^fo/manage-onboard', onboardViews.ManageOnboard.as_view()),
    url(r'^fo/retrieve-checklistNames', checklistViews.FORetrieveCLNames.as_view()),
    url(r'^fo/retrieve-checklist', checklistViews.FORetrieveCL.as_view()),
    url(r'^fo/retrieve-all-onboard', onboardViews.RetrieveAllOnboards.as_view()),
    url(r'^fo/retrieve-selected-onboard', onboardViews.RetrieveSelectedOnboard.as_view()),
    url(r'^fo/retrieve-rm-names', userViews.FORetrieveRMNames.as_view()),
    #url(r'^fo/retrieve-latest-notifications', notificationViews.FORetrieveLatestNotification.as_view()),
    #url(r'^fo/retrieve-all-notifications', notificationViews.FORetrieveAllNotification.as_view()),
    url(r'^fo/retrieve-notifications', notificationViews.FORetrieveNotifications.as_view()),
    url(r'^fo/update-notifications', notificationViews.FOUpdateNotification.as_view()),
    url(r'^fo/update-urgency', onboardViews.UpdateUrgency.as_view()),
    url(r'^fo/retrieve-urgency', onboardViews.RetrieveUrgency.as_view()),
    url(r'^fo/filtersort-onboard', onboardViews.FilterSortOnboard.as_view()),
    url(r'^fo/filterby-onboard', onboardViews.FilterByOnboard.as_view()),

    # Compliance endpoints
    url(r'^compliance/create-checklist', checklistViews.CreateCL.as_view()),
    url(r'^compliance/manage-checklist', checklistViews.ManageCL.as_view()),
    url(r'^compliance/update-checklist', checklistViews.UpdateCL.as_view()),
    url(r'^compliance/retrieve-checklistNames', checklistViews.ComplianceRetrieveCLNames.as_view()),
    url(r'^compliance/retrieve-loggedLists', checklistViews.ComplianceRetrieveLoggedLists.as_view()),
    url(r'^compliance/retrieve-clIDWithVersion', checklistViews.ComplianceRetrieveNamesAndVersions.as_view()),
    url(r'^compliance/retrieve-AgmtCodes', agmtCodeViews.RetrieveAgmtCodes.as_view()),

    # Knowledge base endpoints
    # -- CM --
    url(r'^faq/add-AQ', knowledgeBaseViews.AddAnsweredQuestion.as_view()),
    url(r'^faq/add-CMQ', knowledgeBaseViews.CMAddAnsweredQuestion.as_view()),
    url(r'^faq/delete-AQ', knowledgeBaseViews.DeleteAnsweredQuestion.as_view()),
    url(r'^faq/edit-AQ', knowledgeBaseViews.EditAnsweredQuestion.as_view()),
    url(r'^faq/delete-UQ', knowledgeBaseViews.DeleteUnansweredQuestion.as_view()),
    url(r'^faq/retrieve-cmUserQNA', knowledgeBaseViews.CMUserRetrieveAnswers.as_view()),
    url(r'^faq/retrieve-refQNA', knowledgeBaseViews.RetrieveRefQNA.as_view()),
    url(r'^faq/retrieve-UQ', knowledgeBaseViews.RetrieveUnansweredQuestion.as_view()),
    url(r'^faq/retrieve-file', knowledgeBaseViews.RetrieveFile.as_view()),
    
    # -- FO --
    url(r'^faq/add-UQ', knowledgeBaseViews.AddUnansweredQuestion.as_view()),
    url(r'^faq/retrieve-userQNA', knowledgeBaseViews.UserRetrieveAnswers.as_view()),
    url(r'^faq/increment-QNAViews', knowledgeBaseViews.incrementQNAViews.as_view()),
    
    # -- BOTH --
    url(r'^faq/retrieve-allAQBy', knowledgeBaseViews.RetrieveAllQNABy.as_view()), 
    url(r'^faq/retrieve-allAQ', knowledgeBaseViews.RetrieveAllQNA.as_view()),
    url(r'^faq/retrieve-AQ', knowledgeBaseViews.RetrieveQNA.as_view()),
    url(r'^faq/retrieve', knowledgeBaseViews.RetrieveAnswers.as_view()),
    
    # Model endpoints
    url(r'^train/train-model', trainModelViews.TrainKMSModel.as_view()),
    url(r'^train/update-synonyms', trainModelViews.UpdateSynonyms.as_view()),
    url(r'^train/retrieve-entities', trainModelViews.RetrieveEntities.as_view()),
    url(r'^train/retrieve-byIntent', trainModelViews.RetrieveByIntent.as_view()),
    url(r'^train/retrieve-intents', trainModelViews.RetrieveIntents.as_view()),
    url(r'^train/retrieve-clean', trainModelViews.RetrieveAllCleanQNA.as_view()),
    url(r'^train/retrieve-unclean', trainModelViews.RetrieveAllUncleanQNA.as_view()),
    url(r'^train/retrieve-synonyms', trainModelViews.RetrieveSynonyms.as_view()),
    url(r'^train/store-cleaned', trainModelViews.StoreCleanedQNA.as_view()),

    # others
    url(r'^invalidateUser', tokenViews.InvalidateUser.as_view()),
    url(r'^retrieve-user-details', userViews.RetrieveDetails.as_view()),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
    # root view of our REST api, generated by Django REST Framework's router
    #url(r'^api/', include(router.urls, namespace='api')),
]
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)