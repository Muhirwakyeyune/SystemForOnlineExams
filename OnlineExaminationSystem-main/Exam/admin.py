from django.contrib import admin
# from django.contrib.auth.models import group
from .models import Exam


admin.site.site_header="OnlineExam Form"

# Register your models here.
admin.site.sitename='Online examination'

admin.site.register(Exam)