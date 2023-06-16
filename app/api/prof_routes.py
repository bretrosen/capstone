from flask import Blueprint, request
from flask_login import login_required, current_user
from datetime import datetime
from app.models import db, Review, Prof, Course

prof_routes = Blueprint('profs', __name__)


@prof_routes.route('/')
def all_profs():
    '''
    Query for all profs. Return results in a dictionary.
    '''

    all_profs = Prof.query.all()
    profs_dict = [prof.to_dict() for prof in all_profs]

    return {'profs': profs_dict}
