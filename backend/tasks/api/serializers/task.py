from rest_framework import serializers
from tasks.models import Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"

    status = serializers.CharField(source="get_status_display", required=False)
