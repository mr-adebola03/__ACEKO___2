from django.contrib import admin
from patient.models import *

# Register your models here.
class PatientAdmin(admin.ModelAdmin):
        list_display = ('numerodossier', 'first_name', 'last_name', 'civilite', 'stade_mrc','docteur')
        
class DossierMedicalAdmin(admin.ModelAdmin):
        list_display = ('patient', 'date_creation')
        
class RendezVousAdmin(admin.ModelAdmin):
        list_display = ('dossier', 'date_rdv', 'statut')
        
class ConsultationAdmin(admin.ModelAdmin):
        list_display = ('dossier', 'date_consultation')
        
class AnalyseAFaireAdmin(admin.ModelAdmin):
        list_display = ('dossier', 'nom_analyse', 'statut')
        
class ResultatAnalyseAdmin(admin.ModelAdmin):
        list_display = ('analyse', 'dgf', 'laborantin')
        
class AlertAdmin(admin.ModelAdmin):
        list_display = ('type_alerte', 'envoyee')
        
admin.site.register(CustomPatient, PatientAdmin)
admin.site.register(DossierMedical, DossierMedicalAdmin)
admin.site.register(RendezVous, RendezVousAdmin)
admin.site.register(Consultation, ConsultationAdmin)
admin.site.register(AnalyseAFaire, AnalyseAFaireAdmin)
admin.site.register(ResultatAnalyse, ResultatAnalyseAdmin)
admin.site.register(Alerte, AlertAdmin)