from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class SpecialiteMedicale(models.Model):
    nom = models.CharField(max_length=100, unique=True)
    description = models.TextField()

    class Meta:
        verbose_name = "Spécialité médicale"
        verbose_name_plural = "Spécialités médicales"

    def __str__(self):
        return self.nom


class SpecialiteLaboratoire(models.Model):
    nom = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    
    class Meta:
        verbose_name = "Spécialité technique médicale"
        verbose_name_plural = "Spécialités techniques médicales"

    def __str__(self):
        return self.nom

class CustomUser(AbstractUser):
        
        AGENTS_SANTE = [
                ('admin', 'Admin'),
                ('docteur', 'Docteur'),
                ('infirmier', 'Infirmier'),
                ('laborantin', 'Laborantin'), 
        ]
        
        CIVILITE = [
                ('M', 'Monsieur'),
                ('Mme', 'Madame'),
        ]
        username = models.CharField(max_length=100)
        email = models.EmailField(unique=True)
        agents_sante = models.CharField(max_length=20, choices=AGENTS_SANTE, blank=True)
        civilite = models.CharField(max_length=20, choices=CIVILITE, blank=True)
        phone_number = models.CharField(max_length=10, blank=True)
        specialitemedi = models.ForeignKey(SpecialiteMedicale, on_delete=models.CASCADE, blank=True, null=True)
        specialitelabo = models.ForeignKey(SpecialiteLaboratoire, on_delete=models.CASCADE, blank=True, null=True)
        medical_license = models.FileField( upload_to='medical_licenses/', blank=True , null=True)
        numero_licence_medicale = models.CharField(max_length=50, blank= True)
        photo_profil = models.ImageField(upload_to='photos_profils/', blank=True, null=True)
        date_naissance = models.DateField(blank=True, null=True)
        is_approved = models.BooleanField(default=False)
        is_rejected = models.BooleanField(default=False)
        rejection_date = models.DateTimeField(null=True, blank=True)
        rejection_reason = models.TextField(blank=True)
        temporary_password = models.CharField(max_length=100, blank=True, null=True)
        
        USERNAME_FIELD = 'email'
        REQUIRED_FIELDS = ['username']