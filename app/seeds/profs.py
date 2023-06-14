from app.models import db, Prof, environment, SCHEMA
from sqlalchemy.sql import text

def seed_profs():
    shakespeare = Prof(
        creator_id=1,
        first_name='William',
        last_name='Shakespeare',
        field='Literature'
    )
    marx = Prof(
        creator_id=2,
        first_name='Karl',
        last_name='Marx',
        field='Economics'
    )
    newton = Prof(
        creator_id=3,
        first_name='Isaac',
        last_name='Newton',
        field='Physics'
    )

    all_profs = [shakespeare, marx, newton]
    [db.session.add(prof) for prof in all_profs]
    db.session.commit()
    return all_profs

def undo_profs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.profs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM profs"))

    db.session.commit()
