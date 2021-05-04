from django.db import models
from django.utils import timezone
from users.models import User

from .utils import TASK_STATUSES


class TaskBase(models.Model):
    status = models.CharField("State", max_length=2, default="NW", choices=TASK_STATUSES)
    title = models.CharField("Title", max_length=100)
    description = models.CharField("Description", max_length=2000, default="")
    creator = models.ForeignKey(User, on_delete=models.CASCADE)

    created_at = models.DateTimeField(default=timezone.now)
    last_updated = models.DateTimeField(default=timezone.now)