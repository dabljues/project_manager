from rest_framework import serializers
from rest_framework import fields


class AvatarSerializer(serializers.Serializer):
    avatar = fields.ImageField()

    def create(self, validated_data):
        user = self.context["user"]
        user.avatar = validated_data.pop("avatar")
        user.save()
        return user
