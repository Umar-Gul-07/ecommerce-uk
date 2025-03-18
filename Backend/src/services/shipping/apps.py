from django.apps import AppConfig


class CoreConfig(AppConfig):
    name = 'src.services.shipping'
    verbose_name = 'Shipping'
    verbose_plural = 'Shipping'
    default_auto_config = 'django.db.models.BigAutoField'

    # def ready(self):
    #     import src.core.signals
