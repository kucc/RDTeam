from django.urls import path
from rest_framework import routers

from .views.room import CreateRoomApiView

router = routers.DefaultRouter()
router.register(r'/room', CreateRoomApiView, basename='create_room')
