from django.db.models import signals
from django.dispatch import receiver

from oauth2_provider.models import AccessToken, RefreshToken


@receiver([signals.pre_delete], sender=AccessToken)
def delete_tokens(sender, instance, *args, **kwargs):
    return RefreshToken.objects.filter(user=instance.user).delete()
