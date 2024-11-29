from django.urls import path
from django.views.generic import TemplateView
from django.conf import settings
from django.views.static import serve
from django.http import HttpResponseNotFound
import os

def serve_view(request, view_name):
    # Try both original and capitalized view name
    view_paths = [
        os.path.join(settings.BASE_DIR, 'Application', 'Views', view_name, f'{view_name}.html'),
        os.path.join(settings.BASE_DIR, 'Application', 'Views', view_name.capitalize(), f'{view_name.capitalize()}.html')
    ]
    
    for view_path in view_paths:
        if os.path.exists(view_path):
            template_name = os.path.relpath(view_path, os.path.join(settings.BASE_DIR, 'Application'))
            return TemplateView.as_view(template_name=template_name)(request)
    
    return HttpResponseNotFound('View not found')

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html'), name='index'),
    path('views/<str:view_name>/', serve_view, name='serve_view'),
]
