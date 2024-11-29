from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Car, Photo
from .serializers import CarSerializer, PhotoSerializer
from django.contrib.auth.models import User
from Auth import authentications
from functools import partial

class CarViewSet(viewsets.ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    authentication_classes = [authentications.UserTokenAuthentication,]

    def list(self, request):
        if not request.user.is_authenticated or type(request.user) != User:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        cars = self.get_queryset()
        serializer = self.get_serializer(cars, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        if not request.user.is_authenticated or type(request.user) != User:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        base64 = request.data.get("Base64")
        if base64:
            photo = Photo.objects.create(Base64=base64)
            serializer.validated_data['Photo'] = photo
        else:
            serializer.validated_data['Photo'] = None

        serializer.save()
        return Response(status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None):
        if not request.user.is_authenticated or type(request.user) != User:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        try:
            car = Car.objects.get(pk=pk)
        except Car.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(car)
        return Response(serializer.data)

    def update(self, request, pk=None):
        if not request.user.is_authenticated or type(request.user) != User:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        if not self.get_serializer(data=request.data).is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        try:
            car = Car.objects.get(pk=pk)
        except Car.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        car.Name = request.data.get("Name")
        car.Status = request.data.get("Status")

        base64 = request.data.get("Base64")
        if base64:
            if car.Photo:
                car.Photo.Base64 = base64
                car.Photo.save()
            else:
                photo = Photo.objects.create(Base64=base64)
                car.Photo = photo
        elif request.data.get("Photo") is None:
            if car.Photo:
                car.Photo.delete()
                car.Photo = None
        
        car.save()

        return Response(status=status.HTTP_200_OK)
        
    def destroy(self, request, pk=None):
        if not request.user.is_authenticated or type(request.user) != User:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        try:
            car = Car.objects.get(pk=pk)
        except Car.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if car.Photo:
            car.Photo.delete()

        car.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class PhotoViewSet(viewsets.ModelViewSet):
    model = Photo
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    authentication_classes = [authentications.UserTokenAuthentication,]

    def create(self, request):
        if not request.user.is_authenticated or type(request.user) != User:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        return Response(status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None):
        if not request.user.is_authenticated or type(request.user) != User:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        try:
            photo = Photo.objects.get(pk=pk)
        except Photo.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response({"Base64": photo.Base64}, status=status.HTTP_200_OK) #" photo.Base64, status=status.HTTP_200_OK)

    list = partial_update = destroy = \
        lambda self, request, *args, **kwargs: Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
