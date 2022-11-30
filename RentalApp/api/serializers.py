from rest_framework import serializers
from .models import *

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ('CarID', 'Manufacturer', 'Model', 'FuelType', 'Colour', 'LicensePlate', 'Status', 'Mileage', 'Branch', 'Type')


class CarTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarType
        fields = ('TypeID', 'Description', 'DailyCost', 'WeeklyCost', 'MonthlyCost', 'LateFee', 'DiffBranchFee')

class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ('BranchID', 'PhoneNum', 'Province', 'City', 'PostalCode', 'StreetNumber', 'StreetName', 'UnitNumber')

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('ID', 'FirstName', 'LastName', 'Email', 'PhoneNum', 'Password', 'Salary', 'Rank', 'DOB', 'Province', 'City', 'PostalCode', 'StreetNumber', 'StreetName', 'UnitNumber', 'WorksAt')

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('ID', 'FirstName', 'LastName', 'DriversLicense', 'Email', 'PhoneNum', 'DOB', 'GoldMember', 'Province', 'City', 'PostalCode', 'StreetNumber', 'StreetName', 'UnitNumber', 'Banned')

class RentalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rental
        fields = ('RentalID', 'DateFrom', 'DateTo', 'DateReturned', 'TotalCost', 'LicensePlate', 'GoldMember', 'Customer', 'Employee', 'BranchFrom', 'BranchTo', 'Car', 'CarType')