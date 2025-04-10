from .models import TacheWorkflow, PatientWorkflow
from .scheduler import scheduler  
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
from decouple import config

def executer_tache(tache_id):
    tache = TacheWorkflow.objects.get(id=tache_id)
    workflow = tache.workflow
    
    destinataire = None
    message = tache.message_alerte or f"Rappel : {tache.description}"
    
    if tache.type_tache == 'ANALYSE' and workflow.laborantin:
        destinataire = workflow.laborantin  
        canal_email = destinataire.email
        canal_sms = destinataire.phone_number if hasattr(destinataire, 'phone_number') else None
    else:
        patient_workflow = PatientWorkflow.objects.filter(workflow=workflow).first()
        if patient_workflow:
            destinataire = patient_workflow.patient
            canal_email = destinataire.email
            canal_sms = destinataire.phone_number if hasattr(destinataire, 'phone_number') else None
    
    if destinataire:
        print(f"Notification système pour {destinataire}: {message}")
        if canal_email:
            envoyer_email(canal_email, "Rappel Workflow", message)
        if canal_sms:
            envoyer_sms(canal_sms, message)

def envoyer_email(destinataire, sujet, corps):
    send_mail(
        sujet,
        corps,
        settings.DEFAULT_FROM_EMAIL,
        [destinataire],
        fail_silently=False
    )
    print(f"E-mail envoyé à {destinataire}: {sujet} - {corps}")

def envoyer_sms(numero, message):
    try:
        from twilio.rest import Client
        account_sid = config("ACCOUNT_SID")  
        auth_token = config("AUTH_TOKEN")  
        client = Client(account_sid, auth_token)
        
        client.messages.create(
            body=message,
            from_=config("TWILIO_PHONE_NUMBER"),  
            to=numero
        )
        print(f"SMS envoyé à {numero}: {message}")
    except ImportError:
        print("Twilio non installé. Installez-le avec 'pip install twilio'.")
    except Exception as e:
        print(f"Erreur lors de l'envoi du SMS : {e}")

def planifier_tache(tache):
    if tache.intervalle:  
        interval_map = {
            'hourly': {'hours': 1},
            'daily': {'hours': 24},
            'weekly': {'weeks': 1},
            'monthly': {'weeks': 4},  
        }
        
        interval_config = interval_map.get(tache.intervalle)
        if interval_config:
            scheduler.add_job(
                executer_tache,
                'interval',
                args=[tache.id],
                **interval_config
            )
            print(f"Tâche {tache} planifiée avec intervalle {tache.intervalle}")
    else:
        print(f"Tâche {tache} non récurrente - À planifier manuellement si nécessaire")