from django.contrib import admin
from django.urls import path, include
from .views import (ExamListView, exam_view, exam_data_view, save_exam_view,signup)
from . import views

app_name = 'Exam'

urlpatterns = [
    path('login/', views.login, name='login'),
    path('signup/', views.signup, name='signup'),
    path('accounts/', include('django.contrib.auth.urls')),

   
    path('', ExamListView.as_view(), name='main-view'),
 
    path('<pk>/', exam_view, name='exam-view'),
    path('<pk>/save/', save_exam_view, name='save_exam'),
    path('<pk>/data/', exam_data_view, name='exam-data-view'),
]
