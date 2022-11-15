from django.shortcuts import render, redirect
from .models import Exam
from django.views.generic import ListView
from django.http import JsonResponse
from Question.models import Question, Answer
from Results.models import Result
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
from .models import *
from .forms import CreateUserForm
from django.contrib.auth.decorators import login_required


def signup(request):
    form =CreateUserForm
    if request.method=='POST':
        form = CreateUserForm(request.POST)
        if form.is_valid():
          form.save()
          return redirect('login')
        else:
              form= CreateUserForm()
        return render(request, 'registration/signup.html', {'form':form})      


    context ={'form':form}
    return render(request, 'registration/signup.html', context)

def login(request): 
    context ={}
    return render(request, 'registration/login.html', context)


# @login_required




class ExamListView(ListView):
    model = Exam
    template_name = 'Exam/main.html'

def exam_view(request, pk):
    exam = Exam.objects.get(pk=pk)
    return render(request, 'Exam/exam.html', {'obj': exam})   


def exam_data_view(request, pk):
     exam = Exam.objects.get(pk=pk)
     questions = []
     for q in exam.get_questions():
         answers = []
         for a in q.get_answers():
             answers.append(a.text)
         questions.append({str(q): answers})
     return JsonResponse({
         'data':questions,
         'time': exam.time,
     })    


def save_exam_view(request, pk):
    # print(request.POST) 
    if request.is_ajax():
        questions = []
        data = request.POST
        data_ = dict(data.lists())
        # print(type(data))
        # print(type(data_))
        # print(data_)
        data_.pop('csrfmiddlewaretoken')
        # print(data_)

        for k in data_.keys():
            print('key: ', k)
            question = Question.objects.get(text=k)
            questions.append(question)
        print(questions)

        

        user = request.user

        exam = Exam.objects.get(pk=pk)

        score = 0
        multiplier = 100/exam.number_of_questions
        results = []
        correct_answer = None

        for q in questions:
            a_selected = request.POST.get(q.text)
            # print('selected', a_selected)

            if a_selected !="":
                question_answers = Answer.objects.filter(question=q)
                for a in question_answers:
                    if a_selected == a.text:
                        if a.correct:
                            score += 1
                            correct_answer = a.text
                    else:
                        if a.correct:
                            correct_answer = a.text

                results.append({str(q): {'correct_answer':correct_answer, 'answered':a_selected}})   
            else:
                results.append({str(q): 'not_answered'})
           
        score_ = score * multiplier   
        Result.objects.create(exam=exam, user=user, score=score_)
        
        if score_ >= exam.required_score_to_pass:
            return JsonResponse({'passed': True, 'score': score_, 'results': results})
        else:
            return JsonResponse({'passed': False, 'score': score_, 'results': results})