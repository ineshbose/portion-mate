from rest_framework import serializers
from main import models


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.User
        fields = [
            "url",
            "email",
            "first_name",
            "last_name",
            "picture",
            "age",
            "height",
            "weight",
        ]


class PortionItemSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.PortionItem
        fields = ["url", "name", "is_default"]


class TrackItemSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.TrackItem
        fields = ["url", "item", "user", "target", "order", "frequency"]


class UserLogSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.UserLog
        fields = ["url", "item", "timestamp"]
