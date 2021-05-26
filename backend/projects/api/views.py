from rest_framework import viewsets, permissions
from projects.models import Project
from projects.api.serializers import (
    ReadProjectSerializer,
    WriteProjectSerializer,
)
from utils.viewsets import ReadWriteViewset


class ProjectViewSet(ReadWriteViewset, viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ReadProjectSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = "name"

    read_serializer_class = ReadProjectSerializer
    write_serializer_class = WriteProjectSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Project.objects.all()
        else:
            return Project.objects.filter(owner=self.request.user.id)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user, participants=[self.request.user])
