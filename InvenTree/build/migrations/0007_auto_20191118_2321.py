# Generated by Django 2.2.5 on 2019-11-18 23:21

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('build', '0006_auto_20190913_1407'),
    ]

    operations = [
        migrations.AlterField(
            model_name='builditem',
            name='quantity',
            field=models.DecimalField(decimal_places=5, default=1, help_text='Stock quantity to allocate to build', max_digits=15, validators=[django.core.validators.MinValueValidator(1)]),
        ),
    ]
