from django.db import models
from django.contrib.auth import get_user_model
from patient.models import CustomPatient  

Docteur = get_user_model()

class Workflow(models.Model):
    nom = models.CharField(max_length=100)  
    description = models.TextField(blank=True)
    docteur = models.ForeignKey(Docteur, on_delete=models.SET_NULL, null=True, related_name="workflows")
    stade_mrc = models.CharField(max_length=20, choices=CustomPatient.STATE_MRC, blank=True)
    date_creation = models.DateTimeField(auto_now_add=True)
    laborantin = models.ForeignKey(Docteur, on_delete=models.SET_NULL, null=True, blank=True, related_name="workflows_laborantin")
    
    def __str__(self):
        return f"{self.nom} ({self.stade_mrc})"

class TacheWorkflow(models.Model):
    TYPE_TACHE = [
        ('ANALYSE', 'Saisie de résultats'),
        ('RAPPEL', 'Rappel patient'),
        ('ALERTE', 'Détection anomalie'),
    ]
    
    INTERVALLE_CHOICES = [
        (None, 'Aucun'),          
        ('hourly', 'Horaire'),   
        ('daily', 'Quotidien'),   
        ('weekly', 'Hebdomadaire'),  
        ('monthly', 'Mensuel'), 
    ]
    
    workflow = models.ForeignKey(Workflow, on_delete=models.CASCADE, related_name="taches")
    type_tache = models.CharField(max_length=20, choices=TYPE_TACHE)
    description = models.CharField(max_length=200)  
    intervalle = models.CharField(
        max_length=20,
        choices=INTERVALLE_CHOICES,
        null=True,
        blank=True,
        default=None,
        help_text="Intervalle de récurrence pour les tâches répétitives"
    )
    seuil_critique = models.JSONField(null=True, blank=True)  
    message_alerte = models.TextField(blank=True)  
    
    def __str__(self):
        return f"{self.type_tache} - {self.description}"

class PatientWorkflow(models.Model):
    patient = models.ForeignKey(CustomPatient, on_delete=models.CASCADE, related_name="workflows")
    workflow = models.ForeignKey(Workflow, on_delete=models.CASCADE, related_name="patients")
    date_assignation = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('patient', 'workflow')
    
    def __str__(self):
        return f"{self.patient.numerodossier} - {self.workflow.nom}"