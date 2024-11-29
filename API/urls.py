from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'car', views.CarViewSet, basename='car')
router.register(r'photo', views.PhotoViewSet, basename='photo')

urlpatterns = [
    path('', include(router.urls)),
    path('photo/render/<int:pk>/', views.PhotoRenderView.as_view(), name='photo-render'),
]
