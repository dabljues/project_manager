from rest_framework import viewsets
from tasks.api.serializers import SubTaskSerializer
from tasks.models import SubTask, Task

from .utils import generate_task_id


class SubTaskViewSet(viewsets.ModelViewSet):
    queryset = SubTask.objects.all()
    serializer_class = SubTaskSerializer

    def perform_create(self, serializer):
        task_id = self.request.data["parent_task"]
        project = Task.objects.get(id=task_id).project

        project_tasks = Task.objects.filter(project=project)
        project_subtasks = SubTask.objects.filter(project=project)

        new_sub_task_id = generate_task_id(project_tasks, project_subtasks)
        sub_task_name = f"{project.name}-{new_sub_task_id}"

        serializer.save(name=sub_task_name, project=project)
