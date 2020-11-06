import random

from rest_framework.exceptions import NotFound, PermissionDenied, APIException

from game.models import User, Room, Game, Role, RoundSubject, UserGameState


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
    subjects = ['박진용', '강관훈', 'KUCC', '콜라', '치킨', '사물함', '칠판', '김현채', '김수홍', '최하민', '고려대학교']
    random.shuffle(subjects)
    RoundSubject(game=game, round=1, subject_word=subjects[0]).save()
    init_user_states(game, room)


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
