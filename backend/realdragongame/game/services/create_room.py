import uuid

from game.models import Room, User
from game.room_code_generator import generate_room_code


class CreateRoomResult:
    def __init__(self, room, user):
        self.room = room
        self.user = user


def create_room(nickname):
    room = Room(code=generate_room_code(), state=Room.WAITING)
    room.save()
    user = User(room=room, nickname=nickname, is_owner=True,
                unique_id=uuid.uuid4().__str__())
    user.save()
    return CreateRoomResult(room, user)
