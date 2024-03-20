# Generated by Django 2.2.10 on 2020-04-05 22:39

import InvenTree.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stock', '0023_auto_20200318_1027'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stockitem',
            name='URL',
            field=InvenTree.fields.InvenTreeURLField(blank=True, help_text='Link to external URL', max_length=125),
        ),
    ]
