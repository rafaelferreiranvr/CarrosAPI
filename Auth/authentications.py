from rest_framework.authentication import TokenAuthentication, get_authorization_header
from rest_framework.exceptions import AuthenticationFailed
from .models import UserToken
from .settings import AUTH_TOKEN_LIFETIME

class UserTokenAuthentication(TokenAuthentication):

    """Essa classe expande a classe TokenAuthentication adicionando a funcionalidade de expiração
    e corrige suas falhas de segurança onde o usuário é capaz de acessar a api sem prover nenhum token, 
    usando formatos de token invalidos ou com keywords incompativeis."""

    model = UserToken

    def authenticate(self, request):
        auth = get_authorization_header(request).split()

        super().authenticate(request)

        if not auth:
            raise AuthenticationFailed('No authentication provided.')

        if len(auth) != 2:
            raise AuthenticationFailed('Invalid token header. Token string should be two parts.')

        if auth[0].lower() != self.keyword.lower().encode():
            raise AuthenticationFailed('Invalid token header. Unexpected authentication keyword provided.')

        try:
            token = auth[1].decode()
        except UnicodeError:
            raise AuthenticationFailed('Invalid token header. Token string should not contain invalid characters.')

        return self.authenticate_credentials(token) 

    def authenticate_credentials(self, key):

        super().authenticate_credentials(key)

        model = self.get_model()

        try:
            token: UserToken = model.objects.select_related('user').get(key=key)
        except model.DoesNotExist:
            raise AuthenticationFailed('Invalid token.')

        if token.is_expired():
            token.delete()
            raise AuthenticationFailed('Expired token.')
        else:
            token.refresh_lifetime(AUTH_TOKEN_LIFETIME - token.get_remaining_life())

        if not token.user.is_active:
            raise AuthenticationFailed('User inactive or deleted.')

        return (token.user, token)