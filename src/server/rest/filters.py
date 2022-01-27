from rest_framework.filters import BaseFilterBackend


class UserFilterBackend(BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        return queryset.filter(pk=request.user.pk)
