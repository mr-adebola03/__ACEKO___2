from django.shortcuts import get_object_or_404
from rest_framework import generics, status, permissions, viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import CustomPatientSerializer, DossierMedicalSerializer, RendezVousSerializer, ConsultationSerializer
from .models import CustomPatient, DossierMedical, RendezVous, Consultation
from .permissions import IsDoctorOwner  

class CustomPatientBaseView:
    model = CustomPatient
    serializer_class = CustomPatientSerializer
    permission_classes = [IsAuthenticated, IsDoctorOwner]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return CustomPatient.objects.all()
        return CustomPatient.objects.filter(docteur=self.request.user)

    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, pk=self.kwargs['pk'])
        self.check_object_permissions(self.request, obj)
        return obj

class PatientBaseView:
    serializer_class = CustomPatientSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'pk'

    def get_queryset(self):
        queryset = CustomPatient.objects.all()
        if self.request.user.agents_sante == 'docteur' and not self.request.user.is_superuser:
            queryset = queryset.filter(docteur=self.request.user)
        return queryset

class CustomPatientCreateView(CustomPatientBaseView, generics.CreateAPIView):
    def perform_create(self, serializer):
        dernier_id = CustomPatient.objects.count() + 1
        serializer.save(
            docteur=self.request.user,
            numerodossier=f"AB{dernier_id:06d}"
        )

class CustomPatientUpdateView(CustomPatientBaseView, generics.UpdateAPIView):
    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

class CustomPatientListView(PatientBaseView, generics.ListAPIView):
    
    def filter_queryset(self, queryset):
        stade_mrc = self.request.query_params.get('stade_mrc')
        if stade_mrc:
            queryset = queryset.filter(stade_mrc=stade_mrc)
        return queryset.order_by('-date_creation')

    def get_serializer_context(self):
        return {
            'request': self.request,
            'format': self.format_kwarg,
            'view': self,
            'user_role': self.request.user.agents_sante
        }

class CustomPatientDetailView(PatientBaseView, generics.RetrieveAPIView):
    def get_object(self):
        obj = get_object_or_404(self.get_queryset(), pk=self.kwargs['pk'])
        self.check_object_permissions(self.request, obj)
        return obj

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['detail_view'] = True  
        return context

class DossierMedicalDetailView(generics.RetrieveUpdateAPIView):
    queryset = DossierMedical.objects.all()
    serializer_class = DossierMedicalSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'patient_id'

    def get_object(self):
        patient_id = self.kwargs.get('patient_id')
        return DossierMedical.objects.get(patient_id=patient_id)

class DossierMedicalUpdateView(generics.UpdateAPIView):
    queryset = DossierMedical.objects.all()
    serializer_class = DossierMedicalSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'patient_id'

    def get_object(self):
        patient_id = self.kwargs.get('patient_id')
        return DossierMedical.objects.get(patient_id=patient_id)


class RendezVousViewSet(viewsets.ModelViewSet):
    serializer_class = RendezVousSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = {
        'date_rdv': ['gte', 'lte', 'exact'],
        'statut': ['exact'],
        'dossier__patient': ['exact'],
    }
    search_fields = ['dossier__patient__first_name', 'dossier__patient__last_name']
    ordering_fields = ['date_rdv', 'created_at']

    def get_queryset(self):
        queryset = RendezVous.objects.all()

        if hasattr(self.request.user, 'agents_sante') and self.request.user.agents_sante == 'docteur':
            queryset = queryset.filter(docteur=self.request.user)

        patient_id = self.request.query_params.get('dossier__patient')
        if patient_id:
            queryset = queryset.filter(dossier__patient_id=patient_id)

        return queryset.select_related('dossier__patient', 'docteur')

    def perform_create(self, serializer):
        if self.request.user.agents_sante == 'docteur':
            serializer.save(docteur=self.request.user)
        else:
            serializer.save()

    def create(self, request, *args, **kwargs):
        print("Données reçues:", request.data)
        serializer = self.get_serializer(data=request.data)
        print("Serializer valide?", serializer.is_valid())
        print("Erreurs serializer:", serializer.errors)
        return super().create(request, *args, **kwargs)

class ConsultationListView(generics.ListCreateAPIView):
    queryset = Consultation.objects.all()
    serializer_class = ConsultationSerializer

class ConsultationCreateView(generics.CreateAPIView):
    queryset = Consultation.objects.all()
    serializer_class = ConsultationSerializer
    permission_classes = [IsAuthenticated]

class ConsultationDetailView(generics.RetrieveAPIView):
    queryset = Consultation.objects.all()
    serializer_class = ConsultationSerializer
