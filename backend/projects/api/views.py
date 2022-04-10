from projects.api.serializers import ReadProjectSerializer, WriteProjectSerializer
from projects.models import Project
from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from tasks.api.serializers import ReadTaskSerializer
from tasks.models import Task
from utils.viewsets import ReadWriteViewset
from django.db.models import Q

from collections import defaultdict


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

    def get_tasks(self, status=None, status_not=None):
        project = self.get_object()
        project_tasks = Task.objects.filter(project=project)
        if status is not None:
            project_tasks = project_tasks.filter(status=status)

        if status_not is not None:
            project_tasks = project_tasks.filter(~Q(status=status_not))

        task_serializer = ReadTaskSerializer(project_tasks, many=True)

        return task_serializer.data

    @action(detail=True, methods=["get"])
    def tasks(self, *args, **kwargs):
        return Response(self.get_tasks())

    @action(detail=True, methods=["get"])
    def backlog(self, *args, **kwargs):
        return Response(self.get_tasks(status="NW"))

    @action(detail=True, methods=["get"])
    def kanban(self, *args, **kwargs):
        tasks = self.get_tasks(status_not="NW")
        user_tasks = defaultdict(list)
        for task in tasks:
            assignee = task["assignee"]
            if not assignee:
                continue
            assignee_id = assignee["id"]
            user_tasks[assignee_id].append(task)
        return Response(user_tasks)
