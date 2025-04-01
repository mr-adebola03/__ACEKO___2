import json
import os
from django.conf import settings
from django.core.management.base import BaseCommand
from auth_core.models import SpecialiteLaboratoire  

class Command(BaseCommand):
    help = 'Charge les spécialités médicales depuis un fichier JSON'

    def handle(self, *args, **options):
        json_path = os.path.join(settings.BASE_DIR, 'auth_core', 'data', 'specialitelabo.json')
        
        try:
            with open(json_path, 'r', encoding='utf-8') as file:
                data = json.load(file)
                specialites = data.get('specialites_laboratoire', [])
                
                created_count = 0
                for spec in specialites:
                    obj, created = SpecialiteLaboratoire.objects.update_or_create(
                        nom=spec['nom'],
                        defaults={'description': spec['description']}
                    )
                    if created:
                        created_count += 1
                
                self.stdout.write(self.style.SUCCESS(
                    f'Import réussi : {created_count} nouvelles spécialités créées, '
                    f'{len(specialites) - created_count} existaient déjà.'
                ))
                
        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(
                f"Fichier non trouvé à l'emplacement : {json_path}\n"
                "Veuillez vérifier le chemin et que le fichier existe."
            ))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Erreur lors de l'import : {str(e)}"))