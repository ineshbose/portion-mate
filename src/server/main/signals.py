import string
import secrets

from django.db.models import signals, Max
from django.dispatch import receiver
from django.contrib.auth.hashers import make_password

from . import models


@receiver([signals.pre_init], sender=models.User)
def load_user_fixture(sender, *args, **kwargs):
    if (
        isinstance(kwargs.get("kwargs"), dict)
        and kwargs["kwargs"].get("email")
        # and kwargs["kwargs"].get("id")  # Comment out when id is not serialized
    ):
        if not kwargs["kwargs"].get("id"):
            kwargs["kwargs"]["id"] = (
                models.User.objects.aggregate(Max("id")).get("id__max", 0) or 0
            ) + 1

        if not kwargs["kwargs"].get("password"):
            password = "".join(
                secrets.choice(string.ascii_letters + string.digits) for _ in range(10)
            )
            kwargs["kwargs"]["password"] = make_password(password)

        print(f"User {kwargs['kwargs']['id']}: {kwargs['kwargs']['email']} {password}")


def user_created_hook(instance, *args, **kwargs):
    EATWELL_MAP = {
        "Carbohydrates": 6,
        "Fruits & Vegetables": 6,
        "Protein": 3,
        "Dairy": 3,
        "Oils & Fats": 1,
    }

    for portion_item in models.PortionItem.objects.filter(is_default=True):
        models.TrackItem.objects.update_or_create(
            item=portion_item,
            user=instance,
            target=EATWELL_MAP.get(portion_item.name, 1),
            order=portion_item.id,
        )


def user_updated_hook(instance, *args, **kwargs):
    pass


@receiver([signals.post_save], sender=models.User)
def user_post_save(sender, instance, *args, **kwargs):
    (
        user_created_hook
        if (kwargs.get("created") or kwargs.get("raw"))
        else user_updated_hook
    )(instance, *args, **kwargs)
