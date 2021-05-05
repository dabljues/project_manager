from rest_framework import viewsets
from users.api.serializers import UserSerializer
from users.models import User
from rest_framework.decorators import action
from rest_framework.response import Response


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=["get"])
    def current(self, request, *args, **kwargs):
        return Response(self.get_serializer(request.user).data)
