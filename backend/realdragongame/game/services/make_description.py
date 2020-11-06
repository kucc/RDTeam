from rest_framework.exceptions import NotFound, APIException

from game.models import Room, Game, User, RoundSubject, RoundSubjectDescription, UserGameState


def make_description(room_code, user_id, description):
    room = Room.objects.filter(code=room_code).first()
    if not Room:
        raise NotFound()
    game = Game.objects.filter(room=room).last()
    if not game or not game.is_describing():
        raise APIException(code=400)

    if game.current_describer.unique_id != user_id:
        raise APIException(code=400)

    user = User.objects.filter(unique_id=user_id).first()
    round_subject = RoundSubject.objects.filter(
        game=game,
        round=game.round).first()
    RoundSubjectDescription(round_subject=round_subject, user=user, description=description).save()

    round_subject_descriptions = RoundSubjectDescription.objects.filter(round_subject=round_subject)
    exclude_user_id_set = set()
    for subject_description in round_subject_descriptions:
        exclude_user_id_set.add(subject_description.user.id)
    for dead_user in UserGameState.objects.filter(game=game, is_alive=False):
        exclude_user_id_set.add(dead_user.id)

    describable_users = list(filter(lambda u: u.id not in exclude_user_id_set, room.user_set.all()))
    describable_users = sorted(describable_users, key=lambda u: u.id)
    if len(describable_users) == 0:
        game.state = Game.VOTING
    else:
        game.current_describer = describable_users[0]
    game.save()

