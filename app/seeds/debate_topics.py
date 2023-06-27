from app.models import db, DebateTopic, environment, SCHEMA
from sqlalchemy.sql import text

def seed_debate_topics():
    first = DebateTopic(topic="Is a hot dog a sandwich?")
    second = DebateTopic(topic="Does a straw have one hole or two?")
    third = DebateTopic(topic="What button does the digital world need the most?")
    fourth = DebateTopic(topic="Who would win in a fight: a duck-sized horse, or a horse-sized duck?")
    fifth = DebateTopic(topic="Would you rather communicate using only emojis, or only animal sounds?")
    sixth = DebateTopic(topic="Spaces or tabs?")
    seventh = DebateTopic(topic="Which came first: the chicken, or the egg?")
    eighth = DebateTopic(topic="Would you rather have a terrible neighbor or terrible co-worker?")
    ninth = DebateTopic(topic="How many five year olds could you defeat in a fight?")
    tenth = DebateTopic(topic="Does free will exist?")

    all_topics = [first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth]
    [db.session.add(topic) for topic in all_topics]
    db.session.commit()

def undo_debate_topics():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.debate_topics RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM debate_topics"))

    db.session.commit()
