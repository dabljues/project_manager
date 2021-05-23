# Generated by Django 3.2 on 2021-05-23 23:05

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('tasks', '0002_auto_20210524_0045'),
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('IP', 'In progress'), ('IR', 'In review'), ('NW', 'New'), ('RJ', 'Rejected'), ('TD', 'To do')], default='NW', max_length=2, verbose_name='State')),
                ('title', models.CharField(max_length=100, verbose_name='Title')),
                ('description', models.CharField(default='', max_length=2000, verbose_name='Description')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('last_updated', models.DateTimeField(default=django.utils.timezone.now)),
                ('type', models.CharField(choices=[('B', 'Bug'), ('I', 'Improvement'), ('T', 'Task')], default='T', max_length=1, verbose_name='Type')),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='SubTask',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('IP', 'In progress'), ('IR', 'In review'), ('NW', 'New'), ('RJ', 'Rejected'), ('TD', 'To do')], default='NW', max_length=2, verbose_name='State')),
                ('title', models.CharField(max_length=100, verbose_name='Title')),
                ('description', models.CharField(default='', max_length=2000, verbose_name='Description')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('last_updated', models.DateTimeField(default=django.utils.timezone.now)),
                ('type', models.CharField(choices=[('B', 'Bug'), ('I', 'Improvement'), ('S', 'Sub-task')], default='S', max_length=1, verbose_name='Type')),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('parent_task', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='parent_task', to='tasks.task')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
