from datetime import timedelta
from django.utils import timezone
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from main import models


class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.

    Source: https://www.django-rest-framework.org/api-guide/serializers/
    """

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop("fields", None)

        # Don't pass the 'exclude' arg up to the superclass
        exclude = kwargs.pop("exclude", None)

        # Instantiate the superclass normally
        super().__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)

        if exclude is not None:
            # Drop any fields that are specified in the `exclude` argument.
            for field_name in exclude:
                if field_name in self.fields:
                    self.fields.pop(field_name)

    def get_auth_user(self, default=None, *args, **kwargs):
        """
        Get an authenticated user, else None.
        """
        return (
            self.context["request"].user
            if self.context.get("request") and hasattr(self.context["request"], "user")
            else default
        )


class UserSerializer(DynamicFieldsModelSerializer):
    old_password = serializers.CharField(
        write_only=True, required=False, allow_blank=True
    )

    class Meta:
        model = models.User
        fields = [
            "id",
            "email",
            "forename",
            "surname",
            "picture",
            "age",
            "height",
            "weight",
            "password",
            "old_password",
        ]
        extra_kwargs = {"password": {"write_only": True, "allow_blank": True}}

    def create(self, validated_data):
        password = validated_data.pop("password")
        instance = super().create(validated_data)

        try:
            validate_password(password)
        except ValidationError as errors:
            instance.delete()
            raise serializers.ValidationError({"password": list(errors)})

        instance.set_password(password)
        instance.save()

        return instance

    def update(self, instance, validated_data):
        password = validated_data.pop("password")
        old_password = validated_data.pop("old_password", None)
        instance = super().update(instance, validated_data)

        if password and old_password:
            if instance.check_password(old_password):
                try:
                    validate_password(password)
                except ValidationError as errors:
                    raise serializers.ValidationError({"password": list(errors)})

                instance.set_password(password)
                instance.save()
            else:
                raise serializers.ValidationError(
                    {"old_password": "Password is invalid."}
                )

        return instance


class PortionItemSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = models.PortionItem
        fields = ["id", "name", "is_default"]


class TrackItemSerializer(DynamicFieldsModelSerializer):
    item = PortionItemSerializer()
    logs = serializers.SerializerMethodField()

    def get_logs(self, obj):
        return UserLogSerializer(
            obj.userlog_set.filter(
                timestamp__gte=timezone.now().replace(
                    hour=0, minute=0, second=0, microsecond=0
                )
                - timedelta(days=obj.frequency)
            ),
            many=True,
            exclude=["item"],
        ).data

    class Meta:
        model = models.TrackItem
        fields = [
            "id",
            "item",
            "user",
            "target",
            "order",
            "frequency",
            "logs",
        ]
        extra_kwargs = {"user": {"write_only": True, "required": False}}

    def create(self, validated_data):
        item = validated_data.pop("item")

        validated_data["item"] = models.PortionItem.objects.get_or_create(**item)[0]
        validated_data["user"] = self.get_auth_user()

        return super().create(validated_data)


class UserLogSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = models.UserLog
        fields = ["id", "item", "timestamp"]


class ResourceSerializer(DynamicFieldsModelSerializer):
    bookmarked = serializers.SerializerMethodField()

    def get_bookmarked(self, obj):
        user = self.get_auth_user()
        return user in obj.bookmarked_users.all() if user else False

    class Meta:
        model = models.Resource
        fields = [
            "id",
            "title",
            "author",
            "link",
            "date_published",
            "content",
            "bookmarked",
        ]


class JournalSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = models.Journal
        fields = ["id", "user", "meal", "entry_time", "content"]
        extra_kwargs = {"user": {"write_only": True, "required": False}}

    def create(self, validated_data):
        validated_data["user"] = self.get_auth_user()
        return super().create(validated_data)
