# Generated by Django 3.2.4 on 2021-09-09 17:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Results', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='result',
            old_name='user',
            new_name='User',
        ),
    ]