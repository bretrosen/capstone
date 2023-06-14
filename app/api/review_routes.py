from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy import desc
from datetime import datetime
from app.models import db, Review, Prof, Course
from app.forms.post_review_form import PostReviewForm

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/')
def all_reviews():
    '''
    Query for all reviews for the display all review page. Order descending by datetime, so newest reviews appear first. Return results in a dictionary.
    '''

    print("current user", current_user)

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

    print("current user", current_user)

    # user = current_user
    # creator_id = user.id
    creator_id = 1
    form = PostReviewForm()

    # refactor this prob for more refined than last name
    form_prof_last_name = form.data['prof']
    db_prof = Prof.query.filter(Prof.last_name == form_prof_last_name).first()
    prof_id = db_prof.id

    form_course_name = form.data['course']
    db_course = Course.query.filter(Course.name == form_course_name).first()
    course_id = db_course.id

    form['csrf_token'].data = request.cookies['csrf_token'] # Boilerplate code

    if form.validate_on_submit():
        new_review = Review(
            creator_id=creator_id,
            prof_id=prof_id,
            course_id=course_id,
            review=form.data['review'],
            intelligence=form.data['intelligence'],
            wisdom=form.data['wisdom'],
            charisma=form.data['charisma'],
            knowledge=form.data['knowledge'],
            preparation=form.data['preparation'],
            respect=form.data['respect'],
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
