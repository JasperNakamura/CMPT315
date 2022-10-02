from rest_framework import serializers
from .models import *

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ('CarID', 'Manufacturer', 'Model', 'FuelType', 'Colour', 'LicencePlate', 'Status', 'Mileage', 'Branch', 'Type')