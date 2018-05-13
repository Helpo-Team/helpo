# -*- coding: utf-8 -*-
# Generated by Django 1.11.12 on 2018-05-06 21:56
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('actividades', '0002_auto_20180502_2136'),
    ]

    operations = [
        migrations.CreateModel(
            name='RubroEvento',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
            ],
        ),
        migrations.RemoveField(
            model_name='organizacion',
            name='tipo',
        ),
        migrations.RenameField(
            model_name='evento',
            old_name='fecha',
            new_name='fecha_hora',
        ),
        migrations.RemoveField(
            model_name='evento',
            name='organizacion',
        ),
        migrations.AddField(
            model_name='evento',
            name='descripcion',
            field=models.CharField(max_length=1000, null=True),
        ),
        migrations.AddField(
            model_name='evento',
            name='duracion',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='ubicacion',
            name='latitud',
            field=models.FloatField(default=0),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='ubicacion',
            name='longitud',
            field=models.FloatField(default=0),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='Organizacion',
        ),
        migrations.DeleteModel(
            name='TipoDeOrganizacion',
        ),
        migrations.AddField(
            model_name='evento',
            name='rubro',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='actividades.RubroEvento'),
        ),
    ]