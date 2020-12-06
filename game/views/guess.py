from rest_framework.response import Response
from rest_framework.views import APIView

from game.services.guess_subject import guess_subject


class GuessApiView(APIView):
    @classmethod
    def get_extra_actions(cls):
        return []

    def post(self, request):
        result = guess_subject(request.data['roomCode'],
                               request.data['userId'],
                               request.data['subject'])
        return Response({
            "success": result.is_success
        })
