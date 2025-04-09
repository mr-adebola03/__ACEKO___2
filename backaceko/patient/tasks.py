from datetime import timedelta
from background_task import background
from patient.models import RendezVous  
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