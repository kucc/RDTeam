import uuid

from game.models import User, Room


def generate_room_code():
    code = uuid.uuid4().__str__()[:8]
    while Room.objects.filter(code=code).exists():
        code = uuid.uuid4().__str__()[:8]
    return code
