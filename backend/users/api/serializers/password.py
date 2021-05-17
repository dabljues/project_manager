from rest_framework import serializers
import django.contrib.auth.password_validation as validators


class PasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField()
    password = serializers.CharField()
    password_confirmation = serializers.CharField()

    def validate(self, data):
        if data["password"] != data["password_confirmation"]:
            raise serializers.ValidationError(
                {
                    "password": "Passwords do not match",
                    "password_confirmation": "Passwords do not match",
                }
            )
        try:
            validators.validate_password(data["password"])
        except Exception as exc:
            raise serializers.ValidationError({"password": exc.messages})
        else:
            return data

    def validate_current_password(self, value: str):
        user = self.context["user"]
        if not user.check_password(value):
            raise serializers.ValidationError("Wrong current password")
        return value
