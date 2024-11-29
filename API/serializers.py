from rest_framework import serializers
from .models import Car, Photo

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ['id', 'Base64']

class CarSerializer(serializers.ModelSerializer):
    Base64 = serializers.SerializerMethodField(required=False, read_only=True)

    def get_Base64(self, obj):
        if obj.Photo:
            return obj.Photo.Base64
        return None

    class Meta:
        model = Car
        fields = ['id', 'Name', 'Status', 'Photo', 'Base64']
