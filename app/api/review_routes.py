from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy import desc
from app.models import db, Review, Prof, Course
from app.forms.post_review_form import PostReviewForm

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/')
def all_reviews():
    '''
    Query for all reviews for the display all review page. Order descending by datetime, so newest reviews appear first. Return results in a dictionary.
    '''

    all_review_query = Review.query.all()

    all_reviews = Review.query.filter().order_by(desc(Review.time_stamp))
    return {'reviews': [review.to_dict() for review in all_reviews]}


@review_routes.route('/<int:id>')
def single_review(id):
    '''
    Query for a single review by id and return it in a dictionary.
    '''

    review = Review.query.get(id)
    return review.to_dict()

@review_routes.route('/', methods = ['POST'])
@login_required
def post_review():
    '''
    Query for current user, convert professor and course strings to the appropriate ids, add the review, and update the database.
    '''

    user = current_user
    creator_id = user.id
    form = PostReviewForm()

    # need to refine this, get it working for grabbing the first last name
    form_prof_last_name = form.data['prof']
    db_prof = Prof.query.filter(Prof.last_name == form_prof_last_name).first()
    prof_id = db_prof.id

    form_course_name = form.data['course']
    db_course = Course.query.filter(Course.name == form_course_name).first()
    course_id = db_course.id

    if form.validate_on_submit():
        new_review = Review(
            creator_id=creator_id,
            prof_id=prof_id,
            course_id=course_id,
            review=form.data['review']
        )
