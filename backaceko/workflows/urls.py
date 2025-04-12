from django.urls import path
from .views import WorkflowListCreateView, WorkflowDetailView

urlpatterns = [
    path('workflows/', WorkflowListCreateView.as_view(), name='workflow-list-create'),
    path('workflows/<int:pk>/', WorkflowDetailView.as_view(), name='workflow-detail'),
]
