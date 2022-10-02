from pyexpat import model
from unittest.util import _MAX_LENGTH
from django.db import models

# Create your models here.

class Car(models.Model):
    CarID = models.AutoField(primary_key=True)
    Manufacturer = models.CharField(max_length=50)
    Model = models.CharField(max_length=50)
    FuelType = models.CharField(max_length=25)
    Colour = models.CharField(max_length=25)
    LicencePlate = models.CharField(max_length=12)
    Status = models.BooleanField(default = False)
    Mileage = models.PositiveIntegerField()
    Branch = models.ForeignKey('Branch', on_delete=models.PROTECT)
    Type = models.ForeignKey('CarType', on_delete=models.CASCADE)

class CarType(models.Model):
    pass

class Branch(models.Model):
    pass
