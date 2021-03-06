from rest_framework.permissions import BasePermission


class IsAdminOrIsSelf(BasePermission):
    def has_object_permission(self, request, view, obj):
        return (
            getattr(obj, "user", obj) == request.user
            or request.user.is_staff
            or request.user.is_superuser
        )
