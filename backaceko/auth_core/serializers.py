from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
import random
import string

from auth_core.models import SpecialiteMedicale, SpecialiteLaboratoire

User = get_user_model()

class SpecialiteMedicaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpecialiteMedicale
        fields = ['id', 'nom']

class SpecialiteLaboratoireSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpecialiteLaboratoire
        fields = ['id', 'nom']

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email', 'username','first_name','last_name', 'agents_sante', 'civilite', 'phone_number', 
                 'specialitemedi', 'specialitelabo', 'medical_license', 
                 'numero_licence_medicale', 'photo_profil', 'date_naissance']
        extra_kwargs = {
            'password': {'write_only': True, 'required': False},
            'medical_license': {'required': False},
            'photo_profil': {'required': False},
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            agents_sante=validated_data['agents_sante'],
            civilite=validated_data.get('civilite', ''),
            phone_number=validated_data.get('phone_number', ''),
            specialitemedi=validated_data.get('specialitemedi'),
            specialitelabo=validated_data.get('specialitelabo'),
            medical_license=validated_data.get('medical_license'),
            numero_licence_medicale=validated_data.get('numero_licence_medicale', ''),
            photo_profil=validated_data.get('photo_profil'),
            date_naissance=validated_data.get('date_naissance'),
            is_active=False,  
            is_approved=False,
        )
        
        self.send_admin_notification(user)
        
        return user
    
    def send_admin_notification(self, user):
        subject = "Nouvelle demande d'inscription en attente"
        html_message = render_to_string('admin_notification_email.html', {
            'user': user,
        })
        plain_message = strip_tags(html_message)
        from_email = settings.DEFAULT_FROM_EMAIL
        to = settings.ADMIN_EMAIL  
        
        send_mail(subject, plain_message, from_email, [to], html_message=html_message)
        
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Cet email est déjà utilisé.")
        return value

    def validate_phone_number(self, value):
        if not value.isdigit() or len(value) != 10:
            raise serializers.ValidationError("Numéro de téléphone invalide.")
        return value

    def validate(self, data):
        agents_sante = data.get('agents_sante')
        
        if agents_sante == 'docteur' and not data.get('numero_licence_medicale'):
            raise serializers.ValidationError({
                'numero_licence_medicale': 'Le numéro de licence est requis pour les médecins.'
            })
            
        if agents_sante == 'laborantin' and not data.get('specialitelabo'):
            raise serializers.ValidationError({
                'specialitelabo': 'La spécialité de laboratoire est requise pour les laborantins.'
            })
            
        return data   

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

class UserApprovalSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['is_approved']

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    confirm_new_password = serializers.CharField(required=True)

    def validate(self, data):
        if data['new_password'] != data['confirm_new_password']:
            raise serializers.ValidationError("Les nouveaux mots de passe ne correspondent pas.")
        return data

class UserProfileSerializer(serializers.ModelSerializer):
    specialitemedi_nom = serializers.CharField(source='specialitemedi.nom', read_only=True)
    class Meta:
        model = User
        fields = ['id','email', 'username','first_name','last_name', 'agents_sante', 'civilite', 'phone_number', 
                 'specialitemedi', 'specialitemedi_nom', 'specialitelabo', 'numero_licence_medicale', 
                 'photo_profil', 'date_naissance', 'is_approved', 'is_rejected', 'rejection_date', 'rejection_reason']