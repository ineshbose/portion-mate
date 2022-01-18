from rest_framework import viewsets
from rest_framework import permissions as drf_permissions

from rest import serializers
from rest import permissions
from main import models
from auth.models import User


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = serializers.UserSerializer

    def get_permissions(self):
        if self.action in ["list"]:
            self.permission_classes = [drf_permissions.IsAdminUser]

        elif self.action in ["retrieve"]:
            self.permission_classes = [permissions.IsAdminOrIsSelf]

        return super(self.__class__, self).get_permissions()


class PortionItemViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows portion items to be viewed or edited.
    """

    queryset = models.PortionItem.objects.all().order_by("id")
    serializer_class = serializers.PortionItemSerializer
    permission_classes = [drf_permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return (
            self.queryset.filter(
                id__in=models.TrackItem.objects.filter(
                    user=self.request.user
                ).values_list("item", flat=True)
            )
            if self.request.user and self.request.user.is_authenticated
            else self.queryset.filter(is_default=True)
        )


class TrackItemViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows track items to be viewed or edited.
    """

    queryset = models.TrackItem.objects.all().order_by("order")
    serializer_class = serializers.TrackItemSerializer
    permission_classes = [drf_permissions.IsAuthenticated]

    def get_queryset(self):
        return (
            self.queryset
            if self.request.user.is_staff
            else self.queryset.filter(user=self.request.user)
        )


class UserLogViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows user portion logs to be viewed or edited.
    """

    queryset = models.UserLog.objects.all().order_by("-timestamp")
    serializer_class = serializers.UserLogSerializer
    permission_classes = [drf_permissions.IsAuthenticated]

    def get_queryset(self):
        return (
            self.queryset
            if self.request.user.is_staff
            else self.queryset.filter(item__user=self.request.user)
        )
