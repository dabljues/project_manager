from django.db import models

from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    username = None
    email = models.EmailField("Email Address", unique=True)
    avatar = models.ImageField(upload_to="avatars", default="avatars/no_avatar.png")
    first_name = models.CharField("First name", max_length=50)
    last_name = models.CharField("Last name", max_length=50)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name", "password"]
