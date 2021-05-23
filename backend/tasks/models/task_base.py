from django.db import models
from django.utils import timezone
from users.models import User

from .utils import TASK_STATUSES


class TaskBase(models.Model):
    name = models.CharField("Name", max_length=12, unique=True)
    status = models.CharField("State", max_length=2, default="NW", choices=TASK_STATUSES)
    title = models.CharField("Title", max_length=100)
    description = models.CharField("Description", max_length=2000, default="")
    creator = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name="%(app_label)s_%(class)s_creator"
    )
    asignee = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name="%(app_label)s_%(class)s_asignee"
    )

    created_at = models.DateTimeField(default=timezone.now)
    last_updated = models.DateTimeField(default=timezone.now)

    class Meta:
        abstract = True
