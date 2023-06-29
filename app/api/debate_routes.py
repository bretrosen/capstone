from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Debate, Prof, DebateTopic

debate_routes = Blueprint('debates', __name__)


@debate_routes.route('/')
def all_debates():
    '''
    Query for all debates for the display all debates page.
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
