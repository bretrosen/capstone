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
        "I had a farm in Africa at the foot of the Ngong Hills. That made it hard to attend this class, but I made the 5000 mile commute everyday anyway, and it was SUCH A WASTE OF TIME. Taking this course actively made me dumber.",
        "To begin with, the professor was dead. Well, you'd have thought that from the way this class was taught. But we beat on, brains against the tide, brought back onto the shores of knowledge, and we learned a few things about ourselves, and carbon dating, even though that was totally unrelated to the course content.",
        "To begin with, the professor was dead. Well, you'd have thought that from the way this class was taught. But we beat on, brains against the tide, brought back onto the shores of knowledge, and we learned a few things about ourselves, and carbon dating, even though that was totally unrelated to the course content."
        "It was the best of classes, it was the worst of classes, it was a class of wisdom, it was a class of foolishness, it was full of belief, it was full of incredulity, it was the fall semester of hope, it was the spring semester of despair, we had no exams, we had a 72 hour final exam. A very confusing and contradictory course.",
        "The professor, at forty, knew their life had been ruined by academia, but they kept on teaching anyway. This class could have been so much more if the professor cared. At all. It was… fine."
        "It was a pleasure to burn the course syllabus after barely passing the final. This class is TOUGH! ",
        "It is a truth universally acknowledged, that a single professor in possession of a good fortune, must be in want of a spouse. THIS PROF IS SO HAWT!!!",
        "There was no possibility of taking any other course than this one. It was truly enthralling and endlessly educational.",
        "Weird and unsettling but super interesting. This professor probably shouldn't teach this course, but it is a WILD RIDE if you just strap your brain seatbelt on."
    ]
    for _ in range(1, 301):
        new_review = Review(
            creator_id = randint(1, 6),
            prof_id = randint(1, 100),
            course_id = randint(1, 52),
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
