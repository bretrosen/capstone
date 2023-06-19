from app.models import db, Department, environment, SCHEMA
from sqlalchemy.sql import text

def seed_departments():
    art = Department(name='Art')
    bio = Department(name='Biology')
    chem = Department(name='Chemistry')
    cs = Department(name='Computer Science')
    econ = Department(name='Economics')
    history = Department(name='History')
    lit = Department(name='Literature')
    magic = Department(name='Magic')
    math = Department(name='Mathematics')
    phil = Department(name='Philosophy')
    pe = Department(name='Physical Education')
    phys = Department(name='Physics')
    psych = Department(name='Psychology')

    all_departments = [art, bio, chem, cs, econ, history, lit, magic, math, phil, pe, phys, psych]
    [db.session.add(department) for department in all_departments]
    db.session.commit()

def undo_departments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.departments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM departments"))

    db.session.commit()
