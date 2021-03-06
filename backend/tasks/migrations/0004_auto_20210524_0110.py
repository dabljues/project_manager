# Generated by Django 3.2 on 2021-05-23 23:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('tasks', '0003_subtask_task'),
    ]

    operations = [
        migrations.AddField(
            model_name='subtask',
            name='asignee',
            field=models.ForeignKey(default=18, on_delete=django.db.models.deletion.CASCADE, related_name='tasks_subtask_asignee', to='users.user'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='task',
            name='asignee',
            field=models.ForeignKey(default=18, on_delete=django.db.models.deletion.CASCADE, related_name='tasks_task_asignee', to='users.user'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='subtask',
            name='creator',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tasks_subtask_creator', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='task',
            name='creator',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tasks_task_creator', to=settings.AUTH_USER_MODEL),
        ),
    ]
