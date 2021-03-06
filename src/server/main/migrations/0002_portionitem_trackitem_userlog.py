# Generated by Django 3.2.8 on 2021-11-09 19:07

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("main", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="PortionItem",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=150, verbose_name="item name")),
                (
                    "is_default",
                    models.BooleanField(default=False, verbose_name="is default?"),
                ),
            ],
            options={
                "verbose_name": "portion item",
                "verbose_name_plural": "portion items",
            },
        ),
        migrations.CreateModel(
            name="TrackItem",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("target", models.IntegerField(default=1, verbose_name="target")),
                (
                    "order",
                    models.IntegerField(blank=True, null=True, verbose_name="order"),
                ),
                ("frequency", models.IntegerField(default=1, verbose_name="frequency")),
                (
                    "item",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="main.portionitem",
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "ordering": ["order"],
            },
        ),
        migrations.CreateModel(
            name="UserLog",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "timestamp",
                    models.DateTimeField(
                        default=django.utils.timezone.now, verbose_name="timestamp"
                    ),
                ),
                (
                    "item",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="main.trackitem"
                    ),
                ),
            ],
            options={
                "ordering": ["timestamp"],
            },
        ),
    ]
