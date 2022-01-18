from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from auth.models import User


NULL_BLANK = {"blank": True, "null": True}


class PortionItem(models.Model):
    """
    A class representing a food/portion item that can be tracked.
    """

    name = models.CharField(_("item name"), max_length=150)
    is_default = models.BooleanField(_("is default?"), default=False)

    class Meta:
        verbose_name = _("portion item")
        verbose_name_plural = _("portion items")

    def __str__(self):
        return self.name


class Frequency(models.IntegerChoices):
    """
    Options for the frequency on how often the log count should refresh.
    """

    DAILY = 1, _("Daily")
    WEEKLY = 7, _("Weekly")


class TrackItem(models.Model):
    """
    A class representing a portion item that a user wants to track.
    """

    item = models.ForeignKey(PortionItem, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    target = models.IntegerField(_("target"), default=1)
    order = models.IntegerField(_("order"), **NULL_BLANK)
    frequency = models.IntegerField(_("frequency"), default=Frequency.DAILY)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"TrackItem({self.user} - {self.item})"


class UserLog(models.Model):
    """
    A class representing a log.
    """

    item = models.ForeignKey(TrackItem, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(_("timestamp"), default=timezone.now)

    class Meta:
        ordering = ["timestamp"]

    def __str__(self):
        return f"UserLog({self.item} - {self.timestamp})"
