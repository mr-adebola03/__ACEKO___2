from django.db import models
from django.contrib.auth import get_user_model
from datetime import timedelta

Docteur = get_user_model()
# Create your models here.
class CustomPatient(models.Model):
        CIVILITE = [
                ('M', 'Monsieur'),
                ('Mme', 'Madame'),
        ]
        
        STATE_MRC = [
                ('state1','State1'),
                ('state2','State2'),
                ('state3','State3'),
                ('state4','State4'),
                ('state5','State5'),
        ]
        
        numerodossier = models.CharField(max_length=8, unique=True , blank=True)
        first_name = models.CharField(max_length=100)
        last_name = models.CharField(max_length=100)
        email = models.EmailField(unique=True)
        civilite = models.CharField(max_length=20, choices=CIVILITE, blank=True)
        date_naissance = models.DateField(blank=True, null=True)
        adresse = models.CharField(max_length=200, blank=True, null=True)
        ville = models.CharField(max_length=100, blank=True, null=True)
        contact = models.CharField(max_length=10)
        contact_urgence = models.CharField(max_length=10, blank=True, null=True)
        stade_mrc = models.CharField(max_length=20, choices=STATE_MRC, blank=True)
        docteur = models.ForeignKey(Docteur, on_delete=models.SET_NULL, null=True, blank=True)
        date_creation = models.DateTimeField(auto_now_add=True)
        
        class Meta:
                verbose_name = "Patient"
                ordering = ['-date_creation']
                
        def __str__(self):
                return f"{self.first_name} {self.last_name}"      
        
        def save(self, *args, **kwargs):
                if not self.numerodossier:
                        dernier_id = CustomPatient.objects.count() + 1
                        self.numerodossier = f"AB{dernier_id:06d}"  
                super().save(*args, **kwargs)

        def __str__(self):
                return self.numerodossier 
        
class DossierMedical(models.Model):
        patient = models.ForeignKey(CustomPatient, on_delete=models.CASCADE)
        date_creation = models.DateTimeField(auto_now_add=True)
        date_mise_a_jour = models.DateTimeField(auto_now=True)
        resume_medical = models.TextField(blank=True)
        
        class Meta:
                verbose_name = "Dossier Medical"
                ordering = ['-date_creation']
                
        def __str__(self):
                return f"Dossier Medical de {self.patient.numerodossier}"
        
class Consultation(models.Model):
        dossier = models.ForeignKey(DossierMedical, on_delete=models.CASCADE, related_name="consultations")
        docteur = models.ForeignKey(Docteur, on_delete=models.SET_NULL, null=True, related_name="consultations")
        date_consultation = models.DateTimeField()
        motif = models.CharField(max_length=200)
        observations = models.TextField(blank=True)
        rapport_genere = models.BooleanField(default=False)
        
        def __str__(self):
                return f"Consultation {self.dossier.patient.numerodossier} - {self.date_consultation}"
        