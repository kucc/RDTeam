from django.db import models


class Room(models.Model):
    WAITING = 'WAITING'
    PLAYING = 'PLAYING'
    room_states = (
        (WAITING, '대기중'),
        (PLAYING, '게임 중'),
    )
    code = models.CharField(max_length=8)
    state = models.CharField(choices=room_states, max_length=10)
