import os
import random
import django
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ImproperlyConfigured

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'src.settings')
try:
    django.setup()
except ImproperlyConfigured as e:
    print(f"Erreur de configuration Django: {e}")
    exit(1)

from patient.models import CustomPatient, DossierMedical
from auth_core.models import CustomUser

def get_existing_doctors():
    return CustomUser.objects.filter(agents_sante='docteur')

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
        
def create_doctors():
    docteur = [
        {
            'email': 'docteur1@medical.com',
            'username': 'docteur1',
            "first_name": "Simon",
	        "last_name": "TROMPA",
            'password': make_password('DoctorPass123'),
            'agents_sante': 'docteur',
            'civilite': 'M',
            'phone_number': '0612345679',
            'date_naissance': '1980-05-15',
            'is_approved': True,
            'is_staff': False,
            'is_superuser': False
        },
        {
            'email': 'docteur2@medical.com',
            'username': 'docteur2',
            "first_name": "Yasmine",
	        "last_name": "BELLE",
            'password': make_password('DoctorPass123'),
            'agents_sante': 'docteur',
            'civilite': 'Mme',
            'phone_number': '0612345680',
            'date_naissance': '1985-08-20',
            'is_approved': True,
            'is_staff': False,
            'is_superuser': False
        }
    ]
    
    created_doctors = []
    for doctor_data in docteur:
        doctor, created = CustomUser.objects.update_or_create(
            email=doctor_data['email'],
            defaults=doctor_data
        )
        status = "créé" if created else "mis à jour"
        print(f"🔹 Docteur {doctor_data['email']} {status}.")
        created_doctors.append(doctor)
    
    return created_doctors
        
