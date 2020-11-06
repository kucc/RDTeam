from django.urls import path
from rest_framework import routers

from .views.room import RoomApiView

router = routers.DefaultRouter()
router.register(r'/room', RoomApiView, basename='create_room')
