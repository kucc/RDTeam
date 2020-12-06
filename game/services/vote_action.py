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
    if not (user_id in aliver_id_set):      # 죽은 사람이 투표 X
        raise APIException(code=400)

    for v in votes:
        if v.user.unique_id == user_id:         # 투표 2번 이상 X
            raise APIException(code=400)
    vote = Vote(target_user=target, user=user, round=game.round, game=game)

    if not (target_id in aliver_id_set):     # 죽은 사람한테 투표 X
        raise APIException(code=400)

    vote.save()

    votes = Vote.objects.filter(round=game.round, game=game)

    vote_set = set(map(lambda u: u.user.unique_id, votes))

    if len(vote_set) == len(aliver_id_set):
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

        if len(aliver_id_set) - 1 == 2:
            room.state = Room.WAITING
            room.save()
            game.state = Game.END
        # 마피아 승리
        game.save()

    return VoteResult(room, user, target)
