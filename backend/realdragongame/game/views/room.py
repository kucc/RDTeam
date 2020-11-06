from rest_framework.exceptions import APIException
from rest_framework.response import Response
from rest_framework.views import APIView

from game.services.create_room import create_room
from game.services.fetch_room import fetch_room


class RoomApiView(APIView):
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

    def get(self, request):
        return Response(fetch_room(
            request.query_params['roomCode'], request.query_params['userId']))
