# -*- coding: utf-8 -*-
# Generated by Django 1.11.12 on 2018-05-11 11:34
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('actividades', '0003_auto_20180506_1856'),
    ]

    operations = [
        migrations.RenameField(
            model_name='evento',
            old_name='fecha_hora',
            new_name='fecha_hora_inicio',
        ),
        migrations.RemoveField(
            model_name='evento',
            name='duracion',
        ),
        migrations.AddField(
            model_name='evento',
            name='fecha_hora_fin',
            field=models.DateTimeField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
