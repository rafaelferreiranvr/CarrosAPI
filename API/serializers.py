from rest_framework import serializers
from .models import Car, Photo

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ['id', 'Extension', 'Base64']

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ['id', 'Name', 'Status', 'Photo']
