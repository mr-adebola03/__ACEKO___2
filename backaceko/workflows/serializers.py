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
    class Meta:
        model = Workflow
        fields = '__all__'
        read_only_fields = ['docteur', 'date_creation']