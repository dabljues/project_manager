from projects.api.serializers import ReadProjectSerializer, WriteProjectSerializer
from projects.models import Project
from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from tasks.api.serializers import TaskSerializer
from tasks.models import Task
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

    def get_tasks(self, status=None):
        project = self.get_object()
        project_tasks = Task.objects.filter(project=project)
        if status is not None:
            project_tasks = project_tasks.filter(status=status)

        task_serializer = TaskSerializer(project_tasks, many=True)
        data = task_serializer.data

        return Response(data)

    @action(detail=True, methods=["get"])
    def tasks(self, *args, **kwargs):
        return self.get_tasks()

    @action(detail=True, methods=["get"])
    def backlog(self, *args, **kwargs):
        return self.get_tasks("NW")
