from rest_framework.exceptions import NotFound

from game.models import Room, Game, Role, UserGameState, Vote, RoundSubject, RoundSubjectDescription, User


def make_users_response(users):
    return [{
        "nickname": user_state.nickname,
        "userId": user_state.unique_id
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

    owner_id = room.users.filter(lambda x: x.is_owner).unique_id
    me = room.users.filter(lambda x: x.unique_id == user_id).unique_id
    my_role = Role.objects.filter(game=game, user=me)
    user_game_states = UserGameState.objects.filter(game=game)

    subject = RoundSubject.objects.filter(game=game, round=game.round)
    subject_desciptions = subject.round_subject_description_set

    votes = Vote.objects.filter(game=game, round=game.round)
    voted = len(votes.filter(lambda vote: vote.user.unique_id == user_id)) != 0

    return {
        "room": {
            "owner": owner_id,
            "state": room.state
        },
        "game": {
            "me": {
                "role": my_role,
                "voted": voted
            },
            "state": game.state,
            "subject": subject.word,
            "round": game.round,
            "currentDescriber": game.current_describer.unique_id,
            "subjectDescription": make_round_subject_description_response(subject_desciptions),
            "votes": calculate_total_vote_count(votes)
        },
        "users": make_users_state_response(user_game_states)
    }
