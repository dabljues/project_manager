from django.db import models

from .task_base import TaskBase
from .utils import SUB_TASK_TYPES
from .task import Task


class SubTask(TaskBase):
    type = models.CharField("Type", max_length=1, default="S", choices=SUB_TASK_TYPES)
    parent_task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name="parent_task")
