import uuid

from rest_framework.exceptions import NotFound, APIException

from game.models import Room, User, Vote, Game
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

    if Vote.objects.count() == 0:
        vote = Vote(target_user__unique_id=target_id, user__unique_id=user_id, round=game.round, game=game)
        vote.save()

    for vote in votes:
        if vote.user.unique_id != user_id:
            vote = Vote(target_user__unique_id=target_id, user__unique_id=user_id, round=game.round, game=game)
            vote.save()
        else:
            raise APIException(code=400)

    return VoteResult(room, user, target)