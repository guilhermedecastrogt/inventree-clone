# Generated by Django 3.0.7 on 2020-08-23 11:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('report', '0003_testreport_enabled'),
    ]

    operations = [
        migrations.RenameField(
            model_name='testreport',
            old_name='part_filters',
            new_name='filters',
        ),
    ]
