from django.db.models import signals
from django.dispatch import receiver

from . import models
from auth.models import User


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


@receiver([signals.post_save], sender=User)
def user_post_save(sender, instance, *args, **kwargs):
    (
        user_created_hook
        if (kwargs.get("created") or kwargs.get("raw"))
        else user_updated_hook
    )(instance, *args, **kwargs)
