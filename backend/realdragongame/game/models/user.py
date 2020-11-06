from uuid import UUID

from django.db import models
from django.db.models import CASCADE

from game.models.room import Room


class User(models.Model):
    nickname = models.CharField(max_length=50)
    room = models.ForeignKey(Room, on_delete=CASCADE)
    leave = models.BooleanField(default=False)
    is_owner = models.BooleanField()
    unique_id = models.CharField(max_length=255)
