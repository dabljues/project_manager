from django.urls import path
from users.api.views import UserViewSet, UserCreate

urlpatterns = [path("login/", UserViewSet), path("register/", UserCreate.as_view())]
