from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from users.api.serializers import UserSerializer
from users.models import User


class NotSafeMethodAndAllowAny(permissions.AllowAny):
    def has_permission(self, request, view):
        return (
            view.action
            not in [
                "update",
                "partial_update",
                "destroy",
            ]
            and super(NotSafeMethodAndAllowAny, self).has_permission(request, view)
        )


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [NotSafeMethodAndAllowAny | permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return User.objects.all()
        else:
            return User.objects.filter(id=self.request.user.id)

    @action(detail=False, methods=["get"])
    def current(self, request, *args, **kwargs):
        return Response(self.get_serializer(request.user).data)
