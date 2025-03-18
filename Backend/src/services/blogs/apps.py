from django.apps import AppConfig


class CoreConfig(AppConfig):
    name = 'src.services.blogs'
    verbose_name = 'Blogs'
    verbose_plural = 'Blogs'
    default_auto_config = 'django.db.models.BigAutoField'

    # def ready(self):
    #     import src.core.signals
