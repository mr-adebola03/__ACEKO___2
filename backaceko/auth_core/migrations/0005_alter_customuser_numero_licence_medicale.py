# Generated by Django 5.1.7 on 2025-03-30 12:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth_core', '0004_alter_customuser_numero_licence_medicale'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='numero_licence_medicale',
            field=models.CharField(blank=True, max_length=50),
        ),
    ]
