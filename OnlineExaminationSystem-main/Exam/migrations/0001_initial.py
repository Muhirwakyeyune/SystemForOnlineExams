# Generated by Django 3.2.4 on 2021-06-22 20:10

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Exam',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('topic', models.CharField(max_length=200)),
                ('number_of_questions', models.IntegerField()),
                ('time', models.IntegerField(help_text='duration of exam in munites')),
                ('required_score_to_pass', models.IntegerField(help_text='required score in % ')),
            ],
        ),
    ]
