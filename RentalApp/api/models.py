from email.policy import default
from pyexpat import model
from unittest.util import _MAX_LENGTH
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

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
    TypeID = models.AutoField(primary_key=True)
    Description = models.CharField(max_length=100)
    DailyCost = models.FloatField()
    WeeklyCost = models.FloatField()
    MonthlyCost = models.FloatField()
    LateFee = models.FloatField()
    DiffBranchFee = models.FloatField()

class Branch(models.Model):
    BranchID = models.AutoField(primary_key=True)
    PhoneNum = PhoneNumberField(region="CA")
    Province = models.CharField(max_length=25)
    City = models.CharField(max_length=25)
    PostalCode = models.CharField(max_length=6)
    StreetNumber = models.PositiveSmallIntegerField()
    StreetName = models.CharField(max_length=15)
    UnitNumber = models.PositiveSmallIntegerField(blank=True)

class Employee(models.Model):
    ID = models.AutoField(primary_key=True)
    FirstName = models.CharField(max_length=50)
    LastName = models.CharField(max_length=50)
    Email = models.EmailField()
    PhoneNum = PhoneNumberField()
    Password = models.CharField(max_length=50)
    Salary = models.FloatField()
    Rank = models.CharField(max_length=15)
    DOB = models.DateField()
    Province = models.CharField(max_length=25)
    City = models.CharField(max_length=25)
    PostalCode = models.CharField(max_length=6)
    StreetNumber = models.PositiveSmallIntegerField()
    StreetName = models.CharField(max_length=15)
    UnitNumber = models.PositiveSmallIntegerField(blank=True, null = True)
    WorksAt = models.ForeignKey('Branch', on_delete=models.CASCADE)

class Customer(models.Model):
    ID = models.AutoField(primary_key=True)
    FirstName = models.CharField(max_length=50)
    LastName = models.CharField(max_length=50)
    DriversLicense = models.PositiveIntegerField()
    Email = models.EmailField()
    PhoneNum = PhoneNumberField()
    DOB = models.DateField()
    GoldMember = models.BooleanField(default=False)
    Province = models.CharField(max_length=25)
    City = models.CharField(max_length=25)
    PostalCode = models.CharField(max_length=6)
    StreetNumber = models.PositiveSmallIntegerField()
    StreetName = models.CharField(max_length=15)
    UnitNumber = models.PositiveSmallIntegerField(blank=True, null = True)

class Rental(models.Model):
    RentalID = models.AutoField(primary_key=True)
    DateFrom = models.DateField()
    DateTo = models.DateField()
    DateReturned = models.DateField(blank = True, null = True)
    TotalCost = models.FloatField()
    LicensePlate = models.CharField(max_length=8)
    GoldMember = models.BooleanField()
    Customer = models.ForeignKey('Customer', on_delete=models.CASCADE)
    Employee = models.ForeignKey('Employee', on_delete=models.PROTECT)
    BranchFrom = models.ForeignKey('Branch', on_delete=models.CASCADE, related_name = 'ComesFrom')
    BranchTo = models.ForeignKey('Branch', on_delete=models.CASCADE, related_name = 'GoesTo')
    Car = models.ForeignKey('Car', on_delete=models.CASCADE)
    CarType = models.ForeignKey('CarType', on_delete=models.CASCADE)