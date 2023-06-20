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
        name='A History of Unfortunate Tattoos',
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

    bird_noses = Course(
        creator_id=randint(1, 6),
        department_id=7,
        name='Birds With Big Noses',
        profs= sample(all_profs, randint(0, len(all_profs)))
    )
    footnotes = Course(
        creator_id=randint(1, 6),
        department_id=7,
        name='Only Footnotes',
        profs= sample(all_profs, randint(0, len(all_profs)))
    )
    shakespeare = Course(
        creator_id=randint(1, 6),
        department_id=7,
        name='An Overly Tedious Introduction to Shakespeare',
        profs= sample(all_profs, randint(0, len(all_profs)))
    )
    bookmarks = Course(
        creator_id=randint(1, 6),
        department_id=7,
        name='Really Cool Bookmarks',
        profs= sample(all_profs, randint(0, len(all_profs)))
    )

    familiar = Course(
        creator_id=randint(1, 6),
        department_id=8,
        name="Anthropomorphizing Your Familiar's Feelings",
        profs= sample(all_profs, randint(0, len(all_profs)))
    )
    tax_returns = Course(
        creator_id=randint(1, 6),
        department_id=8,
        name="These Aren't the Tax Returns You're Looking For",
        profs= sample(all_profs, randint(0, len(all_profs)))
    )
    dark_arts = Course(
        creator_id=randint(1, 6),
        department_id=8,
        name="Defense Against the Dark Arts",
        profs= sample(all_profs, randint(0, len(all_profs)))
    )
    sorcerers = Course(
        creator_id=randint(1, 6),
        department_id=8,
        name="Senior Seminar: Less Destructive Interview Skills for Sorcerers",
        profs= sample(all_profs, randint(0, len(all_profs)))
    )

    geometry = Course(
        creator_id=randint(1, 6),
        department_id=9,
        name="Emotional Geometry",
        profs= sample(all_profs, randint(0, len(all_profs)))
    )
    knot= Course(
        creator_id=randint(1, 6),
        department_id=9,
        name="Knot Theory at Sea",
        profs= sample(all_profs, randint(0, len(all_profs)))
    )
    discreet= Course(
        creator_id=randint(1, 6),
        department_id=9,
        name="Discreet Mathematics",
        profs= sample(all_profs, randint(0, len(all_profs)))
    )
    indiscreet = Course(
        creator_id=randint(1, 6),
        department_id=9,
        name="Indiscreet Mathematics",
        profs= sample(all_profs, randint(0, len(all_profs)))
    )

    injustice = Course(
        creator_id=randint(1, 6),
        department_id=10,
        name="Injustice Makes Us All Suck",
        profs= sample(all_profs, randint(0, len(all_profs)))
    )
    determinism = Course(
        creator_id=randint(1, 6),
        department_id=10,
        name="Determinism: Why bother tryi",
        profs= sample(all_profs, randint(0, len(all_profs)))
    )
    cat_phil = Course(
        creator_id=randint(1, 6),
        department_id=10,
        name="Philosophy of Cats",
        profs= sample(all_profs, randint(0, len(all_profs)))
    )
    tv = Course(
        creator_id=randint(1, 6),
        department_id=10,
        name="Debating Your Television",
        profs= sample(all_profs, randint(0, len(all_profs)))
    )

    yoga = Course(
        creator_id=randint(1, 6),
        department_id=11,
        name="Angry Yoga",
        profs= sample(all_profs, randint(0, len(all_profs)))
    )
    bicycles = Course(
        creator_id=randint(1, 6),
        department_id=11,
        name="Combatting Bicycles",
        profs= sample(all_profs, randint(0, len(all_profs)))
    )
    darts = Course(
        creator_id=randint(1, 6),
        department_id=11,
        name="Lawn Darts on Ice",
        profs= sample(all_profs, randint(0, len(all_profs)))
    )
    bowling = Course(
        creator_id=randint(1, 6),
        department_id=11,
        name="Bowling for Scholars",
        profs= sample(all_profs, randint(0, len(all_profs)))
    )

    toilet = Course(
        creator_id=randint(1, 6),
        department_id=12,
        name="Reinventing the Toilet",
        profs= sample(all_profs, randint(0, len(all_profs)))
    )
    astro = Course(
        creator_id=randint(1, 6),
        department_id=12,
        name="Low Effort Astrophysics",
        profs= sample(all_profs, randint(0, len(all_profs)))
    )
    relativity = Course(
        creator_id=randint(1, 6),
        department_id=12,
        name="Generic Relativity",
        profs= sample(all_profs, randint(0, len(all_profs)))
    )
    matter = Course(
        creator_id=randint(1, 6),
        department_id=12,
        name="What's the Matter?",
        profs= sample(all_profs, randint(0, len(all_profs)))
    )

    animal_thinking = Course(
        creator_id=randint(1, 6),
        department_id=13,
        name="Thinking With Animals",
        profs= sample(all_profs, randint(0, len(all_profs)))
    )
    birds_real = Course(
        creator_id=randint(1, 6),
        department_id=13,
        name="Birds Aren't Real, Man",
        profs= sample(all_profs, randint(0, len(all_profs)))
    )
    html_feelings = Course(
        creator_id=randint(1, 6),
        department_id=13,
        name="Elements of HTML Feelings",
        profs= sample(all_profs, randint(0, len(all_profs)))
    )
    clinical_psych = Course(
        creator_id=randint(1, 6),
        department_id=13,
        name="Irresponsible Clinical Psychology",
        profs= sample(all_profs, randint(0, len(all_profs)))
    )

    all_courses = [studio_art, landscapes, ceramic_food, street_art, doritos, marine_bio, cat_bio, monty_python, p_chem, bio_chem, laser_chem, chem_stuff, mach_learning, algos, python, comp_vision, the_hand, pringles, game_theory, bookkeeping, tattoos, world_war_1, animal_sounds, neanderthals, bird_noses, footnotes, shakespeare, bookmarks, familiar, tax_returns, dark_arts, sorcerers, geometry, knot, discreet, indiscreet, injustice, determinism, cat_phil, tv, yoga, bicycles, darts, bowling, toilet, astro, relativity, matter, animal_thinking, birds_real, html_feelings, clinical_psych]
    [db.session.add(course) for course in all_courses]
    db.session.commit()

def undo_courses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.courses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM courses"))

    db.session.commit()
