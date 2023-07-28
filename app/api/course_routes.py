from flask import Blueprint, request
from flask_login import login_required, current_user
from datetime import datetime
from statistics import mean
from app.models import db, Review, Prof, Course, Department
from app.forms.post_course_form import PostCourseForm

course_routes = Blueprint('courses', __name__)

# helper function to return % of trues for Boolean input
def percent_true(boolean_lst):
    count = 0
    for boolean in boolean_lst:
        if boolean == True:
            count += 1
    return (count / len(boolean_lst)) * 100

@course_routes.route('/')
def all_courses():
    '''
    First, query for all reviews, and get the average rating score for each course. Query for all courses for the display all courses page. Add the aggregate data to the course dictionary. Get the department name for each course. Return results in a dictionary.
    '''

    all_reviews = Review.query.all()
    reviews_dict = [review.to_dict() for review in all_reviews]

    # add a quality field to each review that is an average of all ratings
    for review in reviews_dict:
        review['quality'] = mean([review['intelligence'], review['wisdom'], review['charisma'], review['knowledge'], review['preparation'], review['respect']])

    all_courses = Course.query.all()
    courses_dict = [course.to_dict() for course in all_courses]

    # add department for each course and create empty lists for aggregate data
    for course in courses_dict:
        department = (Department.query.filter(Department.id == course['department_id']).one()).to_dict()
        course['department'] = department['name']
        course['qualities'] = []
        course['difficulties'] = []
        course['recommendations'] = []

    # copying logic from prof routes for now
    # let's see about refactoring
    for course in courses_dict:
        for review in reviews_dict:
            if (review['course_id'] == course['id']):
                course['qualities'].append(review['quality'])
                course['difficulties'].append(review['difficulty'])
                course['recommendations'].append(review['would_recommend'])
        # aggregate data for each course
        # mean will throw an error with no data points
        if (len(course['qualities']) > 0):
            course['quality'] = mean(course['qualities'])
        if (len(course['difficulties']) > 0):
            course['difficulty'] = mean(course['difficulties'])
        if (len(course['recommendations']) > 0):
            course['recommended'] = percent_true(course['recommendations'])

    # print("courses in backend route =========>", courses_dict)

    return {'courses': courses_dict}

@course_routes.route('/<int:id>')
def single_course(id):
    '''
    Query for a single course by id. Query for all the reviews for that course. Return a dictionary with the course's attributes, aggregate data, and all reviews of the course.
    '''

    course = Course.query.get(id)
    course_data = course.to_dict()
    reviews = Review.query.filter(Review.course_id == course.id).all()
    reviews_dict = [review.to_dict() for review in reviews]
    course_data['reviews'] = reviews_dict

    # add quality and prof name to reviews dictionary
    for review in reviews_dict:
        prof = Prof.query.filter(Prof.id == review['prof_id']).one()
        review['prof_name'] = prof.to_dict()['first_name']
        review['prof_name'] += ' ' + prof.to_dict()['last_name']
        review['quality'] = mean([review['intelligence'], review['wisdom'], review['charisma'], review['knowledge'], review['preparation'], review['respect']])


    # add department name
    department = (Department.query.filter(Department.id == course_data['department_id']).one()).to_dict()
    course_data['department'] = department['name']


    # print('all reviews associated with course ============>', reviews_dict)
    return course_data

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
        return new_course.to_dict()

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


@course_routes.route('/departments')
def get_departments():
    '''
    Queries for and returns all the department names.
    '''

    departments = Department.query.all()
    departments_dict = [(department.to_dict())['name'] for department in departments]

    return departments_dict
