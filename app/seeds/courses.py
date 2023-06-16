from app.models import db, Course, environment, SCHEMA
from sqlalchemy.sql import text
from random import choice, sample, randint

# currently randomly assigning professors to courses
# could change this...?
def seed_courses(all_profs):
    postmodern_lit = Course(
        creator_id=1,
        department_id=1,
        name='Postmodern American Literature',
        profs= sample(all_profs, randint(0, len(all_profs)))
    )
    market_economies = Course(
        creator_id=2,
        department_id=2,
        name='Market Economies',
        profs= sample(all_profs, randint(0, len(all_profs)))
    )
    anth_unknown = Course(
        creator_id=3,
        department_id=3,
        name='Anthropology of the Unknown',
        profs= sample(all_profs, randint(0, len(all_profs)))
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
