from django.shortcuts import render
from rest_framework import generics, viewsets
from .serializers import *
from .models import *

# Create your views here.

class CarView(viewsets.ModelViewSet):
    serializer_class = CarSerializer
    queryset = Car.objects.all()