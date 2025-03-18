from django.apps import AppConfig


class CoreConfig(AppConfig):
    name = 'src.services.transactions'
    verbose_name = 'Transactions'
    verbose_plural = 'Transactions'
    default_auto_config = 'django.db.models.BigAutoField'

    # def ready(self):
    #     import src.core.signals
