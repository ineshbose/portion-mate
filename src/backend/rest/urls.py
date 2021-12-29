from django.urls import include, path
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views


router = routers.DefaultRouter()
router.register(r"users", views.UserViewSet)
router.register(r"portionitems", views.PortionItemViewSet)
router.register(r"trackitem", views.TrackItemViewSet)
router.register(r"userlogs", views.UserLogViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
