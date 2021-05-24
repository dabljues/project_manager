from django.db import models
from projects.models import Project

from .task_base import TaskBase
from .utils import TASK_TYPES


class Task(TaskBase):
    type = models.CharField("Type", max_length=1, default="T", choices=TASK_TYPES)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
