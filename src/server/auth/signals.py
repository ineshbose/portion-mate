import string
import secrets

from django.db.models import signals, Max
from django.dispatch import receiver
from django.contrib.auth.hashers import make_password

from .models import User


@receiver([signals.pre_init], sender=User)
def load_user_fixture(sender, *args, **kwargs):
    if (
        isinstance(kwargs.get("kwargs"), dict)
        and kwargs["kwargs"].get("email")
        and kwargs["kwargs"].get("id")  # Comment out when id is not serialized
    ):
        if not kwargs["kwargs"].get("id"):
            kwargs["kwargs"]["id"] = (
                User.objects.aggregate(Max("id")).get("id__max", 0) + 1
            )

        if not kwargs["kwargs"].get("password"):
            password = "".join(
                secrets.choice(string.ascii_letters + string.digits) for _ in range(10)
            )
            kwargs["kwargs"]["password"] = make_password(password)

        print(f"User {kwargs['kwargs']['id']}: {kwargs['kwargs']['email']} {password}")
