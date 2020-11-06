import uuid

from rest_framework.exceptions import NotFound, APIException

from game.models import Room, User, Vote, Game, UserGameState, Role
from game.services.fetch_room import calculate_total_vote_count


class VoteResult:
    def __init__(self, room, user, target):
        self.room = room
        self.user = user
        self.target = target


def vote_action(room_code, user_id, target_id):
    room = Room.objects.filter(code=room_code).first()
    user = User.objects.filter(unique_id=user_id).first()
    target = User.objects.filter(unique_id=target_id).first()
    game = Game.objects.filter(room=room).last()
    votes = Vote.objects.filter(round=game.round, game=game)

    aliver = UserGameState.objects.filter(game=game, is_alive=True)

    aliver_id_set = set(map(lambda u: u.user.unique_id, aliver))
    if not (user_id in aliver_id_set):
        raise APIException(code=400)

    for v in votes:
        if v.user.unique_id == user_id:
            raise APIException(code=400)

    vote = Vote(target_user=target, user=user, round=game.round, game=game)
    vote.save()

    vote_set = set(map(lambda u: u.user.unique_id, votes))

    if len(vote_set) + 1 == len(aliver_id_set):
        result = calculate_total_vote_count(votes)

        for key in result.keys():
            if result[key] == max(result.values()):
                to_be_killed = next(filter(lambda u: u.user.unique_id == key, aliver))
                to_be_killed.is_alive = False
                to_be_killed.save()

                if Role.objects.filter(game=game, user=to_be_killed.user).first().role_name == Role.MAFIA:
                    room.state = Room.WAITING
                    room.save()
                    game.state = Game.END
                    game.save()
                    return VoteResult(room, user, target)

        game.state = Game.GUSSING

    if len(aliver_id_set) == 2:
        room.state = Room.WAITING
        room.save()
        game.state = Game.END
        # 마피아 승리
    game.save()

    return VoteResult(room, user, target)
