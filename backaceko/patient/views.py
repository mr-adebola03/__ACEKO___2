from django.shortcuts import get_object_or_404
from rest_framework import generics, status,permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import CustomPatientSerializer
from .models import CustomPatient
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