from flask import Blueprint, request
from flask_login import login_required, current_user
from datetime import datetime
from app.models import db, Review, Prof, Course

prof_routes = Blueprint('profs', __name__)


@prof_routes.route('/')
def all_profs():
    '''
    First, query for all reviews, and get the average rating score for each prof. Query for all profs for the display all profs page. Return results in a dictionary.
    '''
    all_reviews = Review.query.all()
    reviews_dict = [review.to_dict() for review in all_reviews]

    all_profs = Prof.query.all()
    profs_dict = [prof.to_dict() for prof in all_profs]

    return {'profs': profs_dict}
