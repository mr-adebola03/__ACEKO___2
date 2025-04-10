from rest_framework import serializers
from .models import Workflow, TacheWorkflow, PatientWorkflow, Docteur, CustomPatient

class TacheWorkflowSerializer(serializers.ModelSerializer):
    class Meta:
        model = TacheWorkflow
        fields = ['id', 'type_tache', 'description', 'intervalle', 'seuil_critique', 'message_alerte']

class PatientWorkflowSerializer(serializers.ModelSerializer):
    patient = serializers.StringRelatedField()  
    workflow = serializers.StringRelatedField()  

    class Meta:
        model = PatientWorkflow
        fields = ['id', 'patient', 'workflow', 'date_assignation']

class WorkflowSerializer(serializers.ModelSerializer):
    createur = serializers.StringRelatedField()  
    laborantin = serializers.StringRelatedField(allow_null=True)  
    taches = TacheWorkflowSerializer(many=True, read_only=True)  
    patients = PatientWorkflowSerializer(many=True, read_only=True, source='patients')  

    class Meta:
        model = Workflow
        fields = ['id', 'nom', 'description', 'createur', 'laborantin', 'stade_mrc', 'date_creation', 'taches', 'patients']