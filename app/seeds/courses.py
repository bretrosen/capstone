from app.models import db, Course, environment, SCHEMA
from sqlalchemy.sql import text
from random import sample, randint

# currently randomly assigning professors to courses
# could change this...?
def seed_courses(all_profs):
    studio_art = Course(
        creator_id=randint(1, 6),
        department_id=1,
        name='Introduction to Studio Art in a Labyrinth',
        profs= sample(all_profs, randint(0, len(all_profs)))
    )
    landscapes = Course(
        creator_id=randint(1, 6),
        department_id=1,
        name='Unsettling Landscapes',
        profs= sample(all_profs, randint(0, len(all_profs)))
    )
    ceramic_food = Course(
        creator_id=randint(1, 6),
        department_id=1,
        name='The Ceramic Object as Food',
        profs= sample(all_profs, randint(0, len(all_profs)))
    )
    street_art = Course(
        creator_id=randint(1, 6),
        department_id=1,
        name='Street Art in the Country',
        profs= sample(all_profs, randint(0, len(all_profs)))
    )

    doritos = Course(
        creator_id=randint(1, 6),
        department_id=2,
        name='The Evolution of Doritos',
        profs= sample(all_profs, randint(0, len(all_profs)))
    )
    marine_bio = Course(
        creator_id=randint(1, 6),
        department_id=2,
        name='Marine Biology on Mars',
        profs= sample(all_profs, randint(0, len(all_profs)))
    )
    cat_bio = Course(
        creator_id=randint(1, 6),
        department_id=2,
        name='Biology for Cat People',
        profs= sample(all_profs, randint(0, len(all_profs)))
    )
    monty_python = Course(
        creator_id=randint(1, 6),
        department_id=2,
        name='Ecological Principles of Monty Python',
        profs= sample(all_profs, randint(0, len(all_profs)))
    )

    p_chem = Course(
        creator_id=randint(1, 6),
        department_id=3,
        name='Physical Chemistry for Ethereal Beings',
        profs= sample(all_profs, randint(0, len(all_profs)))
    )
    laser_chem = Course(
        creator_id=randint(1, 6),
        department_id=3,
        name='Lasers in Chemistry',
        profs= sample(all_profs, randint(0, len(all_profs)))
    )
    bio_chem = Course(
        creator_id=randint(1, 6),
        department_id=3,
        name='Bionanoinorganometallic Chemistry',
        profs= sample(all_profs, randint(0, len(all_profs)))
    )
    chem_stuff = Course(
        creator_id=randint(1, 6),
        department_id=3,
        name='The Chemistry of Stuff',
        profs= sample(all_profs, randint(0, len(all_profs)))
    )

    mach_learning = Course(
        creator_id=randint(1, 6),
        department_id=4,
        name='Hampering Machine Learning',
        profs= sample(all_profs, randint(0, len(all_profs)))
    )
    algos = Course(
        creator_id=randint(1, 6),
        department_id=4,
        name='Imprecise Algorithms',
        profs= sample(all_profs, randint(0, len(all_profs)))
    )
    python = Course(
        creator_id=randint(1, 6),
        department_id=4,
        name='Python for Lizard People',
        profs= sample(all_profs, randint(0, len(all_profs)))
    )
    comp_vision = Course(
        creator_id=randint(1, 6),
        department_id=4,
        name='Corrective Computer Vision',
        profs= sample(all_profs, randint(0, len(all_profs)))
    )

    the_hand = Course(
        creator_id=randint(1, 6),
        department_id=5,
        name='The All-Too-Visible Hand',
        profs= sample(all_profs, randint(0, len(all_profs)))
    )
    pringles = Course(
        creator_id=randint(1, 6),
        department_id=5,
        name='Pringles Backed Securities',
        profs= sample(all_profs, randint(0, len(all_profs)))
    )
    game_theory = Course(
        creator_id=randint(1, 6),
        department_id=5,
        name='Game Theory for Birds',
        profs= sample(all_profs, randint(0, len(all_profs)))
    )
    bookkeeping = Course(
        creator_id=randint(1, 6),
        department_id=5,
        name='Creative Bookkeeping',
        profs= sample(all_profs, randint(0, len(all_profs)))
    )

    tattoos = Course(
        creator_id=randint(1, 6),
        department_id=6,
        name='A History of Unforunate Tattoos',
        profs= sample(all_profs, randint(0, len(all_profs)))
    )
    world_war_1 = Course(
        creator_id=randint(1, 6),
        department_id=6,
        name='The Aftermath of World War I on Antarctica',
        profs= sample(all_profs, randint(0, len(all_profs)))
    )
    animal_sounds = Course(
        creator_id=randint(1, 6),
        department_id=6,
        name='An Intellectual History of Animal Sounds',
        profs= sample(all_profs, randint(0, len(all_profs)))
    )
    neanderthals = Course(
        creator_id=randint(1, 6),
        department_id=6,
        name='Justice and Law in Neanderthal Society',
        profs= sample(all_profs, randint(0, len(all_profs)))
    )


    all_courses = [studio_art, landscapes, ceramic_food, street_art, doritos, marine_bio, cat_bio, monty_python, p_chem, bio_chem, laser_chem, chem_stuff, mach_learning, algos, python, comp_vision, the_hand, pringles, game_theory, bookkeeping, tattoos, world_war_1, animal_sounds, neanderthals]
    [db.session.add(course) for course in all_courses]
    db.session.commit()

def undo_courses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.courses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM courses"))

    db.session.commit()
