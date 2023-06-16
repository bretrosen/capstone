from flask import Blueprint, request
from flask_login import login_required, current_user
from datetime import datetime
from app.models import db, Review, Prof, Course

course_routes = Blueprint('courses', __name__)


@course_routes.route('/')
def all_courses():
    '''
    Query for all courses. Return results in a dictionary.
    '''

    all_courses = Course.query.all()
    courses_dict = [course.to_dict() for course in all_courses]

    return {'courses': courses_dict}
