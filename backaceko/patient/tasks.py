from datetime import timedelta, timezone
from background_task import background
from patient.models import AnalyseAFaire, RendezVous, Consultation  
from django.core.mail import send_mail

@background(schedule=timedelta(days=1))  
def envoyer_rappel_rdv(rdv_id):
    rdv = RendezVous.objects.get(id=rdv_id)
    if rdv.statut == 'PLANIFIE':
        send_mail(
            "Rappel de votre rendez-vous",
            f"Bonjour {rdv.dossier.patient.first_name},\n\nVotre RDV est prévu le {rdv.date_rdv}. Merci de confirmer.",
            "noreply@hopital.com",
            [rdv.dossier.patient.email],
            fail_silently=False,
        )
        rdv.statut = 'CONFIRME'
        rdv.save()
        
@background(schedule=60)
def creer_consultation_apres_rdv(rdv_id):
    rdv = RendezVous.objects.get(id=rdv_id)
    if rdv.statut == 'TERMINE' and not rdv.consultations.exists():
        Consultation.objects.create(
            dossier=rdv.dossier,
            rendez_vous=rdv,
            docteur=rdv.docteur,
            date_consultation=rdv.date_rdv,
            motif="Consultation suite à RDV",
            observations="Aucune observation pour l’instant",
        )
        
@background(schedule=86400)
def notifier_analyses_a_faire():
    aujourd_hui = timezone.now().date()
    analyses = AnalyseAFaire.objects.filter(statut='A_FAIRE', date_prevue__lte=aujourd_hui + timezone.timedelta(days=1))
    for analyse in analyses:
        send_mail(
            f"Rappel : Analyse {analyse.nom_analyse}",
            f"Bonjour {analyse.dossier.patient.first_name},\n\nL’analyse {analyse.nom_analyse} est prévue pour le {analyse.date_prevue}.",
            "noreply@hopital.com",
            [analyse.dossier.patient.email],
            fail_silently=False,
        )