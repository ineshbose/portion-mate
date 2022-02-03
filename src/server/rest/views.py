from django.db.models import F

from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.decorators import action
from rest_framework import status, permissions as drf_permissions

from rest import serializers
from main import models
from rest.filters import UserFilterBackend


class UserViewSet(ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = models.User.objects.all().order_by("-date_joined")
    serializer_class = serializers.UserSerializer
    permission_classes = [drf_permissions.IsAuthenticated]
    pagination_class = None
    filter_backends = [UserFilterBackend]

    def get_permissions(self):
        if self.action in ["create"]:
            self.permission_classes = [drf_permissions.AllowAny]

        return super(self.__class__, self).get_permissions()

    def list(self, request, *args, **kwargs):
        return Response(self.get_serializer(request.user).data)


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

    queryset = models.TrackItem.objects.all().order_by(F("order").asc(nulls_last=True))
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


class ResourceViewSet(ReadOnlyModelViewSet):
    """
    API endpoint that allows resources to be viewed.
    """

    queryset = models.Resource.objects.all().order_by("-date_published")
    serializer_class = serializers.ResourceSerializer

    @action(
        detail=True,
        methods=["POST"],
        permission_classes=[drf_permissions.IsAuthenticated],
    )
    def bookmark(self, request, pk=None):
        obj = self.queryset.filter(pk=pk).first()
        return (
            Response(
                obj.bookmarked_users.remove(request.user)
                if request.user in obj.bookmarked_users.all()
                else obj.bookmarked_users.add(request.user)
            )
            if obj
            else Response(status=status.HTTP_400_BAD_REQUEST)
        )
