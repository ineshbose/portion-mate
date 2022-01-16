from django.urls import path
from django.views.decorators.csrf import csrf_exempt

from . import views
from . import schema


urlpatterns = [
    path(
        "",
        csrf_exempt(
            views.RestAuthenticatedGraphView.as_view(
                graphiql=True, schema=schema.schema
            )
        ),
    ),
]
