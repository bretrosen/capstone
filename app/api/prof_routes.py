from flask import Blueprint, request
from flask_login import login_required, current_user
from datetime import datetime
from statistics import mean
from app.models import db, Review, Prof, Course
from app.forms.post_prof_form import PostProfForm
from .AWS_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3

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
    First, query for all reviews, and get the average rating score for each prof. Query for all profs for the display all profs page. Add their aggregate data to the prof dictionary. Return a dictionary with all the profs; attributes and aggregate data included for each prof.
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

    # nested for loop: let's refactor for more efficient querying
    # iterate through prof then reviews
    # if a prof id in a review matches the prof's id:
    # append the quality, difficulty, and would_recommend field to the prof's list

    # QUERY ON THE JOIN YOU DUMMY
    for prof in profs_dict:
        for review in reviews_dict:
            if (review['prof_id'] == prof['id']):
                # prof['qualities'][review['id']] = (review['quality'])
                prof['qualities'].append(review['quality'])
                prof['difficulties'].append(review['difficulty'])
                prof['recommendations'].append(review['would_recommend'])
        # get the aggregate data for each prof
        # mean will throw an error with no data points
        if (len(prof['qualities']) > 0):
            prof['quality'] = mean(prof['qualities'])
        if (len(prof['difficulties']) > 0):
            prof['difficulty'] = mean(prof['difficulties'])
        if (len(prof['recommendations']) > 0):
            prof['recommended'] = percent_true(prof['recommendations'])

    # print("profs in backend route", profs_dict)

    return {'profs': profs_dict}


@prof_routes.route('/<int:id>')
def single_prof(id):
    '''
    Query for a single prof by id. Query for all the reviews for that prof.
    Return a dictionary with the prof's attributes, all reviews, and aggregate data.
    '''

    prof = Prof.query.get(id)
    prof_data = prof.to_dict()
    reviews = Review.query.filter(Review.prof_id == prof.id).all()
    reviews_dict = [review.to_dict() for review in reviews]
    # attach the reviews for each prof to the prof dictionary
    prof_data['reviews'] = reviews_dict



    # need to add quality, course name to reviews dictionary
    for review in reviews_dict:
        course = Course.query.filter(Course.id == review['course_id']).one()
        review['course_name'] = course.to_dict()['name']
        review['quality'] = mean([review['intelligence'], review['wisdom'], review['charisma'], review['knowledge'], review['preparation'], review['respect']])


    # print("all reviews associated with prof ============>", reviews_dict)

    return prof_data


@prof_routes.route('/new', methods = ['GET', 'POST'])
@login_required
def post_prof():
    '''
    Renders an empty form for the GET request. Validates the form and creaes a new prof for the POST request.
    '''

    user = current_user
    creator_id = user.id
    form = PostProfForm()

    form['csrf_token'].data = request.cookies['csrf_token'] # Boilerplate code

    if form.validate_on_submit():

        image = form.data["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)


        new_prof = Prof(
            creator_id=creator_id,
            first_name=form.data['first_name'],
            last_name=form.data['last_name'],
            field=form.data['field'],
            image=upload["url"]
        )

        # print('new prof to add to db =====>', new_prof)

        db.session.add(new_prof)
        db.session.commit()
        return new_prof.to_dict()

    else:
        return form.errors


@prof_routes.route('/<int:id>', methods = ['DELETE', 'PUT'])
@login_required
def put_delete_prof(id):
    '''
    Queries for the prof to update or delete, performs the update/delte, updates the database, and returns the updated/deleted prof in a dictionary.
    '''

    if request.method == 'PUT':
        updated_prof = Prof.query.get(id)
        data = request.get_json()
        updated_prof.first_name = data['first_name']
        updated_prof.last_name = data['last_name']
        updated_prof.field = data['field']
        db.session.commit()
        return updated_prof.to_dict()

    # else, method must be DELETE
    prof_to_delete = Prof.query.get(id)
    db.session.delete(prof_to_delete)
    db.session.commit()
    return prof_to_delete.to_dict()
