from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy import desc
from app.models import db, User, Review

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/')
def all_reviews():
    '''
    Query for all reviews for the display all review page. Order descending by datetime, so newest reviews appear first. Return results in a dictionary.
    '''

    all_reviews = Review.query.all().order_by(desc(Review.time_stamp))
    return {'reviews': [review.to_dict() for review in all_reviews]}


@review_routes.route('/<int:id>')
def single_review():
    '''
    Query for a single review by id and return it in a dictionary.
    '''

    review = Review.query.get(id)
    return review.to_dict()
