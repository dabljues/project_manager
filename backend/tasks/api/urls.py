from django.urls import include, path
from rest_framework.routers import DefaultRouter
from tasks.api import views

router = DefaultRouter()
router.register(r"subtask", views.SubTaskViewSet, basename="SubTask")
router.register(r"task", views.TaskViewSet, basename="Task")

urlpatterns = [
    path("", include(router.urls)),
]
