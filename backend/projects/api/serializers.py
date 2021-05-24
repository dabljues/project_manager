from rest_framework import serializers
from projects.models import Project
from users.api.serializers import UserSerializer


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"

    status = serializers.CharField(source="get_status_display", required=False)
    owner = UserSerializer(read_only=True)
    participants = UserSerializer(many=True, read_only=True)
