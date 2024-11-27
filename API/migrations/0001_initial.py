# Generated by Django 4.2.13 on 2024-11-27 02:07

import API.enums
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Photo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Base64', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Car',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Name', models.CharField(max_length=100)),
                ('Status', models.IntegerField(choices=[(1, 'DISPONIVEL'), (0, 'INDISPONIVEL')], default=API.enums.Status['DISPONIVEL'])),
                ('Photo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.photo')),
            ],
        ),
    ]