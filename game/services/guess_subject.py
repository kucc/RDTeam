import random

from rest_framework.exceptions import NotFound, APIException

from game.models import Room, Game, User, Role, RoundSubject
from game.services.geneate_subject import generate_round_subject


class GuessResult:
    def __init__(self, is_success):
        self.is_success = is_success


def guess_subject(room_code, user_id, guessed):
    room = Room.objects.filter(code=room_code).first()
    if not Room:
        raise NotFound()
    game = Game.objects.filter(room=room).last()
    if not game or not game.is_guessing():
        raise APIException(code=400)


    user = User.objects.filter(unique_id=user_id).first()
    role = Role.objects.filter(user=user, game=game).first()

    if role.is_citizen():
        raise APIException(code=400)

    round_subject = RoundSubject.objects.filter(
        game=game,
        round=game.round).first()
    if round_subject.subject_word == guessed:
        room.state = Room.WAITING
        game.state = Game.END
        game.save()
        return GuessResult(True)
    else:
        game.round = game.round + 1
        game.state = Game.DESCRIBING
        game.save()
        generate_round_subject(game)
        return GuessResult(False)
