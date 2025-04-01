import os
import django
from django.contrib.auth.hashers import make_password

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'src.settings')
django.setup()

from auth_core.models import CustomUser

def create_admin():
    admin_data = {
        'email': 'admin@medical.com',
        'username': 'admin',
        'password': make_password('AdminPass123'), 
        'agents_sante': 'admin',
        'civilite': 'M',
        'phone_number': '0612345678',
        'date_naissance': '1990-01-01',
        'is_approved': True,
        'is_staff': True,
        'is_superuser': True
    }

    admin, created = CustomUser.objects.update_or_create(
        email=admin_data['email'],
        defaults=admin_data
    )

    if created:
        print("✅ Admin créé avec succès !")
    else:
        print("🔹 Admin existant mis à jour.")

if __name__ == '__main__':
    create_admin()