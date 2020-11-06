import uuid

from rest_framework.exceptions import NotFound, APIException

from game.models import Room, User
from game.room_code_generator import generate_room_code


class JoinRoomResult:
    def __init__(self, room, user):
        self.room = room
        self.user = user

def join_room(roomCode, nickname):

    room = Room.objects.filter(code=roomCode).first()
    if not room:
        raise NotFound()

    if room.state == room.PLAYING:
        raise APIException(code=400)

    if room.user_set.count() > 8:
        raise APIException(code=400)

    user = User(room=room, nickname=nickname, is_owner=False,
                unique_id=uuid.uuid4().__str__())
    user.save()
    return JoinRoomResult(room, user)
