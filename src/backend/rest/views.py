from rest_framework import viewsets
from rest_framework import permissions

from rest import serializers
from main import models


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = models.User.objects.all().order_by("-date_joined")
    serializer_class = serializers.UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class PortionItemViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows portion items to be viewed or edited.
    """

    queryset = models.PortionItem.objects.filter(is_default=True)
    serializer_class = serializers.PortionItemSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class TrackItemViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows track items to be viewed or edited.
    """

    queryset = models.TrackItem.objects.all().order_by("order")
    serializer_class = serializers.TrackItemSerializer
    permission_classes = [permissions.IsAuthenticated]


class UserLogViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows user portion logs to be viewed or edited.
    """

    queryset = models.UserLog.objects.all().order_by("-timestamp")
    serializer_class = serializers.UserLogSerializer
    permission_classes = [permissions.IsAuthenticated]
