from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, timedelta
from random import randint, choice
from faker import Faker

fake = Faker()

# def generate_reviews():
#     reviews = []
#     review_texts = [
#         "I loved this course so much",
#         "11/10 in my book!",
#         "Weird and unsettling but super interesting",
#         "A wild ride of emotions during which I learned a lot about myself but nothing about the material",
#         "Really dry lectures and the tests are impossible",
#         "It was fine, whatever, no complaints"
#     ]
#     for _ in range(1, 51):
#         new_review = Review(
#             creator_id = randint(1, 6),
#             prof_id = randint(1, 30),
#             course_id = randint(1, 24),
#             intelligence = randint(1, 20),
#             wisdom = randint (1, 20),
#             charisma = randint(1, 20),
#             knowledge = randint (1, 20),
#             preparation = randint (1, 20),
#             respect = randint (1, 20),
#             difficulty = randint (1, 20),
#             for_credit = choice([True, False]),
#             attendance = choice([True, False]),
#             would_recommend = choice([True, False]),
#             textbook = choice([True, False]),
#             review = choice(review_texts),
#             time_stamp = datetime.now()
#         )


def seed_reviews():
    reviews = []
    review_texts = [
        "I had a farm in Africa at the foot of the Ngong Hills. That made it hard to attend this class, but I made the 5000 mile commute everyday anyway, and it was SUCH A WASTE OF TIME. Taking this course actively made me dumber.",
        "To begin with, the professor was dead. Well, you'd have thought that from the way this class was taught. But we beat on, brains against the tide, brought back onto the shores of knowledge, and we learned a few things about ourselves, and carbon dating, even though that was totally unrelated to the course content.",
        "It was the best of classes, it was the worst of classes, it was a class of wisdom, it was a class of foolishness, it was full of belief, it was full of incredulity, it was the fall semester of hope, it was the spring semester of despair, we had no exams, we had a 72 hour final exam. A very confusing and contradictory course.",
        "The professor, at forty, knew their life had been ruined by academia, but they kept on teaching anyway. This class could have been so much more if the professor cared. At all. It was… fine.",
        "It was a pleasure to burn the course syllabus after barely passing the final. This class is TOUGH!",
        "It is a truth universally acknowledged, that a single professor in possession of a good fortune, must be in want of a spouse. THIS PROF IS SO HAWT!!!",
        "There was no possibility of taking any other course than this one. It was truly enthralling and endlessly educational.",
        "Weird and unsettling but super interesting. This professor probably shouldn't teach this course, but it is a WILD RIDE if you just strap your brain seatbelt on.",
        "Makes weird claims like inventing the question mark. Uncertain grasp on reality. A great intellect, but probably criminally insane.",
        "To review this professor is a far, far better thing than I have ever done; it is a far, far better grade that I received in this class than I have ever known.",
        "In the world according to this professor, we are all terminal cases. TOTAL BUMMER, MAN.",
        "I am haunted by waters because this professor would turn on the sprinklers in the lecture hall at random intervals during class.",
        "I never saw any of my classmates again- except the cops. No way has yet been invented to say goodbye to them.",
        "Don't ever tell anybody anything. If you do, this professor will hear it, and dock you points for not citing your sources in MLA format.",
        "Happy lecture halls are all alike; every unhappy lecture hall is unhappy in its own way, and this professor has all kinds of ways to make students unhappy.",
        "Someone must have slandered this professor, for one morning in class, without having done anything truly wrong, they were hauled out in handcuffs.",
        "You will rejoice to hear that no disaster has accompanied the commencement of an enterprise which you have regarded with such evil forebodings. This prof is actually totally cool and the class is really chill.",
        "In my younger and more vulnerable years, my father gave me some advice that I’ve been turning over in my mind ever since. He told me not to take a class from this professor. I should have listened!",
        "This is my favorite class in all the world, though I have never taken it. I still got an A. It's that easy.",
        "Whether this professor shall turn out to be the hero of my own life, or whether that station will be held by anybody else, this review must show. Only 178 characters left, I better choose my words carefully. Oh darn, now it's only 111 characters! I really need to stop and think about this.",
        "The professor was an old man who spoke to the back of the lecture hall and he once went eighty-four days without knowing the name of any student in the class."
    ]
    review_modifiers = [
        {'intelligence': [4,9], 'wisdom': [3,9], 'charisma': [2,6], 'knowledge': [4,6], 'preparation': [4,8], 'respect': [7,11], 'difficulty': [2,5]},
        {'intelligence': [8,9], 'wisdom': [7,9], 'charisma': [1,3], 'knowledge': [2,4], 'preparation': [1,3], 'respect': [7,9], 'difficulty': [12,15]},
        {'intelligence': [14,19], 'wisdom': [13,16], 'charisma': [11,16], 'knowledge': [14,16], 'preparation': [4,8], 'respect': [4,7], 'difficulty': [14,18]},
        {'intelligence': [14,19], 'wisdom': [13,19], 'charisma': [2,6], 'knowledge': [14,17], 'preparation': [4,8], 'respect': [6,9], 'difficulty': [7,11]},
        {'intelligence': [11,15], 'wisdom': [12,14], 'charisma': [6,9], 'knowledge': [10,12], 'preparation': [9,14], 'respect': [7,11], 'difficulty': [17,20]},
        {'intelligence': [14,19], 'wisdom': [11,15], 'charisma': [18,20], 'knowledge': [15,19], 'preparation': [13,16], 'respect': [12,16], 'difficulty': [7,9]},
        {'intelligence': [15,18], 'wisdom': [17,20], 'charisma': [12,16], 'knowledge': [18,20], 'preparation': [17,20], 'respect': [13,20], 'difficulty': [9,13]},
        {'intelligence': [15,20], 'wisdom': [13,16], 'charisma': [12,18], 'knowledge': [4,6], 'preparation': [3,6], 'respect': [7,11], 'difficulty': [12,20]},
        {'intelligence': [18,20], 'wisdom': [18,20], 'charisma': [2,6], 'knowledge': [14,18], 'preparation': [4,8], 'respect': [2,15], 'difficulty': [10,18]},
        {'intelligence': [18,20], 'wisdom': [18,20], 'charisma': [18,20], 'knowledge': [17,19], 'preparation': [14,18], 'respect': [12,15], 'difficulty': [6,9]},
        {'intelligence': [8,12], 'wisdom': [12,14], 'charisma': [2,6], 'knowledge': [14,16], 'preparation': [4,8], 'respect': [2,4], 'difficulty': [9,11]},
        {'intelligence': [5,8], 'wisdom': [4,6], 'charisma': [1,6], 'knowledge': [4,6], 'preparation': [4,8], 'respect': [1,1], 'difficulty': [15,20]},
        {'intelligence': [8,12], 'wisdom': [8,12], 'charisma': [8,12], 'knowledge': [8,12], 'preparation': [8,12], 'respect': [3,6], 'difficulty': [12,16]},
        {'intelligence': [14,19], 'wisdom': [12,15], 'charisma': [5,8], 'knowledge': [10,13], 'preparation': [12,17], 'respect': [5,7], 'difficulty': [12,20]},
        {'intelligence': [4,9], 'wisdom': [3,6], 'charisma': [1,1], 'knowledge': [12,18], 'preparation': [12,15], 'respect': [1,1], 'difficulty': [20,20]},
        {'intelligence': [14,19], 'wisdom': [15,20], 'charisma': [7,15], 'knowledge': [14,16], 'preparation': [14,18], 'respect': [17,19], 'difficulty': [9,11]},
        {'intelligence': [11,16], 'wisdom': [10,20], 'charisma': [16,20], 'knowledge': [14,16], 'preparation': [14,20], 'respect': [14,18], 'difficulty': [4,7]},
        {'intelligence': [10,12], 'wisdom': [10,12], 'charisma': [4,8], 'knowledge': [12,14], 'preparation': [14,18], 'respect': [3,6], 'difficulty': [14,20]},
        {'intelligence': [9,12], 'wisdom': [10,14], 'charisma': [12,16], 'knowledge': [14,16], 'preparation': [4,8], 'respect': [12,14], 'difficulty': [1,1]},
        {'intelligence': [10,10], 'wisdom': [10,10], 'charisma': [10,10], 'knowledge': [10,10], 'preparation': [10,10], 'respect': [10,10], 'difficulty': [10,10]},
        {'intelligence': [15,17], 'wisdom': [10,12], 'charisma': [2,4], 'knowledge': [18,20], 'preparation': [2,4], 'respect': [3,18], 'difficulty': [12,15]}
    ]

    for _ in range(1, 1142):
        oldest_date = '-30y'

        textchoice = randint(0, 20)
        new_review = Review(
            creator_id = randint(1, 6),
            prof_id = randint(1, 117),
            course_id = randint(1, 52),
            intelligence = randint(review_modifiers[textchoice]['intelligence'][0], review_modifiers[textchoice]['intelligence'][1]),
            wisdom = randint (review_modifiers[textchoice]['wisdom'][0], review_modifiers[textchoice]['wisdom'][1]),
            charisma = randint(review_modifiers[textchoice]['charisma'][0], review_modifiers[textchoice]['charisma'][1]),
            knowledge = randint (review_modifiers[textchoice]['charisma'][0], review_modifiers[textchoice]['charisma'][1]),
            preparation = randint (review_modifiers[textchoice]['preparation'][0], review_modifiers[textchoice]['preparation'][1]),
            respect = randint (review_modifiers[textchoice]['respect'][0], review_modifiers[textchoice]['respect'][1]),
            difficulty = randint (review_modifiers[textchoice]['difficulty'][0], review_modifiers[textchoice]['difficulty'][1]),
            for_credit = choice([True, False]),
            attendance = choice([True, False]),
            would_recommend = choice([True, False]),
            textbook = choice([True, False]),
            review = review_texts[textchoice],
            time_stamp = fake.date_time_between(start_date=oldest_date, end_date='now')

        )


        reviews.append(new_review)

    [db.session.add(review) for review in reviews]
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
