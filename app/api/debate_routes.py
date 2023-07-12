from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Debate, Prof, DebateTopic, Review
from app.forms.post_debate_form import PostDebateForm

debate_routes = Blueprint('debates', __name__)


@debate_routes.route('/')
def all_debates():
    '''
    Query for all debates for the display all debates page. Add the debate topic and the names of the professors to each debate dictionary. Return a dictionary of all debates.
    '''

    all_debates = Debate.query.all()
    debates_dict = [debate.to_dict() for debate in all_debates]

    for debate in debates_dict:
        topic = (DebateTopic.query.filter(DebateTopic.id == debate['topic_id']).one()).to_dict()
        debate['topic'] = topic['topic']
        prof1 = (Prof.query.filter(Prof.id == debate['prof1_id']).one()).to_dict()
        prof2 = (Prof.query.filter(Prof.id == debate['prof2_id']).one()).to_dict()
        debate['prof1_first_name'] = prof1['first_name']
        debate['prof1_last_name'] = prof1['last_name']
        debate['prof2_first_name'] = prof2['first_name']
        debate['prof2_last_name'] = prof2['last_name']

    return {'debates': debates_dict}


@debate_routes.route('/<int:id>')
def single_debate(id):
    '''
    Query for a single debate by id. Add the average for each attribute for both professors to the debate dictionary. Add professor names and fields. Return the dictionary.
    '''

    raw_debate = Debate.query.get(id)
    debate = raw_debate.to_dict()
    # get the topic name
    topic = (DebateTopic.query.filter(DebateTopic.id == debate['topic_id']).one()).to_dict()
    debate['topic'] = topic['topic']

    prof1 = (Prof.query.filter(Prof.id == debate['prof1_id']).one()).to_dict()
    prof2 = (Prof.query.filter(Prof.id == debate['prof2_id']).one()).to_dict()
    debate['prof1_first_name'] = prof1['first_name']
    debate['prof1_last_name'] = prof1['last_name']
    debate['prof2_first_name'] = prof2['first_name']
    debate['prof2_last_name'] = prof2['last_name']
    debate['prof1_field'] = prof1['field']
    debate['prof2_field'] = prof2['field']
    # get all the reviews for a professor so we can get an average for each attribute
    prof1_reviews = Review.query.filter(Review.prof_id == prof1['id']).all()
    prof1_reviews_dict = [review.to_dict() for review in prof1_reviews]
    prof2_reviews = Review.query.filter(Review.prof_id == prof2['id']).all()
    prof2_reviews_dict = [review.to_dict() for review in prof2_reviews]

    # initialize totals for each attribute
    prof1['intelligence'] = 0
    prof1['wisdom'] = 0
    prof1['charisma'] = 0
    prof1['knowledge'] = 0
    prof1['preparation'] = 0
    prof1['respect'] = 0
    # sum the totals
    for review in prof1_reviews_dict:
        prof1['intelligence'] += review['intelligence']
        prof1['wisdom'] += review['wisdom']
        prof1['charisma'] += review['charisma']
        prof1['knowledge'] += review['knowledge']
        prof1['preparation'] += review['preparation']
        prof1['respect'] += review['respect']
    # add averages for each attribute
    debate['prof1_avg_intelligence'] = prof1['intelligence'] / len(prof1_reviews_dict)
    debate['prof1_avg_wisdom'] = prof1['wisdom'] / len(prof1_reviews_dict)
    debate['prof1_avg_charisma'] = prof1['charisma'] / len(prof1_reviews_dict)
    debate['prof1_avg_knowledge'] = prof1['knowledge'] / len(prof1_reviews_dict)
    debate['prof1_avg_preparation'] = prof1['preparation'] / len(prof1_reviews_dict)
    debate['prof1_avg_respect'] = prof1['respect'] / len(prof1_reviews_dict)


    # initialize totals for each attribute
    prof2['intelligence'] = 0
    prof2['wisdom'] = 0
    prof2['charisma'] = 0
    prof2['knowledge'] = 0
    prof2['preparation'] = 0
    prof2['respect'] = 0
    # sum the totals
    for review in prof2_reviews_dict:
        prof2['intelligence'] += review['intelligence']
        prof2['wisdom'] += review['wisdom']
        prof2['charisma'] += review['charisma']
        prof2['knowledge'] += review['knowledge']
        prof2['preparation'] += review['preparation']
        prof2['respect'] += review['respect']
    # add averages for each attribute
    debate['prof2_avg_intelligence'] = prof2['intelligence'] / len(prof2_reviews_dict)
    debate['prof2_avg_wisdom'] = prof2['wisdom'] / len(prof2_reviews_dict)
    debate['prof2_avg_charisma'] = prof2['charisma'] / len(prof2_reviews_dict)
    debate['prof2_avg_knowledge'] = prof2['knowledge'] / len(prof2_reviews_dict)
    debate['prof2_avg_preparation'] = prof2['preparation'] / len(prof2_reviews_dict)
    debate['prof2_avg_respect'] = prof2['respect'] / len(prof2_reviews_dict)


    return debate

@debate_routes.route('/new', methods=['GET', 'POST'])
@login_required
def post_debate():
    '''
    Renders an empty form for the GET request. Validates the form and creates a new debate for the POST request.
    '''

    user = current_user
    creator_id = user.id
    form = PostDebateForm()

    form['csrf_token'].data = request.cookies['csrf_token'] # Boilerplate code

    if form.validate_on_submit():
        new_topic = DebateTopic(
            topic = form.data["topic"]
        )

        db.session.add(new_topic)
        db.session.commit()

        # new_debate = Debate(
        #     creator_id=creator_id,
        # )

    else:
        return form.errors
