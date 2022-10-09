from rest_framework import serializers
from .models import *

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ('CarID', 'Manufacturer', 'Model', 'FuelType', 'Colour', 'LicencePlate', 'Status', 'Mileage', 'Branch', 'Type')


class CarTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarType
        fields = ('TypeID', 'Description', 'DailyCost', 'WeeklyCost', 'MonthlyCost', 'LateFee', 'DiffBranchFee')

class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ('BranchID', 'PhoneNum')
        