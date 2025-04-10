from django.core.management.base import BaseCommand
from workflows.models import TacheWorkflow
from workflows.utils import planifier_tache

class Command(BaseCommand):
    help = 'Planifie toutes les tâches existantes dans le scheduler'

    def handle(self, *args, **kwargs):
        self.stdout.write("Planification des tâches existantes...")
        for tache in TacheWorkflow.objects.all():
            planifier_tache(tache)
        self.stdout.write(self.style.SUCCESS("Tâches planifiées avec succès !"))