from rest_framework import serializers
from projects.models import Project
from users.api.serializers import UserSerializer


class WriteProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"


class ReadProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"

    status = serializers.CharField(source="get_status_display", required=False)
    owner = UserSerializer()
    participants = UserSerializer(many=True)
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")


class ProjectNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ["id", "name"]
