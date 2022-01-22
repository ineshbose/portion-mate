from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions as drf_permissions

from rest import serializers
from main import models


class UserViewSet(ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = models.User.objects.all().order_by("-date_joined")
    serializer_class = serializers.UserSerializer
    permission_classes = [drf_permissions.IsAuthenticated]
    pagination_class = None

    def get_queryset(self):
        return self.request.user

    def get_permissions(self):
        if self.action in ["create"]:
            self.permission_classes = [drf_permissions.AllowAny]

        return super(self.__class__, self).get_permissions()

    def list(self, request, *args, **kwargs):
        return Response(
            self.get_serializer(self.filter_queryset(self.get_queryset())).data
        )


class PortionItemViewSet(ModelViewSet):
    """
    API endpoint that allows portion items to be viewed or edited.
    """

    queryset = models.PortionItem.objects.filter(is_default=True).order_by("id")
    serializer_class = serializers.PortionItemSerializer
    permission_classes = [drf_permissions.IsAuthenticatedOrReadOnly]


class TrackItemViewSet(ModelViewSet):
    """
    API endpoint that allows track items to be viewed or edited.
    """

    queryset = models.TrackItem.objects.all().order_by("order")
    serializer_class = serializers.TrackItemSerializer
    permission_classes = [drf_permissions.IsAuthenticated]
    pagination_class = None

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)


class UserLogViewSet(ModelViewSet):
    """
    API endpoint that allows user portion logs to be viewed or edited.
    """

    queryset = models.UserLog.objects.all().order_by("-timestamp")
    serializer_class = serializers.UserLogSerializer
    permission_classes = [drf_permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(item__user=self.request.user)
