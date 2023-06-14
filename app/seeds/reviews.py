from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    first = Review(
        creator_id=1,
        prof_id=1,
        course_id=1,
        intelligence=10,
        wisdom=10,
        charisma=10,
        knowledge=10,
        preparation=10,
        respect=10,
        for_credit=True,
        attendance=False,
        would_recommend=True,
        textbook=False
    )
    second = Review(
        creator_id=2,
        prof_id=2,
        course_id=2,
        intelligence=10,
        wisdom=10,
        charisma=10,
        knowledge=10,
        preparation=10,
        respect=10,
        for_credit=True,
        attendance=True,
        would_recommend=False,
        textbook=True
    )
    third = Review(
        creator_id=3,
        prof_id=3,
        course_id=3,
        intelligence=10,
        wisdom=10,
        charisma=10,
        knowledge=10,
        preparation=10,
        respect=10,
        for_credit=False,
        attendance=False,
        would_recommend=True,
        textbook=False
    )

    all_reviews = [first, second, third]
    [db.session.add(review) for review in all_reviews]
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
