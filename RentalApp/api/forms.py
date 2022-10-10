from django import forms

from RentalApp.api.models import Employee

class EmployeeForm(forms.ModelForm):
    class Meta:
        model = Employee
        widgets = {'Password' : forms.PasswordInput(),}