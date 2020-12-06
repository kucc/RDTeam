from django.db import models


class Subject(models.Model):
    word = models.CharField(max_length=30)
