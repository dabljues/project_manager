# Generated by Django 3.2 on 2021-05-04 23:40

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=8, verbose_name='Name')),
                ('status', models.CharField(choices=[('O', 'Open'), ('C', 'Closed')], default='O', max_length=1, verbose_name='Status')),
                ('description', models.CharField(default='', max_length=3000, verbose_name='Description')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('creator', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='project_creator', to=settings.AUTH_USER_MODEL)),
                ('participants', models.ManyToManyField(related_name='project_participants', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]