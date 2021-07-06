from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from users.api.serializers import AvatarSerializer, PasswordSerializer, UserSerializer
from users.models import User


class RegisterPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return view.action == "create"


class OnlyModifyYourselfPermission(permissions.BasePermission):
    message = "You cannot modify another user."

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        if not request.user.id or not view.kwargs.get("pk"):
            return True
        if int(request.user.id) != int(view.kwargs["pk"]):
            return False
        return True


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [
        RegisterPermission | permissions.IsAuthenticated,
        OnlyModifyYourselfPermission,
    ]

    @action(detail=False, methods=["get"])
    def current(self, request, *args, **kwargs):
        return Response(self.get_serializer(request.user).data)

    @action(detail=True, methods=["post"])
    def change_password(self, request, pk):
        user = self.get_object()
        serializer = PasswordSerializer(data=request.data, context={"user": user})
        if serializer.is_valid(raise_exception=True):
            user.set_password(serializer.data["password"])
            user.save()
            return Response("Password has been changed")

    @action(detail=True, methods=["post"])
    def change_avatar(self, request, pk):
        user = self.get_object()
        serializer = AvatarSerializer(data=request.data, context={"user": user})
        print(request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response("Avatar has been changed")
