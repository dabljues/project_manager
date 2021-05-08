from django.urls import path, include
from rest_framework.routers import DefaultRouter
from projects.api import views

router = DefaultRouter()
router.register(r"project", views.ProjectViewSet, basename="Project")

urlpatterns = [
    path("", include(router.urls)),
]
