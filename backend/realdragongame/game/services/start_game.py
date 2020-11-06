import random

from rest_framework.exceptions import NotFound, PermissionDenied, APIException

from game.models import User, Room, Game, Role, RoundSubject, UserGameState
from game.services.geneate_subject import generate_round_subject


def is_game_playing(room):
    game = room.game_set.last()
    if not game or game.is_end():
        return False
    return True


def start_game(room_code, user_id):
    room = Room.objects.filter(code=room_code).first()
    if not room:
        raise NotFound()
    owner = User.objects.filter(room=room, is_owner=True).first()
    owner_id = owner.unique_id
    if owner_id != user_id:
        raise PermissionDenied()

    if is_game_playing(room):
        raise APIException(code=400)

    game = Game(room=room, round=1, state=Game.DESCRIBING, current_describer=owner)
    game.save()
    init_roles(game, room)
    generate_round_subject(game)
    init_user_states(game, room)
    room.state = Room.PLAYING
    room.save()


def init_roles(game, room):
    users = User.objects.filter(room=room)
    shuffled_user = [user for user in users]
    random.shuffle(shuffled_user)
    mafia = shuffled_user[0]
    Role(game=game, user=mafia, role_name=Role.MAFIA).save()
    for citizen in shuffled_user[1:]:
        Role(game=game, user=citizen, role_name=Role.CITIZEN).save()


def init_user_states(game, room):
    users = User.objects.filter(room=room)
    for user in users:
        UserGameState(user=user, game=game, is_alive=True).save()
