from django.shortcuts import render
from rest_framework import generics, viewsets
from .serializers import *
from .models import *
from datetime import datetime
from django_filters import rest_framework as filters
from django.db.models import Q

# Create your views here.
class AvailableCarFilterSet(filters.FilterSet):
    available = filters.CharFilter(method='get_available',)

    def get_available(self, queryset, field_name, value):
        dates = value.split(",")
        dFrom = datetime.strptime(dates[0], '%Y-%m-%d').date()
        dTo = datetime.strptime(dates[1], '%Y-%m-%d').date()
        if value:
            return queryset.filter(~Q(CarID__in=Rental.objects.values_list('Car', flat=True).filter(Q(Q(DateFrom__lte=dFrom) & Q(DateTo__gte=dFrom)) | Q(Q(DateFrom__lte=dTo) & Q(DateTo__gte=dTo)) | Q(Q(DateFrom__gte=dFrom) & Q(DateTo__lte=dTo)))))
        return queryset
    
class CarView(viewsets.ModelViewSet):
    serializer_class = CarSerializer
    queryset = Car.objects.all()
    filterset_class = AvailableCarFilterSet

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