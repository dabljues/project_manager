from rest_framework import serializers
from tasks.models import Task
from users.api.serializers import UserSerializer


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"


class WriteTaskSerializer(TaskSerializer):
    status = serializers.ChoiceField(choices=Task.STATUS_CHOICES)
    type = serializers.ChoiceField(choices=Task.TYPE_CHOICES)


class ReadTaskSerializer(TaskSerializer):

    status = serializers.CharField(source="get_status_display")
    type = serializers.CharField(source="get_type_display")
    creator = UserSerializer()
    assignee = UserSerializer()
