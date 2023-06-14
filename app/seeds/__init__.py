from flask.cli import AppGroup
from .users import seed_users, undo_users
from .reviews import seed_reviews, undo_reviews
from .profs import seed_profs, undo_profs
from .courses import seed_courses, undo_courses
from .departments import seed_departments, undo_departments
from .prof_courses import seed_prof_courses, undo_prof_courses
from .debates import seed_debates, undo_debates
from .debate_topics import seed_debate_topics, undo_debate_topics

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below

        undo_debates()
        undo_reviews()
        undo_prof_courses()
        undo_courses()
        undo_profs()
        undo_debate_topics()
        undo_departments()
        undo_users()
    seed_users()
    seed_departments()
    seed_debate_topics()
    profs = seed_profs()
    seed_courses(profs)
    seed_reviews()
    seed_debates()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():

    undo_debates()
    undo_reviews()
    undo_prof_courses()
    undo_courses()
    undo_profs()
    undo_debate_topics()
    undo_departments()
    undo_users()
    # Add other undo functions here
