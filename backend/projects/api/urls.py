from django.urls import path, include
from rest_framework.routers import DefaultRouter
from projects.api import views

router = DefaultRouter()
router.register(r"snippets", views.ProjectViewSet)

urlpatterns = [
    path("project/", include(router.urls)),
]
