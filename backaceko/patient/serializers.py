from rest_framework import serializers
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
                
        def get_docteur_info(self, obj):
                return {
                        'id': obj.docteur.id,
                        'email': obj.docteur.email,
                        'full_name': obj.docteur.get_full_name()
                }