# Generated by Django 5.1.7 on 2025-04-09 13:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('patient', '0005_consultation_rendez_vous_analyseafaire_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='dossiermedical',
            name='resume_medical',
        ),
        migrations.AddField(
            model_name='dossiermedical',
            name='antecedents',
            field=models.JSONField(default=list),
        ),
        migrations.AddField(
            model_name='dossiermedical',
            name='traitements',
            field=models.JSONField(default=list),
        ),
    ]
