from django.urls import path
from  rest_framework.authtoken.views import obtain_auth_token
from .views import *

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('logout/', LogoutView.as_view(), name='api_logout'),
    path('login/', obtain_auth_token, name='login'),
    path('user/', UserDataAPIView.as_view(), name='user'),

    # ml models
    path('assessment/', AssessmentView.as_view(), name='assessment'),
    # path('nextskill/', NextSkillView.as_view(), name='Next_skill'),

    # APIs
    path('jobs/', FindJobsView.as_view(), name='find_jobs'),
    path('learn/<str:q>/', FindPlaylist.as_view(), name='find_learning_resources'),
]
