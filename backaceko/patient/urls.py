from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    CustomPatientListView,
    CustomPatientCreateView,
    CustomPatientDetailView,
    CustomPatientUpdateView, DossierMedicalUpdateView, DossierMedicalDetailView, RendezVousViewSet,
    ConsultationListView, ConsultationCreateView
)


urlpatterns = [
    path('patients/', CustomPatientListView.as_view(), name='patient-list'),
    path('patients/create/', CustomPatientCreateView.as_view(), name='patient-create'),
    path('patients/<int:pk>/', CustomPatientDetailView.as_view(), name='patient-detail'),
    path('patients/<int:pk>/update/', CustomPatientUpdateView.as_view(), name='patient-update'),
#     path('patients/<int:pk>/delete/', CustomPatientDeleteView.as_view(), name='patient-delete'),
    path('dossiers/<int:patient_id>/', DossierMedicalDetailView.as_view(), name='dossier-detail'),
    path('dossiers/<int:patient_id>/', DossierMedicalUpdateView.as_view(), name='dossier-update'),
    path('rendezvous/', RendezVousViewSet.as_view({
        'get': 'list',
        'post': 'create'
    }), name='rendezvous-list'),
    path('consultations/', ConsultationListView.as_view(), name='consultation-list'),
    path('consultations/create/', ConsultationCreateView.as_view(), name='consultation-create'),
]