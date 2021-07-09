from django.core import validators
from django.db import models
from django.core.validators import MinLengthValidator
from django.utils import timezone
from users.models import User

from .utils import TASK_STATUSES


class TaskBase(models.Model):
    STATUS_CHOICES = TASK_STATUSES

    name = models.CharField("Name", max_length=12, unique=True, blank=True)
    status = models.CharField("State", max_length=2, default="NW", choices=STATUS_CHOICES)
    title = models.CharField(
        "Title", max_length=100, validators=[MinLengthValidator(10, "Title's too short")]
    )
    description = models.CharField("Description", max_length=2000, default="")

    creator = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name="%(app_label)s_%(class)s_creator"
    )
    assignee = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name="%(app_label)s_%(class)s_assignee"
    )

    created_at = models.DateTimeField(default=timezone.now)
    last_updated = models.DateTimeField(default=timezone.now)

    class Meta:
        abstract = True
