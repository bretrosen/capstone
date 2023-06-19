from flask import Blueprint, request
from flask_login import login_required, current_user
from datetime import datetime
from statistics import mean
from app.models import db, Review, Prof, Course

prof_routes = Blueprint('profs', __name__)

# helper function to return % of trues for Boolean input
def percent_true(boolean_lst):
    count = 0
    for boolean in boolean_lst:
        if boolean == True:
            count += 1
    return (count / len(boolean_lst)) * 100

@prof_routes.route('/')
def all_profs():
    '''
    First, query for all reviews, and get the average rating score for each prof. Query for all profs for the display all profs page. Return results in a dictionary.
    '''
    all_reviews = Review.query.all()
    reviews_dict = [review.to_dict() for review in all_reviews]

    # add a quality field to each review that is an average of all ratings
    for review in reviews_dict:
        review['quality'] = mean([review['intelligence'], review['wisdom'], review['charisma'], review['knowledge'], review['preparation'], review['respect']])

    all_profs = Prof.query.all()
    profs_dict = [prof.to_dict() for prof in all_profs]

    # add lists for ratings we need to access
    for prof in profs_dict:
        prof['qualities'] = []
        prof['difficulties'] = []
        prof['recommendations'] = []

    # nested for loop
    # iterate through prof then reviews
    # if a prof id in a review matches the prof's id:
    # append the quality, difficulty, and would_recommend field to the prof's list
    for prof in profs_dict:
        for review in reviews_dict:
            if (review['prof_id'] == prof['id']):
                # prof['qualities'][review['id']] = (review['quality'])
                prof['qualities'].append(review['quality'])
                prof['difficulties'].append(review['difficulty'])
                prof['recommendations'].append(review['would_recommend'])
        # get the aggregate data for each prof
        if (len(prof['qualities']) > 0):
            prof['quality'] = mean(prof['qualities'])
        if (len(prof['difficulties']) > 0):
            prof['difficulty'] = mean(prof['difficulties'])
        if (len(prof['recommendations']) > 0):
            prof['recommended'] = percent_true(prof['recommendations'])

    # iterate through profs and average their ratings from all reviews
    # for prof in profs_dict:
    #     sum = 0
    #     for prof['qualities'] in prof:
    #         prof['quality'] = sum / len(prof['qualities'])



    print("profs in backend route", profs_dict)

    return {'profs': profs_dict}
