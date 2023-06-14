from app.models import db, Debate, environment, SCHEMA
from sqlalchemy.sql import text

def seed_debates():
    first = Debate(
        creator_id=1,
        topic_id=1,
        prof1_id=1,
        prof2_id=2,
        field="Literature"
    )
    second = Debate(
        creator_id=2,
        topic_id=2,
        prof1_id=1,
        prof2_id=3,
        field="Economics"
    )
    third = Debate(
        creator_id=3,
        topic_id=3,
        prof1_id=2,
        prof2_id=3,
        field="Physics"
    )

    all_debates = [first, second, third]
    [db.session.add(debate) for debate in all_debates]
    db.session.commit()

def undo_debates():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.debates RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM debates"))

    db.session.commit()
