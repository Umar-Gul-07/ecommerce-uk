from django.apps import AppConfig


class CoreConfig(AppConfig):
    name = 'src.services.product'
    verbose_name = 'Product'
    verbose_plural = 'Product'
    default_auto_config = 'django.db.models.BigAutoField'

    # def ready(self):
    #     import src.core.signals
