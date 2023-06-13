from app.models import db, Course, environment, SCHEMA
from sqlalchemy.sql import text

def seed_courses():
    postmodern_lit = Course(
        creator_id=1,
        department_id=1,
        name='Postmodern American Literature'
    )
    market_economies = Course(
        creator_id=2,
        department_id=2,
        name='Market Economies'
    )
    anth_unknown = Course(
        creator_id=3,
        department_id=3,
        name='Anthropology of the Unknown'
    )

    all_courses = [postmodern_lit, market_economies, anth_unknown]
    [db.session.add(course) for course in all_courses]
    db.session.commit()

def undo_courses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.courses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM courses"))

    db.session.commit()
