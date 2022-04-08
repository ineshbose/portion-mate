from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _
from markdownx.admin import MarkdownxModelAdmin
from . import models


class TrackItemInline(admin.TabularInline):
    model = models.TrackItem


class LogItemInline(admin.TabularInline):
    model = models.UserLog


@admin.register(models.User)
class MainUserAdmin(UserAdmin):
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (_("Personal info"), {"fields": ("forename", "surname", "picture")}),
        (_("Health info"), {"fields": ("age", "height", "weight")}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "password1", "password2"),
            },
        ),
    )
    list_display = ("email", "forename", "surname", "age", "is_staff")
    list_filter = ("is_staff", "is_superuser", "is_active", "groups")
    search_fields = ("forename", "surname", "email")
    ordering = ("id",)
    filter_horizontal = (
        "groups",
        "user_permissions",
    )
    inlines = [
        TrackItemInline,
    ]


@admin.register(models.PortionItem)
class BasicModelAdmin(admin.ModelAdmin):
    list_display = ("name", "is_default")
    list_filter = ("is_default",)
    search_fields = ("name",)
    ordering = ("id",)


@admin.register(models.TrackItem)
class TrackItemAdmin(admin.ModelAdmin):
    list_display = ("item", "user", "target", "order", "frequency")
    list_filter = ("target",)
    search_fields = ("item__name", "user__email", "user__forename", "user__surname")
    ordering = ("id",)
    inlines = [
        LogItemInline,
    ]


@admin.register(models.Resource)
class ResourceAdmin(MarkdownxModelAdmin):
    list_display = ("title", "author", "date_published")
    list_filter = ("author", "date_published")
    search_fields = ("author", "title", "content", "link")
    ordering = ("-date_published",)


@admin.register(models.Journal)
class JournalAdmin(admin.ModelAdmin):
    list_display = ("user", "entry_time", "meal")
    list_filter = ("user", "entry_time", "meal")
    search_fields = ("user", "meal", "content")
    ordering = ("-entry_time",)
