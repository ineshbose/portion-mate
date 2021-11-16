import string
import secrets

from django.db.models import signals, Max
from django.dispatch import receiver
from django.contrib.auth.hashers import make_password

from . import models


@receiver([signals.pre_init], sender=models.User)
def user_created(sender, *args, **kwargs):
    if (isinstance(kwargs.get('kwargs'), dict)):
        if (not kwargs['kwargs'].get('id')):
            kwargs['kwargs']['id'] = models.User.objects.aggregate(Max('id')).get('id__max', 0) + 1

        if (not kwargs['kwargs'].get('password')):
            password = ''.join(secrets.choice(string.ascii_letters + string.digits) for i in range(10))
            kwargs['kwargs']['password'] = make_password(password)

        print(f"User {kwargs['kwargs']['id']}: {kwargs['kwargs'].get('email')} {password}")
