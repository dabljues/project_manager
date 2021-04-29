from django.urls import path
from users.api.views import UserViewSet

urlpatterns = [path("login/", UserViewSet)]
