from flask import Blueprint, request
from flask_login import login_required, current_user
from datetime import datetime
from app.models import db, Review, Prof, Course, Department
from app.forms.post_course_form import PostCourseForm

course_routes = Blueprint('courses', __name__)


@course_routes.route('/')
def all_courses():
    '''
    Query for all courses. Get the department name for each course. Return results in a dictionary.
    '''

    all_courses = Course.query.all()
    courses_dict = [course.to_dict() for course in all_courses]
    for course in courses_dict:
        department = (Department.query.filter(Department.id == course['department_id']).one()).to_dict()
        course['department'] = department['name']

    return {'courses': courses_dict}

@course_routes.route('/<int:id>')
def single_course(id):
    '''
    Query for a single course by id. Return result in a dictionary.
    '''

    course = Course.query.get(id)
    return course.to_dict()

@course_routes.route('/new', methods=['GET', 'POST'])
@login_required
def post_course():
    '''
    Renders an empty form for the GET request. Validates the form and creates a new course for the POST request.
    '''

    user = current_user
    creator_id = user.id
    form = PostCourseForm()

    form['csrf_token'].data = request.cookies['csrf_token'] # Boilerplate code

    if form.validate_on_submit():
        new_course = Course(
            creator_id=creator_id,
            name=form.data['name'],
            department_id=form.data['department']
        )

        db.session.add(new_course)
        db.session.commit()
        return new_course.to_dict

    else:
        return form.errors


@course_routes.route('/<int:id>', methods=['DELETE', 'PUT'])
@login_required
def put_delete_course(id):
    '''
    Queries for the course to update or delete, performs the update or delete, updates the database, and returns the updated/deleted course in a database.
    '''

    if request.method == 'PUT':
        updated_course = Course.query.get(id)
        data = request.get_json()
        updated_course.name = data['name']
        updated_course.department_id = data['department']
        db.session.commit()
        return updated_course.to_dict()

    # else, method must be DELETE
    course_to_delete = Course.query.get(id)
    db.session.delete(course_to_delete)
    db.session.commit()
    return course_to_delete.to_dict()
