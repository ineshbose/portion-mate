import os
from uuid import uuid4

from django.db import models

from django.contrib import auth
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.core.mail import send_mail
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.utils.deconstruct import deconstructible


NULL_BLANK = {"blank": True, "null": True}


@deconstructible
class PathAndRename(object):
    def __init__(self, sub_path):
        self.path = sub_path

    def __call__(self, instance, filename):
        ext = filename.split(".")[-1]
        filename = f"{instance.pk}.{ext}" if instance.pk else f"{uuid4().hex}.{ext}"
        return os.path.join(self.path, filename)


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """
        Create and save a user with the given email and password.
        """
        if not email:
            raise ValueError("The given email must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.password = make_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(email, password, **extra_fields)

    def with_perm(
        self, perm, is_active=True, include_superusers=True, backend=None, obj=None
    ):
        if backend is None:
            backends = auth._get_backends(return_tuples=True)
            if len(backends) == 1:
                backend, _ = backends[0]
            else:
                raise ValueError(
                    "You have multiple authentication backends configured and "
                    "therefore must provide the `backend` argument."
                )
        elif not isinstance(backend, str):
            raise TypeError(
                "backend must be a dotted import path string (got %r)." % backend
            )
        else:
            backend = auth.load_backend(backend)
        if hasattr(backend, "with_perm"):
            return backend.with_perm(
                perm,
                is_active=is_active,
                include_superusers=include_superusers,
                obj=obj,
            )
        return self.none()


class User(AbstractBaseUser, PermissionsMixin):
    """
    An extended class implementing a fully featured User model with
    admin-compliant permissions.

    Username (email) and password are required. Other fields are optional.
    """

    email = models.EmailField(
        _("email address"),
        unique=True,
        error_messages={
            "unique": _("An account with that email already exists."),
        },
    )
    first_name = models.CharField(_("first name"), max_length=150, blank=True)
    last_name = models.CharField(_("last name"), max_length=150, blank=True)
    is_staff = models.BooleanField(
        _("staff status"),
        default=False,
        help_text=_("Designates whether the user can log into this admin site."),
    )
    is_active = models.BooleanField(
        _("active"),
        default=True,
        help_text=_(
            "Designates whether this user should be treated as active. "
            "Unselect this instead of deleting accounts."
        ),
    )
    date_joined = models.DateTimeField(_("date joined"), default=timezone.now)

    objects = UserManager()

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    ### Custom fields

    picture = models.ImageField(
        _("profile picture"),
        upload_to=PathAndRename("profile_images/"),
        **NULL_BLANK,
    )
    age = models.IntegerField(_("age"), **NULL_BLANK)
    height = models.FloatField(_("height"), **NULL_BLANK)
    weight = models.FloatField(_("weight"), **NULL_BLANK)

    #####

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")
        swappable = "AUTH_USER_MODEL"

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    def __str__(self):
        return self.get_full_name() or self.email

    def get_full_name(self):
        """
        Return the first_name plus the last_name, with a space in between.
        """
        full_name = "%s %s" % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        """Return the short name for the user."""
        return self.first_name

    def email_user(self, subject, message, from_email=None, **kwargs):
        """Send an email to this user."""
        send_mail(subject, message, from_email, [self.email], **kwargs)


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
