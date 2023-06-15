from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy import desc
from datetime import datetime
from app.models import db, Review, Prof, Course
from app.forms.post_review_form import PostReviewForm

review_routes = Blueprint('reviews', __name__)

# helper function for averages
def mean(*args):
    sum = 0
    for arg in args:
        sum += arg
    return sum / len(args)

@review_routes.route('/')
def all_reviews():
    '''
    Query for all reviews for the display all review page. Order descending by datetime, so newest reviews appear first. Add an average of numeric ratings. Return results in a dictionary.
    '''

    all_reviews = Review.query.order_by(Review.time_stamp.desc()).all()
    reviews_dict = [review.to_dict() for review in all_reviews]
    for review in reviews_dict:
        review['quality'] = mean(review['intelligence'], review['wisdom'], review['charisma'], review['knowledge'], review['preparation'], review['respect'])
    return {'reviews': reviews_dict}


@review_routes.route('/<int:id>')
def single_review(id):
    '''
    Query for a single review by id, add an average of numeric ratings, and return it in a dictionary.
    '''
    review = Review.query.get(id)
    review_data = review.to_dict()

    attribute_mean = mean(review_data['intelligence'], review_data['wisdom'], review_data['charisma'], review_data['knowledge'], review_data['preparation'], review_data['respect'])
    review_data['quality'] = attribute_mean

    return review_data


@review_routes.route('/new', methods = ['GET', 'POST'])
@login_required
def post_review():
    '''
    Renders an empty form for the GET request. Validates the form and creates a new review for the POST request.
    '''

    print("current user", current_user)

    user = current_user
    creator_id = user.id
    form = PostReviewForm()

    form['csrf_token'].data = request.cookies['csrf_token'] # Boilerplate code

    # refactor this for more refined query than last name
    # form_prof_last_name = form.data['prof']
    # db_prof = Prof.query.filter(Prof.last_name == form_prof_last_name).first()
    # print('prof last name from form', form_prof_last_name)
    # print("prof from backend query?", db_prof)
    # print('intelligence from form', form.data['intelligence'])
    # print('review text from form', form.data['review'])
    # prof_id = db_prof.id


    # form_course_name = form.data['course']
    # db_course = Course.query.filter(Course.name == form_course_name).first()
    # course_id = db_course.id

    # this form info gets added to db
    # need ids for prof_id and course_id here
    # should be sending ids from the frontend

    if form.validate_on_submit():
        new_review = Review(
            creator_id=creator_id,
            prof_id=1,
            course_id=1,
            review=form.data['review'],
            intelligence=form.data['intelligence'],
            wisdom=form.data['wisdom'],
            charisma=form.data['charisma'],
            knowledge=form.data['knowledge'],
            preparation=form.data['preparation'],
            respect=form.data['respect'],
            difficulty=form.data['difficulty'],
            for_credit=form.data['for_credit'],
            attendance=form.data['attendance'],
            would_recommend=form.data['would_recommend'],
            textbook=form.data['textbook'],
            time_stamp=datetime.now()
        )

        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()

    else:
        return form.errors


@review_routes.route('/<int:id>', methods = ['DELETE', 'PUT'])
def put_delete_review(id):
    '''
    Queries for the review to update or delete, performs the update or delete, updates the database, and returns the updated/deleted review in a dictionary.
    '''

    if request.method == 'PUT':
        updated_review = Review.query.get(id)
        data = request.get_json()
        updated_review.prof = data['prof']
        updated_review.course = data['course']
        updated_review.intelligence = data['intelligence']
        updated_review.wisdom = data['wisdom']
        updated_review.charisma = data['charisma']
        updated_review.knowledge = data['knowledge']
        updated_review.preparation = data['preparation']
        updated_review.respect = data['respect']
        updated_review.difficulty = data['difficulty']
        updated_review.for_credit = data['for_credit']
        updated_review.attendance = data['attendance']
        updated_review.would_recommend = data['would_recommend']
        updated_review.textbook = data['textbook']
        db.session.commit()
        return updated_review.to_dict()

    # else, method must be DELETE
    review_to_delete = Review.query.get(id)
    db.session.delete(review_to_delete)
    db.session.commit()
    return review_to_delete.to_dict()
