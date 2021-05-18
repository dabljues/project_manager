from rest_framework import viewsets
from projects.models import Project
from projects.api.serializers import ProjectSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Project.objects.all()
        else:
            return Project.objects.filter(creator=self.request.user.id)

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)
