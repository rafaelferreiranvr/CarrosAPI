from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from . import models, serializers
from datetime import timedelta
from django.utils import timezone
from .settings import AUTH_TOKEN_LIFETIME
from . import authentications

class SignupViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.UserSerializer
    queryset = User.objects.all()

    def create(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        
        if User.objects.filter(username=username).exists():
            return Response({'error': 'usernameExists'}, status=status.HTTP_400_BAD_REQUEST)
            
        if User.objects.filter(email=email).exists():
            return Response({'error': 'userEmailExists'}, status=status.HTTP_400_BAD_REQUEST)

        response = super().create(request)
        if response.status_code == status.HTTP_201_CREATED:
            user = User.objects.get(id=response.data['id'])
            token, created = models.UserToken.objects.get_or_create(user=user)
            token.set_expiration_date(timezone.now() + AUTH_TOKEN_LIFETIME)
            token.save()
            
            data = response.data
            data['token'] = token.key
            return Response(data, status=status.HTTP_201_CREATED)

        return response
    
    list = retrieve = update = partial_update = destroy = \
        lambda self, request, *args, **kwargs: Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

class UserLoginApiView(APIView):
    token_model = models.UserToken
    serializer_class = serializers.LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'userNotFound'}, status=status.HTTP_400_BAD_REQUEST)

        if not user.check_password(password):
            return Response({'error': 'invalidPassword'}, status=status.HTTP_400_BAD_REQUEST)

        token, created = self.token_model.objects.get_or_create(user=user)
        token.set_expiration_date(timezone.now() + AUTH_TOKEN_LIFETIME)

        return Response({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'token': token.key,
        }, status=status.HTTP_200_OK)

class UserLogoutApiView(APIView):
    token_model = models.UserToken
    authentication_classes = [authentications.UserTokenAuthentication,]

    def post(self, request):
        if not request.user.is_authenticated or type(request.user) != User:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        token = self.token_model.objects.get(user=request.user)
        token.revoke()
        return Response({'message': 'Logout realizado com sucesso'}, status=status.HTTP_200_OK)