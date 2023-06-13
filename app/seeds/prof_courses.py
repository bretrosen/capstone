from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text
from ..models.prof_courses import prof_courses

def seed_prof_courses():
    first = prof_courses(prof_id=1, course_id=1)
    second = prof_courses(prof_id=2, course_id=2)
    third = prof_courses(prof_id=3, course_id=3)

    all_prof_courses = [first, second, third]
    [db.session.add(prof_course) for prof_course in all_prof_courses]
    db.session.commit()

def undo_prof_courses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.prof_courses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM prof_courses"))

    db.session.commit()
