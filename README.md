# 🎵 ACEKO

## 📖 Description
Développement d’une plateforme web pour la gestion des données patient de la 
maladie rénale chronique. 

## 🚀 Fonctionnalités
- ✅ Fonctionnalité 1
- ✅ Fonctionnalité 2
- ✅ Fonctionnalité 3

---

## 🏗️ Technologies utilisées
### 🌐 Frontend (React)
- React.js
- Tailwind CSS 
- Axios (pour les requêtes API)

### 🖥️ Backend (Django)
- Django / Django REST Framework (DRF)
- PostgreSQL 
- Djoser (pour l’authentification avec JWT)

---

## 📦 Installation

###  Prérequis
Avant de commencer, assurez-vous d’avoir installé :
- **Python 3.9+** : [Télécharger Python](https://www.python.org/downloads/)
- **Node.js 16+** : [Télécharger Node.js](https://nodejs.org/)
- **PostgreSQL** (si utilisé) : [Télécharger PostgreSQL](https://www.postgresql.org/download/)

---

## 🏗 Installation du Backend (Django)

### 1️⃣ Cloner le projet
```bash
git clone https://github.com/mr-adebola03/__ACEKO___2.git
cd __ACEKO___2/backaceko

2️⃣ Créer un environnement virtuel
python -m venv venv
source venv/bin/activate  # Sur Mac/Linux
venv\Scripts\activate  # Sur Windows

3️⃣ Installer les dépendances
pip install -r requirements.txt

4️⃣ Configurer les variables d’environnement
Créer un fichier .env dans le dossier backend et ajouter :

5️⃣ Appliquer les migrations et démarrer le serveur
python manage.py migrate
py manage.py load_laboratoire    
python manage.py load_specialites
python manage.py createsuperuser  
python seed.py
python manage.py runserver

###L’API est maintenant disponible sur http://127.0.0.1:8000/.

