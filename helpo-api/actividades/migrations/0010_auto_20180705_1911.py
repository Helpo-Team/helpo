# -*- coding: utf-8 -*-
# Generated by Django 1.11.13 on 2018-07-05 19:11
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('actividades', '0009_merge_20180529_1230'),
    ]

    operations = [
        migrations.AddField(
            model_name='evento',
            name='organizacion',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='contacto',
            name='email',
            field=models.EmailField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='contacto',
            name='evento',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='contacto', to='actividades.Evento'),
        ),
        migrations.AlterField(
            model_name='contacto',
            name='telefono',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='ubicacion',
            name='notas',
            field=models.CharField(max_length=140, null=True),
        ),
    ]