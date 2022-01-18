from django.apps import AppConfig


class MateConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "mate"

    def ready(self):
        import mate.signals  # noqa
