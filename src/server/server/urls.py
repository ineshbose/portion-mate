from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("", include("mate.urls")),
    path("api/", include("rest.urls")),
    path("admin/", admin.site.urls),
    path("graphql", include("graph.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
