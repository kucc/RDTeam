from rest_framework.response import Response
from rest_framework.views import APIView

from game.services.vote_action import vote_action


class VoteApiView(APIView):
    @classmethod
    def get_extra_actions(cls):
        return []

    def post(self, request):
        vote_action(request.data['roomCode'], request.data['userId'], request.data['targetUserId'])

        return Response({
        })

