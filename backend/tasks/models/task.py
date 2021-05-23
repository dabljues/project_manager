from django.db import models

from .task_base import TaskBase
from .utils import TASK_TYPES
from users.models import User


class Task(TaskBase):
    type = models.CharField("Type", max_length=1, default="T", choices=TASK_TYPES)
