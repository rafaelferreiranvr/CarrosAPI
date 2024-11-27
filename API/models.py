from django.db import models
from .enums import Status

class Car(models.Model):
    Name = models.CharField(max_length=100)
    Status = models.IntegerField(choices=Status.choices(), default=Status.DISPONIVEL)
    Photo = models.ForeignKey('Photo', on_delete=models.CASCADE)

class Photo(models.Model):
    Base64 = models.TextField()