def create_patients(docteur):
    docteur = list(get_existing_doctors())
    if not docteur:
        print("⚠️ Aucun docteur existant trouvé. Créez d'abord des docteurs.")
        return
    patients_data = [
        {
            "first_name": "Kounde",
            "last_name": "LAMA",
            "email": "alama@gmail.com",
            "civilite": "M",
            "date_naissance": "1980-02-15",
            "adresse": "Ste Rita",
            "ville": "Cotonou",
            "contact": "0166656885",
            "contact_urgence": None,
            "stade_mrc": "state2"
        },
        {
            "first_name": "Amina",
            "last_name": "DIOP",
            "email": "amina.diop@yahoo.fr",
            "civilite": "Mme",
            "date_naissance": "1975-08-22",
            "adresse": "Akpakpa",
            "ville": "Cotonou",
            "contact": "97865432",
            "contact_urgence": "95432178",
            "stade_mrc": "state1"
        },
        {
            "first_name": "Jean",
            "last_name": "DOSSOU",
            "email": "jean.dossou@gmail.com",
            "civilite": "M",
            "date_naissance": "1968-11-30",
            "adresse": "Godomey",
            "ville": "Abomey-Calavi",
            "contact": "52143678",
            "contact_urgence": None,
            "stade_mrc": "state3"
        },
        {
            "first_name": "Fatou",
            "last_name": "GNACADJA",
            "email": "f.gnacadja@hotmail.com",
            "civilite": "Mme",
            "date_naissance": "1985-04-18",
            "adresse": "Dantokpa",
            "ville": "Cotonou",
            "contact": "93456781",
            "contact_urgence": "91234567",
            "stade_mrc": "state2"
        },
        {
            "first_name": "Koffi",
            "last_name": "ADJOVI",
            "email": "k.adjovi@outlook.com",
            "civilite": "M",
            "date_naissance": "1972-07-05",
            "adresse": "Avotrou",
            "ville": "Porto-Novo",
            "contact": "98765432",
            "contact_urgence": None,
            "stade_mrc": "state4"
        },
        {
            "first_name": "Grace",
            "last_name": "HOUNGBEDJI",
            "email": "grace.h@gmail.com",
            "civilite": "Mme",
            "date_naissance": "1990-01-25",
            "adresse": "Cadjehoun",
            "ville": "Cotonou",
            "contact": "52143679",
            "contact_urgence": "52143670",
            "stade_mrc": "state1"
        },
        {
            "first_name": "Marc",
            "last_name": "AGBAYA",
            "email": "m.agbaya@yahoo.fr",
            "civilite": "M",
            "date_naissance": "1965-09-12",
            "adresse": "Ganhi",
            "ville": "Cotonou",
            "contact": "93456782",
            "contact_urgence": None,
            "stade_mrc": "state5"
        },
        {
            "first_name": "Esther",
            "last_name": "ZINSOU",
            "email": "e.zinsou@gmail.com",
            "civilite": "Mme",
            "date_naissance": "1988-06-08",
            "adresse": "Fidjrosse",
            "ville": "Cotonou",
            "contact": "52143680",
            "contact_urgence": "52143681",
            "stade_mrc": "state2"
        },
        {
            "first_name": "Paul",
            "last_name": "HOUNKPE",
            "email": "p.hounkpe@outlook.com",
            "civilite": "M",
            "date_naissance": "1978-03-17",
            "adresse": "Agla",
            "ville": "Cotonou",
            "contact": "93456783",
            "contact_urgence": None,
            "stade_mrc": "state3"
        },
        {
            "first_name": "Aïchatou",
            "last_name": "BIAOU",
            "email": "a.biaou@yahoo.fr",
            "civilite": "Mme",
            "date_naissance": "1983-12-24",
            "adresse": "Akassato",
            "ville": "Abomey-Calavi",
            "contact": "52143682",
            "contact_urgence": "52143683",
            "stade_mrc": "state1"
        },
        {
            "first_name": "Gérard",
            "last_name": "SOSSOU",
            "email": "g.sossou@gmail.com",
            "civilite": "M",
            "date_naissance": "1960-05-19",
            "adresse": "Missessin",
            "ville": "Porto-Novo",
            "contact": "93456784",
            "contact_urgence": None,
            "stade_mrc": "state4"
        },
        {
            "first_name": "Chantal",
            "last_name": "DEGBO",
            "email": "c.degbo@hotmail.com",
            "civilite": "Mme",
            "date_naissance": "1970-10-31",
            "adresse": "Vèdoko",
            "ville": "Cotonou",
            "contact": "52143684",
            "contact_urgence": "52143685",
            "stade_mrc": "state3"
        },
        {
            "first_name": "Simon",
            "last_name": "TOHOZIN",
            "email": "s.tohozin@outlook.com",
            "civilite": "M",
            "date_naissance": "1955-07-22",
            "adresse": "Zogbo",
            "ville": "Cotonou",
            "contact": "93456785",
            "contact_urgence": None,
            "stade_mrc": "state5"
        },
        {
            "first_name": "Véronique",
            "last_name": "HOUNKPATIN",
            "email": "v.hounkpatin@yahoo.fr",
            "civilite": "Mme",
            "date_naissance": "1982-04-15",
            "adresse": "Avrankou",
            "ville": "Porto-Novo",
            "contact": "52143686",
            "contact_urgence": "52143687",
            "stade_mrc": "state2"
        },
        {
            "first_name": "Bernard",
            "last_name": "AGBANRIN",
            "email": "b.agbanrin@gmail.com",
            "civilite": "M",
            "date_naissance": "1968-11-08",
            "adresse": "Ekpè",
            "ville": "Porto-Novo",
            "contact": "93456786",
            "contact_urgence": None,
            "stade_mrc": "state4"
        },
        {
            "first_name": "Julienne",
            "last_name": "DOHOU",
            "email": "j.dohou@hotmail.com",
            "civilite": "Mme",
            "date_naissance": "1975-02-28",
            "adresse": "Sèmè-Kpodji",
            "ville": "Porto-Novo",
            "contact": "52143688",
            "contact_urgence": "52143689",
            "stade_mrc": "state1"
        },
        {
            "first_name": "Alain",
            "last_name": "HOUNGNIBO",
            "email": "a.houngnibo@outlook.com",
            "civilite": "M",
            "date_naissance": "1980-09-14",
            "adresse": "Agbangnizoun",
            "ville": "Abomey",
            "contact": "93456787",
            "contact_urgence": None,
            "stade_mrc": "state3"
        },
        {
            "first_name": "Rosine",
            "last_name": "AGUESSY",
            "email": "r.aguessy@yahoo.fr",
            "civilite": "Mme",
            "date_naissance": "1992-06-03",
            "adresse": "Allada",
            "ville": "Allada",
            "contact": "52143690",
            "contact_urgence": "52143691",
            "stade_mrc": "state2"
        },
        {
            "first_name": "Victor",
            "last_name": "TCHIBOZO",
            "email": "v.tchibozo@gmail.com",
            "civilite": "M",
            "date_naissance": "1958-12-20",
            "adresse": "Ouidah",
            "ville": "Ouidah",
            "contact": "93456788",
            "contact_urgence": None,
            "stade_mrc": "state5"
        },
        {
            "first_name": "Claire",
            "last_name": "ADJAKA",
            "email": "c.adjaka@hotmail.com",
            "civilite": "Mme",
            "date_naissance": "1987-07-11",
            "adresse": "Bohicon",
            "ville": "Bohicon",
            "contact": "52143692",
            "contact_urgence": "52143693",
            "stade_mrc": "state1"
        }
    ]
    
    created_count = 0
    for patient_data in patients_data:
        random_doctor = random.choice(docteur)
        
        patient, created = CustomPatient.objects.update_or_create(
            email=patient_data['email'],
            defaults={
                **patient_data,
                'docteur': random_doctor
            }
        )
        
        if created:
            created_count += 1
            DossierMedical.objects.create(
                patient=patient,
                antecedents=[],
                traitements=[]
            )
            print(f"✅ Patient {patient.first_name} {patient.last_name} créé et assigné au Dr. {random_doctor.email}")
    
    print(f"\n🎉 {created_count} patients créés avec leurs dossiers médicaux, assignés aléatoirement aux docteurs existants.")

if __name__ == '__main__':
    create_admin()
    docteur = create_doctors()
    create_patients(docteur)
    print("\nSeeding terminé avec succès !")