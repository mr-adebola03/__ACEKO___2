from django.urls import path
from .views import (
    CustomPatientListView,
    CustomPatientCreateView,
    CustomPatientDetailView,
    CustomPatientUpdateView
)

urlpatterns = [
    path('patients/', CustomPatientListView.as_view(), name='patient-list'),
    path('patients/create/', CustomPatientCreateView.as_view(), name='patient-create'),
    path('patients/<int:pk>/', CustomPatientDetailView.as_view(), name='patient-detail'),
    path('patients/<int:pk>/update/', CustomPatientUpdateView.as_view(), name='patient-update'),
#     path('patients/<int:pk>/delete/', CustomPatientDeleteView.as_view(), name='patient-delete'),
]