from rest_framework import serializers
from .models import Workflow, TacheWorkflow, PatientWorkflow, Docteur, CustomPatient

# class TacheWorkflowSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = TacheWorkflow
#         fields = ['id', 'type_tache', 'description', 'intervalle', 'seuil_critique', 'message_alerte']

class TacheWorkflowSerializer(serializers.ModelSerializer):
    class Meta:
        model = TacheWorkflow
        fields = [
            'id',
            'workflow',
            'type_tache',
            'description',
            'intervalle',
            'seuil_critique',
            'message_alerte',
            'completed',
            'date_echeance'
        ]
        read_only_fields = ('id',)
        extra_kwargs = {
            'workflow': {'write_only': True}
        }

    def validate_seuil_critique(self, value):
        if value and not isinstance(value, dict):
            raise serializers.ValidationError("Le seuil critique doit être un objet JSON")
        return value

class TacheWorkflowDetailSerializer(TacheWorkflowSerializer):
    workflow_info = serializers.SerializerMethodField()

    class Meta(TacheWorkflowSerializer.Meta):
        fields = TacheWorkflowSerializer.Meta.fields + ['workflow_info']
    
    def get_workflow_info(self, obj):
        return {
            'id': obj.workflow.id,
            'nom': obj.workflow.nom,
            'stade_mrc': obj.workflow.stade_mrc
        }

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