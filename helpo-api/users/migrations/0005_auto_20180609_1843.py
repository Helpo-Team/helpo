# -*- coding: utf-8 -*-
# Generated by Django 1.11.13 on 2018-06-09 18:43
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_userverification'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userverification',
            name='verificationToken',
            field=models.CharField(max_length=2000),
        ),
    ]