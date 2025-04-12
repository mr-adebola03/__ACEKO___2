from rest_framework import serializers

from auth_core.models import CustomUser
from .models import *

class CustomPatientSerializer(serializers.ModelSerializer):
        class Meta:
                model = CustomPatient
                fields = [
                        'id',
                        'first_name', 
                        'last_name', 
                        'email', 
                        'civilite', 'date_naissance', 
                        'adresse', 'ville', 
                        'phone_number', 'contact_urgence',
                        'stade_mrc',
                        'numerodossier',
                        'date_creation',
                ]
                read_only_fields = ('id', 'numerodossier')

        def create(self, validated_data):
                patient = CustomPatient.objects.create(**validated_data)

                DossierMedical.objects.create(
                        patient=patient,
                        antecedents=[],
                        traitements=[]
                )

                return patient
                
        def get_docteur_info(self, obj):
                return {
                        'id': obj.docteur.id,
                        'email': obj.docteur.email,
                        'full_name': obj.docteur.get_full_name()
                }

class DossierMedicalSerializer(serializers.ModelSerializer):
    class Meta:
        model = DossierMedical
        fields = ['id', 'patient', 'date_creation', 'date_mise_a_jour', 'antecedents', 'traitements']
        read_only_fields = ['id', 'patient', 'date_creation', 'date_mise_a_jour']

    def validate_antecedents(self, value):
        if not isinstance(value, list):
            raise serializers.ValidationError("Les antécédents doivent être une liste")
        return value

    def validate_traitements(self, value):
        if not isinstance(value, list):
            raise serializers.ValidationError("Les traitements doivent être une liste")
        return value


class RendezVousSerializer(serializers.ModelSerializer):
    docteur_nom_complet = serializers.SerializerMethodField()
    patient_nom_complet = serializers.SerializerMethodField()

    class Meta:
        model = RendezVous
        fields = [
            'id',
            'dossier',
            'docteur',
            'docteur_nom_complet',
            'patient_nom_complet',
            'date_rdv',
            'statut',
            'rapport',
        ]
        read_only_fields = ['created_at', 'updated_at']

    def get_docteur_nom_complet(self, obj):
        if obj.docteur:
            return f"{obj.docteur.last_name} {obj.docteur.first_name}"
        return None
    def get_patient_nom_complet(self, obj):
        return f"{obj.dossier.patient.first_name} {obj.dossier.patient.last_name}"


class ConsultationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        fields = ['id', 'dossier', 'rendez_vous', 'date_consultation', 'motif', 'observations', 'rapport_genere']
        read_only_fields = ['docteur']

    def create(self, validated_data):
        request = self.context.get('request')
        user = request.user
        if not user.agent_sante:
            raise serializers.ValidationError("Seuls les agents de santé peuvent créer des consultations.")
        validated_data['docteur'] = user
        return super().create(validated_data)