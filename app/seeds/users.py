from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='JohnSmith', first_name='John', last_name='Smith',email='john316@hms.gov', password='password')
    harry = User(
        username='NotMuggle', first_name='Harry', last_name='Potter', email='harry@hogwarts.edu', password='password')
    watson = User(
        username='DrWatson', first_name='John', last_name='Watson',email='johnHW@md.com', password='password')

    all_users = [demo, harry, watson]
    [db.session.add(user) for user in all_users]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
