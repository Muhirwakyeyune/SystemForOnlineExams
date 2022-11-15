from django.db import models
import random
# Create your models here.

class Exam(models.Model):
    name = models.CharField(max_length=200)
    topic = models.CharField(max_length=200)
    number_of_questions = models.IntegerField(help_text="number of questions")
    time = models.IntegerField(help_text="duration of exam in munites")
    required_score_to_pass = models.IntegerField(help_text="required score in % ")

    def __str__(self):
        return f"{self.name}-{self.topic}"

    def get_questions(self):
        questions = list (self.question_set.all())
        random.shuffle(questions)
        return questions[:self.number_of_questions]   

    class meta: 
        verbose_name_prular = 'Exams'    

