from rest_framework import serializers
from tasks.models import SubTask


class SubTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubTask
        fields = "__all__"

    status = serializers.CharField(source="get_status_display", required=False)
