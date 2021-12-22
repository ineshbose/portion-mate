from datetime import timedelta
from django.utils import timezone
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


class UserSerializer(DynamicFieldsModelSerializer):
    items = serializers.SerializerMethodField()

    def get_items(self, obj):
        return TrackItemSerializer(
            obj.trackitem_set, many=True, exclude=["user", "logs"]
        ).data

    class Meta:
        model = models.User
        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "picture",
            "age",
            "height",
            "weight",
            "items",
        ]


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


class UserLogSerializer(DynamicFieldsModelSerializer):
    item = TrackItemSerializer(exclude=["logs"])

    class Meta:
        model = models.UserLog
        fields = ["id", "item", "timestamp"]
