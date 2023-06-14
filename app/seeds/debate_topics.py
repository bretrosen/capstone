from app.models import db, DebateTopic, environment, SCHEMA
from sqlalchemy.sql import text

def seed_debate_topics():
    first = DebateTopic(topic='Cats vs. dogs: which is better?')
    second = DebateTopic(topic='How old is the Earth?')
    third = DebateTopic(topic="What's my name again?")

    all_topics = [first, second, third]
    [db.session.add(topic) for topic in all_topics]
    db.session.commit()

def undo_debate_topics():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.debate_topics RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM debate_topics"))

    db.session.commit()
