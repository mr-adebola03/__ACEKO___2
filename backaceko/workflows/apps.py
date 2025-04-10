from django.apps import AppConfig


class WorkflowsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'workflows'
    
    def ready(self):
        from .scheduler import start_scheduler
        start_scheduler()