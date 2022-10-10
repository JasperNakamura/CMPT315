from django.shortcuts import render
from rest_framework import generics, viewsets
from .serializers import *
from .models import *

# Create your views here.

class CarView(viewsets.ModelViewSet):
    serializer_class = CarSerializer
    queryset = Car.objects.all()

class CarTypeView(viewsets.ModelViewSet):
    serializer_class = CarTypeSerializer
    queryset = CarType.objects.all()

class BranchView(viewsets.ModelViewSet):
    serializer_class = BranchSerializer
    queryset = Branch.objects.all()

class EmployeeView(viewsets.ModelViewSet):
    serializer_class = EmployeeSerializer
    queryset = Employee.objects.all()

class CustomerView(viewsets.ModelViewSet):
    serializer_class = CustomerSerializer
    queryset = Customer.objects.all()

class RentalView(viewsets.ModelViewSet):
    serializer_class = RentalSerializer
    queryset = Rental.objects.all()