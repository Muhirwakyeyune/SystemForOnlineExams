from django.db import models

# Create your models here.
class Student(models.Model):
    fname = models.CharField(max_length=200)
    lname = models.CharField(max_length=200)
    regno = models.CharField(max_length=200)
    marks= models.IntegerField(help_text="number of questions")
    time = models.IntegerField(help_text="duration of exam in munites")
    required_score_to_pass = models.IntegerField(help_text="required score in % ")
   