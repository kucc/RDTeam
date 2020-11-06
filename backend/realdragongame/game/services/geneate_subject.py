import random

from game.models import RoundSubject


def generate_round_subject(game):
    subjects = ['박진용', '강관훈', 'KUCC', '콜라', '치킨', '사물함', '칠판', '김현채', '김수홍', '최하민', '고려대학교']
    random.shuffle(subjects)
    RoundSubject(game=game, round=game.round, subject_word=subjects[0]).save()
