# Generated by Django 3.2.5 on 2021-10-14 06:31

import re

from django.db import migrations

def build_refs(apps, schema_editor):
    """
    Rebuild the integer "reference fields" for existing Build objects
    """

    PurchaseOrder = apps.get_model('order', 'purchaseorder')

    for order in PurchaseOrder.objects.all():

        ref = 0

        result = re.match(r"^(\d+)", order.reference)

        if result and len(result.groups()) == 1:
            try:
                ref = int(result.groups()[0])
            except Exception:  # pragma: no cover
                ref = 0

        # Clip integer value to ensure it does not overflow database field
        if ref > 0x7fffffff:
            ref = 0x7fffffff

        order.reference_int = ref
        order.save()

    SalesOrder = apps.get_model('order', 'salesorder')

    for order in SalesOrder.objects.all():

        ref = 0

        result = re.match(r"^(\d+)", order.reference)

        if result and len(result.groups()) == 1:
            try:
                ref = int(result.groups()[0])
            except Exception:  # pragma: no cover
                ref = 0

        # Clip integer value to ensure it does not overflow database field
        if ref > 0x7fffffff:
            ref = 0x7fffffff

        order.reference_int = ref
        order.save()


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0051_auto_20211014_0623'),
    ]


    operations = [
        migrations.RunPython(build_refs, reverse_code=migrations.RunPython.noop)
    ]
