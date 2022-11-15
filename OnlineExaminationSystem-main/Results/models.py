from django.db import models
from Exam.models import Exam
from django.contrib.auth.models import User

# Create your models here.

class Result(models.Model):
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.FloatField()
  


    def __str__(self):
        return str(self.pk)

   
   
        