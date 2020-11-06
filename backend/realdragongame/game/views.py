from django.shortcuts import render

# Create your views here.
from game.models.game import Game


def test(request):
    Game.objects.first()
