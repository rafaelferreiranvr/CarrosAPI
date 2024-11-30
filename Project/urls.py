from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView
from API.schema import schema
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from Auth.authentications import UserTokenAuthentication
from django.http import JsonResponse
import json

class AuthenticatedGraphQLView(GraphQLView):
    def parse_body(self, request):
        try:
            if isinstance(request.body, bytes):
                return json.loads(request.body.decode("utf-8"))
            return request.body
        except json.JSONDecodeError:
            return {}

    def dispatch(self, request, *args, **kwargs):
        auth = UserTokenAuthentication()
        try:
            user_auth = auth.authenticate(request)
            if user_auth is None:
                return JsonResponse({
                    'errors': [{
                        'message': 'Authentication required',
                        'locations': None,
                        'path': None
                    }]
                }, status=401)
            
            request.user = user_auth[0]
            return super().dispatch(request, *args, **kwargs)
        except Exception as e:
            return JsonResponse({
                'errors': [{
                    'message': str(e),
                    'locations': None,
                    'path': None
                }]
            }, status=401)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('Auth.urls')),
    path('api/car/search/', csrf_exempt(AuthenticatedGraphQLView.as_view(graphiql=True, schema=schema))),
    path('api/', include('API.urls')),
    path('', include('Application.urls')),
] + static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])
