from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Car, Photo
from .serializers import CarSerializer, PhotoSerializer
from django.contrib.auth.models import User
from Auth import authentications

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

        try:
            car = Car.objects.get(pk=pk)
        except Car.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(car, data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        return Response(status=status.HTTP_200_OK)
        
    def destroy(self, request, pk=None):
        if not request.user.is_authenticated or type(request.user) != User:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        car = self.get_object()
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

        if(not model.Upload(serializer.validated_data['Extension'], serializer.validated_data['Base64'])):
            return Response({'error': 'Invalid base64'}, status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None):
        if not request.user.is_authenticated or type(request.user) != User:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        try:
            photo = Photo.objects.get(pk=pk)
        except Photo.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(photo.Download(), status=status.HTTP_200_OK)

    list = partial_update = destroy = \
        lambda self, request, *args, **kwargs: Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
