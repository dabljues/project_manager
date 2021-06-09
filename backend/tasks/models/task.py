from django.db import models
from projects.models import Project

from .task_base import TaskBase
from .utils import TASK_TYPES


class Task(TaskBase):
    TYPE_CHOICES = TASK_TYPES

    type = models.CharField("Type", max_length=1, default="T", choices=TYPE_CHOICES)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
