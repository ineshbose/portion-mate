from django.urls import include, path
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register(r"users", views.UserViewSet)
router.register(r"portionitems", views.PortionItemViewSet)
router.register(r"trackitem", views.TrackItemViewSet)
router.register(r"userlogs", views.UserLogViewSet)
router.register(r"resources", views.ResourceViewSet)
router.register(r"journals", views.JournalViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("auth/o/", include("oauth2_provider.urls", namespace="oauth2_provider")),
]
