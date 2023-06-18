from flask import Blueprint, request
from flask_login import login_required, current_user
from datetime import datetime
from app.models import db, Review, Prof, Course

prof_routes = Blueprint('profs', __name__)

# helper function for averages
def mean(*args):
    sum = 0
    for arg in args:
        sum += arg
    return sum / len(args)

@prof_routes.route('/')
def all_profs():
    '''
    First, query for all reviews, and get the average rating score for each prof. Query for all profs for the display all profs page. Return results in a dictionary.
    '''
    all_reviews = Review.query.all()
    reviews_dict = [review.to_dict() for review in all_reviews]

    # add a quality field to each review that is an average of all ratings
    for review in reviews_dict:
        review['quality'] = mean(review['intelligence'], review['wisdom'], review['charisma'], review['knowledge'], review['preparation'], review['respect'])

    all_profs = Prof.query.all()
    profs_dict = [prof.to_dict() for prof in all_profs]

    for prof in profs_dict:
        prof['qualities'] = {}

    # nested for loop
    # iterate through prof then reviews
    # if a prof id in a review matches the prof's id:
    # add an individual quality field to the prof quality array equal to the review quality
    for prof in profs_dict:
        for review in reviews_dict:
            if (review['prof_id'] == prof['id']):
                prof['qualities'][review['id']] = review['quality']

    print("profs in backend route", profs_dict)

    return {'profs': profs_dict}
