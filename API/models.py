from django.db import models
from .enums import Status

class Car(models.Model):
    Name = models.CharField(max_length=100)
    Status = models.IntegerField(choices=Status.choices(), default=Status.DISPONIVEL)
    Photo = models.ForeignKey('Photo', on_delete=models.CASCADE)

class Photo(models.Model):
    Extension = models.CharField(max_length=100, default='.jpg')
    Base64 = models.TextField()

    def Download(self):
        mime = utils.get_mime_type(self.Extension)
        return f"data:{mime};base64,{self.Base64}"

    def Upload(self, extension, base64):
        isBase64 = utils.check_base64(base64)
        if not isBase64:
            return False

        self.Extension = extension
        self.Base64 = base64
        self.save()
        return True