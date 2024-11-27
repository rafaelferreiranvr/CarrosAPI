from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from . import models, serializers
from datetime import timedelta
from django.utils import timezone
from .settings import AUTH_TOKEN_LIFETIME

class SignupViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.UserSerializer
    queryset = User.objects.all()

    def create(self, request):
        response = super().create(request)
        return response
    
    list = retrieve = update = partial_update = destroy = \
        lambda self, request, *args, **kwargs: Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

class UserLoginApiView(APIView):
    token_model = models.UserToken
    serializer_class = serializers.LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():

            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = User.objects.get(email=email)

            if user:
                if user.check_password(password):

                    token, created = self.token_model.objects.get_or_create(user=user)
                    token.set_expiration_date(timezone.now() + AUTH_TOKEN_LIFETIME)

                    return Response({'token': token.key}, status=status.HTTP_200_OK)

            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)