from django.db import models
from users.models import User


class Project(models.Model):
    name = models.CharField("Name", max_length=8, unique=True)
    status = models.CharField(
        "Status",
        max_length=1,
        choices=[("O", "Open"), ("C", "Closed")],
        default="O",
    )
    description = models.CharField("Description", max_length=3000, default="")

    creator = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name="project_creator"
    )
    participants = models.ManyToManyField(User, related_name="project_participants", blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
