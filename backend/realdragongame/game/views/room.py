from rest_framework.response import Response
from rest_framework.views import APIView

from game.services.create_room import create_room
from game.services.join_room import join_room


class CreateRoomApiView(APIView):
    @classmethod
    def get_extra_actions(cls):
        return []

    def post(self, request):
        result = create_room(request.data['nickname'])
        return Response({
            "roomCode": result.room.code,
            "userId": result.user.unique_id,
            "nickname": result.user.nickname
        })

class JoinRoomApiView(APIView):
    @classmethod
    def get_extra_actions(cls):
        return []

    def post(self, request):
        result = join_room(request.data['roomCode'], request.data['nickname'])
        return Response({
            "userId": result.user.unique_id,
            "nickname": result.user.nickname
        })