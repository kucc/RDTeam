from rest_framework.response import Response
from rest_framework.views import APIView

from game.services.start_game import start_game


class GameStartApiView(APIView):
    @classmethod
    def get_extra_actions(cls):
        return []

    def post(self, request):
        start_game(request.data['roomCode'], request.data['userId'])
        return Response()
