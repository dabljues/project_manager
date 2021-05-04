from django.urls import path
from users.api.views import UserCreate

urlpatterns = [
    path("register/", UserCreate.as_view()),
]
