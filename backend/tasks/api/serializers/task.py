from projects.api.serializers import ProjectNameSerializer
from rest_framework import serializers
from tasks.models import Task
from users.api.serializers import UserSerializer


class TaskNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ["id", "name"]


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"


class WriteTaskSerializer(TaskSerializer):
    def validate(self, data):
        project = data["project"]
        parent = data["parent"]

        if parent.project.id != project.id:
            raise serializers.ValidationError(
                {
                    "project_id": f"Project ID ({project.id}) doesn't match parent's project ID ({parent.project.id})",
                }
            )

        return data


class ReadTaskSerializer(TaskSerializer):

    parent = TaskNameSerializer()
    status = serializers.CharField(source="get_status_display")
    type = serializers.CharField(source="get_type_display")
    owner = UserSerializer()
    assignee = UserSerializer()
    project = ProjectNameSerializer()
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
