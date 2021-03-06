# Generated by Django 3.2.11 on 2022-01-23 18:34

from django.conf import settings
from django.db import migrations, models
import markdownx.models


class Migration(migrations.Migration):

    dependencies = [
        ("main", "0002_portionitem_trackitem_userlog"),
    ]

    operations = [
        migrations.CreateModel(
            name="Resource",
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
                ("title", models.CharField(max_length=200, verbose_name="title")),
                ("author", models.CharField(max_length=100, verbose_name="author")),
                ("link", models.URLField(blank=True, null=True, verbose_name="link")),
                (
                    "date_published",
                    models.DateField(
                        blank=True, null=True, verbose_name="date published"
                    ),
                ),
                ("content", markdownx.models.MarkdownxField(verbose_name="content")),
                (
                    "bookmarked_users",
                    models.ManyToManyField(blank=True, to=settings.AUTH_USER_MODEL),
                ),
            ],
            options={
                "ordering": ["-date_published"],
            },
        ),
    ]
