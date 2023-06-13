from app.models import db, Department, environment, SCHEMA
from sqlalchemy.sql import text

def seed_departments():
    english = Department(name='English')
    econ = Department(name='Economics')
    anth = Department(name='Anthropology')

    all_departments = [english, econ, anth]
    [db.session.add(department) for department in all_departments]
    db.session.commit()

def undo_departments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.departments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM departments"))

    db.session.commit()
