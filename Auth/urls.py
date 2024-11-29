from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'signup', views.SignupViewSet, basename='signup')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', views.UserLoginApiView.as_view(), name='login'),
    path('logout/', views.UserLogoutApiView.as_view(), name='logout'),
]
