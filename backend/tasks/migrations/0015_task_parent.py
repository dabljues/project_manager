# Generated by Django 3.2.5 on 2022-04-10 14:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0014_auto_20210715_2344'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='parent',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='tasks_task_parent', to='tasks.task'),
        ),
    ]
