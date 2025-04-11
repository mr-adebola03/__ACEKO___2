from django.contrib import admin
from .models import CustomUser, SpecialiteLaboratoire, SpecialiteMedicale 
from django.contrib.auth.admin import UserAdmin

admin.site.site_header = "ACEKO"
admin.site.site_title = "ACEKO en Admin Portal"
admin.site.index_title = "Welcome to ACERKO Admin Portal"

class UserAdmin(UserAdmin):
        list_display = ('email', 'username', 'agents_sante', 'is_approved')
        list_editable = ('is_approved',)

class SpecialiteMedicaleAdmin(admin.ModelAdmin):
    list_display = ('nom', 'description')
    
class SpecialiteLaboratoireAdmin(admin.ModelAdmin):
    list_display = ('nom', 'description')

admin.site.register(CustomUser, UserAdmin)
admin.site.register(SpecialiteMedicale, SpecialiteMedicaleAdmin)
admin.site.register(SpecialiteLaboratoire, SpecialiteLaboratoireAdmin)