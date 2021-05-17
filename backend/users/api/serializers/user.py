from users.models import User
from rest_framework import serializers

import django.contrib.auth.password_validation as validators


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "password", "email", "avatar"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

    def validate_password(self, value):
        try:
            validators.validate_password(value)
        except Exception as exc:
            raise serializers.ValidationError(str(exc))
        return value
