from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Car, Photo
from .serializers import CarSerializer, PhotoSerializer

class CarViewSet(viewsets.ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer

    def list(self, request):
        cars = self.get_queryset()
        serializer = self.get_serializer(cars, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        car = self.get_object()
        serializer = self.get_serializer(car)
        return Response(serializer.data)

    def update(self, request, pk=None):
        car = self.get_object()
        serializer = self.get_serializer(car, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        car = self.get_object()
        car.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class PhotoViewSet(viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer

    def retrieve(self, request, pk=None):
        photo = self.get_object()
        serializer = self.get_serializer(photo)
        return Response(serializer.data)

    list = create = partial_update = destroy = \
        lambda self, request, *args, **kwargs: Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
