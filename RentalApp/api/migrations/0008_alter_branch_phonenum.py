# Generated by Django 4.1.1 on 2022-10-09 22:35

from django.db import migrations
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_alter_branch_branchid_alter_car_branch_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='branch',
            name='PhoneNum',
            field=phonenumber_field.modelfields.PhoneNumberField(max_length=128, region='CA'),
        ),
    ]
