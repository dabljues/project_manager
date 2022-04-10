from projects.models import Project
from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from tasks.api.serializers import ReadTaskSerializer, WriteTaskSerializer
from tasks.models import SubTask, Task

from utils.viewsets import ReadWriteViewset

from .utils import generate_task_id


class TaskViewSet(ReadWriteViewset, viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = ReadTaskSerializer
    lookup_field = "name"
    permission_classes = [permissions.IsAuthenticated]

    read_serializer_class = ReadTaskSerializer
    write_serializer_class = WriteTaskSerializer

    def perform_create(self, serializer):
        project_id = self.request.data["project"]
        project = Project.objects.get(id=project_id)

        project_tasks = Task.objects.filter(project=project)
        project_subtasks = SubTask.objects.filter(project=project)

        new_task_id = generate_task_id(project_tasks, project_subtasks)
        task_name = f"{project.name}-{new_task_id}"

        serializer.save(name=task_name)

    @action(detail=True, methods=["get"])
    def sub_tasks(self, *args, **kwargs):
        task = self.get_object()
        sub_tasks = Task.objects.filter(parent=task)

        task_serializer = ReadTaskSerializer(sub_tasks, many=True)

        return Response(task_serializer.data)
