from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, timedelta
from random import randint, choice

def generate_reviews():
    reviews = []
    review_texts = [
        "I loved this course so much",
        "11/10 in my book!",
        "Weird and unsettling but super interesting",
        "A wild ride of emotions during which I learned a lot about myself but nothing about the material",
        "Really dry lectures and the tests are impossible",
        "It was fine, whatever, no complaints"
    ]
    for _ in range(1, 51):
        new_review = Review(
            creator_id = randint(1, 6),
            prof_id = randint(1, 30),
            course_id = randint(1, 24),
            intelligence = randint(1, 20),
            wisdom = randint (1, 20),
            charisma = randint(1, 20),
            knowledge = randint (1, 20),
            preparation = randint (1, 20),
            respect = randint (1, 20),
            difficulty = randint (1, 20),
            for_credit = choice([True, False]),
            attendance = choice([True, False]),
            would_recommend = choice([True, False]),
            textbook = choice([True, False]),
            review = choice(review_texts),
            time_stamp = datetime.now()
        )


def seed_reviews():
    # first = Review(
    #     creator_id=1,
    #     prof_id=1,
    #     course_id=1,
    #     intelligence=10,
    #     wisdom=10,
    #     charisma=10,
    #     knowledge=10,
    #     preparation=10,
    #     respect=10,
    #     difficulty=5,
    #     for_credit=True,
    #     attendance=False,
    #     would_recommend=True,
    #     textbook=False,
    #     review='None of it made sense',
    #     # might want to reconsider how review datetime seeding is done
    #     time_stamp=datetime.now() - timedelta(days = 1)
    # )
    # second = Review(
    #     creator_id=2,
    #     prof_id=2,
    #     course_id=2,
    #     intelligence=10,
    #     wisdom=10,
    #     charisma=10,
    #     knowledge=10,
    #     preparation=10,
    #     respect=10,
    #     difficulty=4,
    #     for_credit=True,
    #     attendance=True,
    #     would_recommend=False,
    #     textbook=True,
    #     review='A lot of cool numbers',
    #     time_stamp=datetime.now() - timedelta(days = 3)
    # )
    # third = Review(
    #     creator_id=3,
    #     prof_id=3,
    #     course_id=3,
    #     intelligence=10,
    #     wisdom=10,
    #     charisma=10,
    #     knowledge=10,
    #     preparation=10,
    #     respect=10,
    #     difficulty=4,
    #     for_credit=False,
    #     attendance=False,
    #     would_recommend=True,
    #     textbook=False,
    #     review='This class is super dope',
    #     time_stamp=datetime.now()
    # )

    # all_reviews = [first, second, third]
    # [db.session.add(review) for review in all_reviews]

    reviews = []
    review_texts = [
        "I loved this course so much",
        "11/10 in my book!",
        "Weird and unsettling but super interesting",
        "A wild ride of emotions during which I learned a lot about myself but nothing about the material",
        "Really dry lectures and the tests are impossible",
        "It was fine, whatever, no complaints"
    ]
    for _ in range(1, 51):
        new_review = Review(
            creator_id = randint(1, 6),
            prof_id = randint(1, 30),
            course_id = randint(1, 24),
            intelligence = randint(1, 20),
            wisdom = randint (1, 20),
            charisma = randint(1, 20),
            knowledge = randint (1, 20),
            preparation = randint (1, 20),
            respect = randint (1, 20),
            difficulty = randint (1, 20),
            for_credit = choice([True, False]),
            attendance = choice([True, False]),
            would_recommend = choice([True, False]),
            textbook = choice([True, False]),
            review = choice(review_texts),
            time_stamp = datetime.now()
        )
        reviews.append(new_review)

    [db.session.add(review) for review in reviews]
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
