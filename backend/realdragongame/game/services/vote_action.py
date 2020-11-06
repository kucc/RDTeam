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
    print(Room.objects.all())
    user = User.objects.filter(unique_id=user_id).first()
    target = User.objects.filter(unique_id=target_id).first()
    game = Game.objects.filter(room=room).last()
    votes = Vote.objects.filter(round=game.round, game=game)

    aliver = UserGameState.objects.filter(game=game, is_alive=True)

    aliver_id_set = set(map(lambda u: u.unique_id, aliver))
    if not(user_id in aliver_id_set):
        raise APIException(code=400)

    for v in votes:
        if v.user.unique_id == user_id:
            raise APIException(code=400)

    vote = Vote(target_user=target, user=user, round=game.round, game=game)
    vote.save()

    vote_set = set(map(lambda u: u.unique_id, votes))





    if len(vote_set) == len(aliver_id_set):
        result = calculate_total_vote_count(votes)

        lst = list(result.keys())
        for e in lst:
            if result[e] == max(result.values()):
                to_be_killed = next(filter(lambda u: u.unique_id == e, aliver))
                to_be_killed.is_alive = False

                if Role.objects.filter(game=game, user=to_be_killed.user).first().role_name == Role.MAFIA:
                    pass
                    #시민승리


        game.state = Game.GUSSING





    if len(aliver_id_set) == 2:
        game.state = Game.END
        #마피아 승리

    return VoteResult(room, user, target)