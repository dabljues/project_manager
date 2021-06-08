from rest_framework import serializers
from tasks.models import Task
from users.api.serializers import UserSerializer


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"

    status = serializers.CharField(source="get_status_display", required=False)
    type = serializers.CharField(source="get_type_display", required=False)


class WriteTaskSerializer(TaskSerializer):
    pass


class ReadTaskSerializer(TaskSerializer):

    creator = UserSerializer()
    assignee = UserSerializer()
