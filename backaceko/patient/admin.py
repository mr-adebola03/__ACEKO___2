from django.contrib import admin
from patient.models import CustomPatient

# Register your models here.
class PatientAdmin(admin.ModelAdmin):
        list_display = ('numerodossier', 'first_name', 'last_name', 'civilite', 'stade_mrc','docteur')
        
admin.site.register(CustomPatient, PatientAdmin)