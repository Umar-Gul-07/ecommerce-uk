from django.apps import AppConfig


class CoreConfig(AppConfig):
    name = 'src.services.members'
    verbose_name = 'Members'
    verbose_plural = 'Members'
    default_auto_config = 'django.db.models.BigAutoField'

    # def ready(self):
    #     import src.core.signals
