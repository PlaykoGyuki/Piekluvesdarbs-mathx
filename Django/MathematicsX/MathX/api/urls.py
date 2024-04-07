from django.urls import path
from .views import calculate_roots

urlpatterns = [
    path('calculate_roots/', calculate_roots, name='calculate_roots'),
]