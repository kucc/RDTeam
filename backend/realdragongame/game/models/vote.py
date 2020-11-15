from django.db import models
from django.db.models import CASCADE

from game.models.user import User
from game.models.game import Game


class Vote(models.Model):
    user = models.ForeignKey(User, on_delete=CASCADE, related_name='user')
    game = models.ForeignKey(Game, on_delete=CASCADE)
    round = models.IntegerField()
    target_user = models.ForeignKey(User, on_delete=CASCADE, related_name='target_user')
