from app.models import db, Debate, environment, SCHEMA
from sqlalchemy.sql import text
from random import randint, choice


def seed_debates():
    debates = []
    departments = [
        "Art",
        "Biology",
        "Chemistry",
        "Computer Science",
        "Economics",
        "History",
        "Literature",
        "Magic",
        "Mathematics",
        "Philosophy",
        "Physical Education",
        "Physics",
        "Psychology",
    ]

    for _ in range(1, 51):
        new_debate = Debate(
            creator_id=randint(1, 6),
            topic_id=randint(1, 12),
            prof1_id=randint(1, 117),
            prof2_id=randint(1, 117),
            field=choice(departments),
        )
        debates.append(new_debate)

    [db.session.add(debate) for debate in debates]
    db.session.commit()


def undo_debates():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.debates RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM debates"))

    db.session.commit()
