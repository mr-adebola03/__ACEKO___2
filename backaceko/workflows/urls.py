from django.urls import path
from .views import (
    TacheWorkflowCreateView,
    WorkflowListCreateView,
    WorkflowDetailView,
    TacheWorkflowListView,
    PatientWorkflowCreateView,
    PatientWorkflowListView,
)

urlpatterns = [
    path('workflows/', WorkflowListCreateView.as_view(), name='workflow-list-create'),
    path('workflows/<int:pk>/', WorkflowDetailView.as_view(), name='workflow-detail'),
    path('workflows/<int:workflow_id>/taches/', TacheWorkflowListView.as_view(), name='tache-workflow-list'),
    path('workflows/<int:workflow_id>/taches/create/', TacheWorkflowCreateView.as_view(), name='tache-workflow-create'),
    path('patient-workflows/', PatientWorkflowCreateView.as_view(), name='patient-workflow-create'),
    path('patients/<int:patient_id>/workflows/', PatientWorkflowListView.as_view(), name='patient-workflow-list'),
]