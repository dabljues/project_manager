from django.urls import path, include
from rest_framework.routers import DefaultRouter
from users.api import views

router = DefaultRouter()
router.register(r"user", views.UserViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
