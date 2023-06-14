from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, BooleanField
from wtforms.validators import DataRequired, ValidationError, Length, NumberRange
from app.models import Prof, Course

# all_profs = Prof.query.all()
# PROFS = [prof.last_name for prof in all_profs]
# all_courses = Course.query.all
# COURSES = [course.name for course in all_courses]

# FIX THIS
PROFS = ['Shakespeare', 'Marx', 'Newton']
COURSES = ['Market Economies', 'Anthropology of the Unknown', 'Postmodern American Literature']

class PostReviewForm(FlaskForm):
    prof = SelectField("Prof Last Name", choices=PROFS)
    course = SelectField("Course", choices=COURSES)
    review = StringField('Review', validators=[DataRequired(), Length(min=30, message='Reviews must be at least 30 characters long')])
    intelligence = IntegerField('Intelligence', validators=[DataRequired(), NumberRange(min=1, max=20, message='Attributes must be integers between 1 and 20')])
    wisdom = IntegerField('Wisdom', validators=[DataRequired(), NumberRange(min=1, max=20, message='Attributes must be integers between 1 and 20')])
    charisma = IntegerField('Charisma', validators=[DataRequired(), NumberRange(min=1, max=20, message='Attributes must be integers between 1 and 20')])
    knowledge = IntegerField('Knowledge', validators=[DataRequired(), NumberRange(min=1, max=20, message='Attributes must be integers between 1 and 20')])
    preparation = IntegerField('Preparation', validators=[DataRequired(), NumberRange(min=1, max=20, message='Attributes must be integers between 1 and 20')])
    respect = IntegerField('Respect', validators=[DataRequired(), NumberRange(min=1, max=20, message='Attributes must be integers between 1 and 20')])
    for_credit = BooleanField('For Credit')
    attendance = BooleanField('Attendance')
    would_recommend = BooleanField("Would Recommend")
    textbook = BooleanField('Textbook')