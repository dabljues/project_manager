from django.db import models
from projects.models import Project

from .task_base import TaskBase
from .utils import TASK_TYPES


class Task(TaskBase):
    TYPE_CHOICES = TASK_TYPES

    parent = models.ForeignKey(
        "self", on_delete=models.SET_NULL, null=True, related_name="%(app_label)s_%(class)s_parent"
    )
    type = models.CharField("Type", max_length=1, default="T", choices=TYPE_CHOICES)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
