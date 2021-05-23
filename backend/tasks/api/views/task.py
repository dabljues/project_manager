from rest_framework import viewsets
from tasks.api.serializers import TaskSerializer
from tasks.models import Task
from projects.models import Project


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def perform_create(self, serializer):
        project_id = self.request.data["project"]
        project = Project.objects.get(id=project_id)
        project_tasks = Task.objects.filter(project=project_id)
        if not project_tasks:
            task_id = 1
        else:
            latest_task_name = project_tasks.last().name
            latest_task_id_in_project = int(latest_task_name.split("-")[-1])
            task_id = latest_task_id_in_project + 1
        task_name = f"{project.name}-{task_id}"

        serializer.save(name=task_name)
