from django.db import models
from django.contrib.auth import get_user_model
from datetime import timedelta
from django.utils import timezone

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
        
class RendezVous(models.Model):
        STATUT = [
                ('PLANIFIE', 'Planifié'),
                ('CONFIRME', 'Confirmé'),
                ('ANNULE', 'Annulé'),
                ('TERMINE', 'Terminé'),
        ]
        dossier = models.ForeignKey('DossierMedical', on_delete=models.CASCADE, related_name="rendez_vous")
        docteur = models.ForeignKey(Docteur, on_delete=models.SET_NULL, null=True, related_name="rendez_vous")
        date_rdv = models.DateTimeField()
        statut = models.CharField(max_length=20, choices=STATUT, default='PLANIFIE')
        rapport = models.TextField(blank=True)
        
        def save(self, *args, **kwargs):
                old_statut = self.statut if self.pk else None
                super().save(*args, **kwargs)
                if self.statut == 'PLANIFIE' and old_statut != 'PLANIFIE':
                        self.programmer_rappel()
                elif self.statut == 'TERMINE' and old_statut != 'TERMINE':
                        from .tasks import creer_consultation_apres_rdv
                        creer_consultation_apres_rdv(self.id)
        
        def programmer_rappel(self):
                from .tasks import envoyer_rappel_rdv
                scheduled_time = self.date_rdv - timedelta(days=1)
                if scheduled_time > timezone.now():
                        envoyer_rappel_rdv(self.id, schedule=scheduled_time)
        
        def __str__(self):
                return f"RDV {self.dossier.patient.numerodossier} - {self.date_rdv}"
        
class Consultation(models.Model):
        dossier = models.ForeignKey('DossierMedical', on_delete=models.CASCADE, related_name="consultations")
        rendez_vous = models.ForeignKey('RendezVous', on_delete=models.SET_NULL, null=True, blank=True, related_name="consultations")
        docteur = models.ForeignKey(Docteur, on_delete=models.SET_NULL, null=True, related_name="consultations")
        date_consultation = models.DateTimeField()
        motif = models.CharField(max_length=200)
        observations = models.TextField(blank=True)
        rapport_genere = models.BooleanField(default=False)
        
        def save(self, *args, **kwargs):
                super().save(*args, **kwargs)
                # Exemple : Si "analyse" est mentionnée dans les observations, créer une AnalyseAFaire
                if "analyse" in self.observations.lower() and not self.analyses_a_faire.exists():
                        AnalyseAFaire.objects.create(
                                dossier=self.dossier,
                                consultation=self,
                                nom_analyse="Analyse prescrite",
                                description="Prescrite lors de la consultation",
                                date_prevue=timezone.now().date() + timedelta(days=7),
                                responsable=self.docteur,
                 )

        def __str__(self):
                return f"Consultation {self.dossier.patient.numerodossier} - {self.date_consultation}"
        
class AnalyseAFaire(models.Model):
        STATUT = [
                ('A_FAIRE', 'À faire'),
                ('EN_COURS', 'En cours'),
                ('TERMINE', 'Terminé'),
        ]
        dossier = models.ForeignKey('DossierMedical', on_delete=models.CASCADE, related_name="analyses_a_faire")
        consultation = models.ForeignKey('Consultation', on_delete=models.CASCADE, null=True, blank=True, related_name="analyses_a_faire")
        nom_analyse = models.CharField(max_length=100)
        description = models.TextField(blank=True)
        statut = models.CharField(max_length=20, choices=STATUT, default='A_FAIRE')
        date_creation = models.DateTimeField(auto_now_add=True)
        date_prevue = models.DateField(null=True, blank=True)
        laboratin = models.ForeignKey(Docteur, on_delete=models.SET_NULL, null=True, blank=True)
        
        def __str__(self):
                return f"{self.nom_analyse} - {self.dossier.patient.numerodossier} ({self.statut})"
        
class ResultatAnalyse(models.Model):
        patient = models.ForeignKey(CustomPatient, on_delete=models.CASCADE, related_name="resultats")
        analyse = models.ForeignKey(AnalyseAFaire, on_delete=models.CASCADE, related_name="resultats")
        laborantin = models.ForeignKey(Docteur, on_delete=models.SET_NULL, null=True, related_name="analyses_saisies")
        date_saisie = models.DateTimeField(auto_now_add=True)
        creatinine = models.FloatField(null=True, blank=True)  #  mg/dL
        potassium = models.FloatField(null=True, blank=True)  #  mmol/L
        dgf = models.FloatField(null=True, blank=True)  # Débit de filtration glomérulaire, calculé
        poids = models.FloatField(null=True, blank=True)  #  kg
        tension_systolique = models.IntegerField(null=True, blank=True)  #  mmHg
        tension_diastolique = models.IntegerField(null=True, blank=True)  #  mmHg
        
        def calculer_dgf(self):
                if self.creatinine and self.patient.date_naissance:
                        age = (timezone.now().date() - self.patient.date_naissance).days // 365
                        dgf = 141 * min(self.creatinine / 0.9, 1) ** -1.209 * 0.993 ** age
                        return round(dgf, 2)
                        return None
        
        def save(self, *args, **kwargs):
                self.dgf = self.calculer_dgf()
                super().save(*args, **kwargs)
        
        def __str__(self):
                return f"Résultat {self.patient.numerodossier} - {self.date_saisie}"
        
class Alerte(models.Model):
        TYPE_ALERTE = [
                ('CRITIQUE', 'Critique'),
                ('MODEREE', 'Modérée'),
        ]
        resultat = models.ForeignKey(ResultatAnalyse, on_delete=models.CASCADE, related_name="alertes")
        type_alerte = models.CharField(max_length=20, choices=TYPE_ALERTE)
        message = models.TextField()
        date_creation = models.DateTimeField(auto_now_add=True)
        envoyee = models.BooleanField(default=False)
        
        def __str__(self):
                return f"Alerte {self.type_alerte} - {self.resultat.patient.numerodossier}"