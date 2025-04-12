from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from patient.models import CustomPatient
from patient.permissions import IsDoctorOwner
from .models import Workflow, TacheWorkflow, PatientWorkflow
from .serializers import WorkflowSerializer, TacheWorkflowSerializer, PatientWorkflowSerializer
from .utils import planifier_tache

from rest_framework import generics, permissions
from django.shortcuts import get_object_or_404
from rest_framework import viewsets


class WorkflowListCreateView(generics.ListCreateAPIView):
    queryset = Workflow.objects.all()
    serializer_class = WorkflowSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Workflow.objects.filter(docteur=self.request.user)

    def perform_create(self, serializer):
        serializer.save(docteur=self.request.user)

class WorkflowDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = WorkflowSerializer
    permission_classes = [IsAuthenticated, IsDoctorOwner]

    def get_queryset(self):
        return Workflow.objects.filter(docteur=self.request.user)
    
class TacheWorkflowCreateView(generics.CreateAPIView):
    serializer_class = TacheWorkflowSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        tache = serializer.save()
        planifier_tache(tache)  

class TacheWorkflowListView(generics.ListAPIView):
    serializer_class = TacheWorkflowSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        workflow_id = self.kwargs['workflow_id']
        return TacheWorkflow.objects.filter(workflow_id=workflow_id)

class PatientWorkflowCreateView(generics.CreateAPIView):
    serializer_class = PatientWorkflowSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        patient_id = request.data.get('patient')
        workflow_id = request.data.get('workflow')
        
        try:
            patient = CustomPatient.objects.get(id=patient_id)
            workflow = Workflow.objects.get(id=workflow_id)
            patient_workflow, created = PatientWorkflow.objects.get_or_create(
                patient=patient,
                workflow=workflow
            )
            serializer = self.get_serializer(patient_workflow)
            return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)
        except (CustomPatient.DoesNotExist, Workflow.DoesNotExist):
            return Response({"error": "Patient ou Workflow introuvable"}, status=status.HTTP_404_NOT_FOUND)

class PatientWorkflowListView(generics.ListAPIView):
    serializer_class = PatientWorkflowSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        patient_id = self.kwargs['patient_id']
        return PatientWorkflow.objects.filter(patient_id=patient_id)