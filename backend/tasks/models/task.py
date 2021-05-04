from django.db import models

from .task_base import TaskBase
from .utils import TASK_TYPES


class Task(TaskBase):
    type = models.CharField("Type", max_length=1, default="T", choices=TASK_TYPES)
