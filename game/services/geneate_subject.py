import random

from game.models import RoundSubject


def generate_round_subject(game):
    subjects = ['박진용', '강관훈', 'KUCC', '콜라', '치킨', '사물함', '칠판',
                '김현채', '김수홍', '최하민', '고려대학교', '인생', '토끼', '하늘',
                '말', '새', '힙합', '프로그래밍', '피자', '컴퓨터', '소크라테스', '노트북',
                '그림', '쓰레기통',  '모기', '에어컨', '겨울', '봄', '우유', '게임',
                '고등학교', '마스크', '코로나', '안경', '창문', '영어', '볼펜', '필통']
    random.shuffle(subjects)
    RoundSubject(game=game, round=game.round, subject_word=subjects[0]).save()
