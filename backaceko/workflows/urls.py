from django.urls import path
from .views import TacheCreateView, TacheDetailView, TacheListView, TachesByWorkflowView, WorkflowListCreateView, WorkflowDetailView

urlpatterns = [
    path('workflows/', WorkflowListCreateView.as_view(), name='workflow-list-create'),
    path('workflows/<int:pk>/', WorkflowDetailView.as_view(), name='workflow-detail'),
    path('workflows/<int:workflow_id>/taches/create/', 
         TacheCreateView.as_view(), 
         name='tache-create'),
    
    # Liste toutes les tâches (filtrable)
    path('taches/', 
         TacheListView.as_view(), 
         name='tache-list'),
    
    # Détail/Mise à jour/Suppression d'une tâche
    path('taches/<int:pk>/', 
         TacheDetailView.as_view(), 
         name='tache-detail'),
    
    # Liste des tâches d'un workflow spécifique
    path('workflows/<int:workflow_id>/taches/', 
         TachesByWorkflowView.as_view(), 
         name='taches-by-workflow'),
]
