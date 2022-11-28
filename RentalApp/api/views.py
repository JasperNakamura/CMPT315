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
    Type = filters.CharFilter(method='typeFilter')
    Colour = filters.CharFilter(method="colourFilter")
    Manufacturer = filters.CharFilter(method='manufacturerFilter')
    FuelType = filters.CharFilter(method="fuelTypeFilter")

    def get_available(self, queryset, field_name, value):
        dates = value.split(",")
        dFrom = datetime.strptime(dates[0], '%Y-%m-%d').date()
        dTo = datetime.strptime(dates[1], '%Y-%m-%d').date()
        if value:
            return queryset.filter(~Q(CarID__in=Rental.objects.values_list('Car', flat=True).filter(Q(Q(DateFrom__lte=dFrom) & Q(DateTo__gte=dFrom)) | Q(Q(DateFrom__lte=dTo) & Q(DateTo__gte=dTo)) | Q(Q(DateFrom__gte=dFrom) & Q(DateTo__lte=dTo)))))
        return queryset

    def typeFilter(self, queryset, field_name, value):
        if value:
            values = value.split(",")
            queryset = queryset.filter(Type__in=CarType.objects.values_list('TypeID', flat=True).filter(Description__in=values)).order_by('CarID')
            return queryset
        return queryset

    def colourFilter(self, queryset, field_name, value):
        if value:
            values = value.split(",")
            queryset = queryset.filter(Colour__in=values)
            return queryset
        return queryset

    def manufacturerFilter(self, queryset, field_name, value):
        if value:
            values = value.split(",")
            queryset = queryset.filter(Manufacturer__in=values)
            return queryset
        return queryset 

    def fuelTypeFilter(self, queryset, field_name, value):
        if value:
            values = value.split(",")
            queryset = queryset.filter(FuelType__in=values)
            return queryset
        return queryset 
    

    class Meta:
        model = Car
        fields = ('CarID', 'Manufacturer', 'Model', 'FuelType', 'Colour', 'LicensePlate', 'Status', 'Mileage', 'Branch', 'Type')

class CarView(viewsets.ModelViewSet):
    serializer_class = CarSerializer
    queryset = Car.objects.all()
    filterset_class = AvailableCarFilterSet

class CarTypeFilter(filters.FilterSet):
    class Meta:
        model = CarType
        fields = ('TypeID', 'Description', 'DailyCost', 'WeeklyCost', 'MonthlyCost', 'LateFee', 'DiffBranchFee')

class CarTypeView(viewsets.ModelViewSet):
    serializer_class = CarTypeSerializer
    queryset = CarType.objects.all()
    filterset_class = CarTypeFilter

class BranchFilter(filters.FilterSet):
    class Meta:
        model = Branch
        fields = ('BranchID', 'PhoneNum', 'Province', 'City', 'PostalCode', 'StreetNumber', 'StreetName', 'UnitNumber')

class BranchView(viewsets.ModelViewSet):
    serializer_class = BranchSerializer
    queryset = Branch.objects.all()
    filterset_class = BranchFilter

class EmployeeFilter(filters.FilterSet):
    class Meta:
        model = Employee
        fields = ('ID', 'FirstName', 'LastName', 'Email', 'PhoneNum', 'Password', 'Salary', 'Rank', 'DOB', 'Province', 'City', 'PostalCode', 'StreetNumber', 'StreetName', 'UnitNumber', 'WorksAt')

class EmployeeView(viewsets.ModelViewSet):
    serializer_class = EmployeeSerializer
    queryset = Employee.objects.all()
    filterset_class = EmployeeFilter

class CustomerInfoFilter(filters.FilterSet):
    class Meta:
        model = Customer
        fields = ('ID', 'FirstName', 'LastName', 'DriversLicense', 'Email', 'PhoneNum', 'DOB', 'GoldMember', 'Province', 'City', 'PostalCode', 'StreetNumber', 'StreetName', 'UnitNumber')

class CustomerView(viewsets.ModelViewSet):
    serializer_class = CustomerSerializer
    queryset = Customer.objects.all()
    filterset_class = CustomerInfoFilter

class RentalsFilter(filters.FilterSet):
    class Meta:
        model = Rental
        fields = ('RentalID', 'DateFrom', 'DateTo', 'DateReturned', 'TotalCost', 'LicensePlate', 'GoldMember', 'Customer', 'Employee', 'BranchFrom', 'BranchTo', 'Car', 'CarType')

class RentalView(viewsets.ModelViewSet):
    serializer_class = RentalSerializer
    queryset = Rental.objects.all()
    filterset_class = RentalsFilter