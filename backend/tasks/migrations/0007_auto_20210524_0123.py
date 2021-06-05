# Generated by Django 3.2 on 2021-05-23 23:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("tasks", "0006_task_project"),
    ]

    operations = [
        migrations.AddField(
            model_name="subtask",
            name="name",
            field=models.CharField(
                default="Dumm-2", max_length=12, unique=True, verbose_name="Name"
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="task",
            name="name",
            field=models.CharField(
                default="Dumm-1", max_length=12, unique=True, verbose_name="Name"
            ),
            preserve_default=False,
        ),
    ]