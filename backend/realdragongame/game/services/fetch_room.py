from rest_framework.exceptions import NotFound

from game.models import Room, Game, Role, UserGameState, Vote, RoundSubject, RoundSubjectDescription, User


def make_users_response(users):
    return [{
        "nickname": user_state.nickname,
        "userId": user_state.unique_id,
        "state": "ALIVE"
    } for user_state in users]


def make_users_state_response(user_game_states):
    return [{
        "nickname": user_state.user.nickname,
        "userId": user_state.user.unique_id,
        "state": "ALIVE" if user_state.is_alive else "DEAD"
    } for user_state in user_game_states]


def calculate_total_vote_count(votes):
    result = {}
    for vote in votes:
        result.setdefault(vote.user.unique_id, 0)
        result[vote.user.unique_id] = result[vote.user.unique_id] + 1
    return result


def make_round_subject_description_response(descriptions):
    return [
        {
            "userId": description.user.unique_id,
            "description": description.description
        } for description in descriptions
    ]


def make_waiting_room_response(room):
    owner_id = User.objects.filter(room=room, is_owner=True).first().unique_id
    return {
        "room": {
            "owner": owner_id,
            "state": room.state
        },
        "users": make_users_response(room.user_set.all())
    }


def fetch_room(room_code, user_id):
    room = Room.objects.filter(code=room_code).first()
    if not room:
        raise NotFound()

    game = Game.objects.filter(room=room) \
        .select_related('current_describer') \
        .last()

    if not game:
        return make_waiting_room_response(room)

    owner_id = next(filter(lambda x: x.is_owner, list(room.user_set.all()))).unique_id
    me = User.objects.filter(unique_id=user_id).first()
    my_role = Role.objects.filter(game=game, user=me).first()
    user_game_states = UserGameState.objects.filter(game=game)

    subject = RoundSubject.objects.filter(game=game, round=game.round).first()
    subject_desciptions = RoundSubjectDescription.objects.filter(round_subject=subject)

    votes = Vote.objects.filter(game=game, round=game.round)
    voted = len(list(filter(lambda vote: vote.user.unique_id == user_id, votes))) != 0

    last_game_result = None
    if game.is_end():
        mafia = Role.objects.filter(game=game, role_name=Role.MAFIA).first()
        mafia_state = UserGameState.objects.filter(game=game, user=mafia.user).first()

        last_game_result = {
            "mafiaUserId": mafia.user.unique_id,
            "mafiaNickname": mafia.user.nickname,
            "winner": Role.MAFIA if mafia_state.is_alive else Role.CITIZEN
        }

    return {
        "room": {
            "owner": owner_id,
            "state": room.state
        },
        "game": {
            "me": {
                "role": my_role.role_name,
                "voted": voted
            },
            "state": game.state,
            "subject": subject.subject_word,
            "round": game.round,
            "currentDescriber": game.current_describer.unique_id,
            "subjectDescription": make_round_subject_description_response(subject_desciptions),
            "votes": calculate_total_vote_count(votes),
            "lastGameResult": last_game_result
        },
        "users": make_users_state_response(user_game_states)
    }
