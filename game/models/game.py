from django.db import models
from django.db.models import CASCADE

from game.models.room import Room
from game.models.user import User


class Game(models.Model):
    DESCRIBING = 'DESCRIBING'
    VOTING = 'VOTING'
    GUSSING = 'GUSSING'
    END = 'END'
    game_states = (
        (DESCRIBING, '설명'),
        (VOTING, '투표 중'),
        (GUSSING, '주제 추측 중'),
        (END, '끝'),
    )

    round = models.IntegerField()
    room = models.ForeignKey(Room, on_delete=CASCADE)
    state = models.CharField(choices=game_states, max_length=20)
    current_describer = models.ForeignKey(User, on_delete=CASCADE)

    def is_end(self):
        return self.state == Game.END

    def is_describing(self):
        return self.state == Game.DESCRIBING

    def is_guessing(self):
        return self.state == Game.GUSSING


class Role(models.Model):
    MAFIA = 'MAFIA'
    CITIZEN = 'CITIZEN'
    roles = (
        (MAFIA, '마피아'),
        (CITIZEN, '시민')
    )
    game = models.ForeignKey(Game, on_delete=CASCADE)
    user = models.ForeignKey(User, on_delete=CASCADE)
    role_name = models.CharField(choices=roles, max_length=20)

    def is_citizen(self):
        return self.role_name == Role.CITIZEN


class RoundSubject(models.Model):
    game = models.ForeignKey(Game, on_delete=CASCADE)
    subject_word = models.CharField(max_length=30)
    round = models.IntegerField()


class RoundSubjectDescription(models.Model):
    round_subject = models.ForeignKey(RoundSubject, on_delete=CASCADE)
    user = models.ForeignKey(User, on_delete=CASCADE)
    description = models.CharField(max_length=100)


class UserGameState(models.Model):
    user = models.ForeignKey(User, on_delete=CASCADE)
    game = models.ForeignKey(Game, on_delete=CASCADE)
    is_alive = models.BooleanField(default=True)
