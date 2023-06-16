from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, BooleanField
from wtforms.validators import DataRequired, ValidationError, Length, NumberRange
from app.models import Prof, Course

# all_profs = Prof.query.all()
# PROFS = [prof.last_name for prof in all_profs]
# all_courses = Course.query.all
# COURSES = [course.name for course in all_courses]

# FIX THIS
# OR MAYBE IT DOESN'T NEED TO BE A SELECT FIELD?
# COULD JUST HAVE A VALIDATION IF USER INPUT DOESN'T MATCH EXISTING PROF OR COURSE
# PROFS = ['Shakespeare', 'Marx', 'Newton']
# COURSES = ['Market Economies', 'Anthropology of the Unknown', 'Postmodern American Literature']

# maybe change numerical attributes to be 1 to 5 to match target site?
class PostReviewForm(FlaskForm):
    prof = IntegerField("Prof", validators=[DataRequired()])
    course = IntegerField("Course", validators=[DataRequired()])
    review = StringField('Review', validators=[DataRequired(), Length(min=10, max=350, message='Reviews must be between 10 and 350 characters')])
    intelligence = IntegerField('Intelligence', validators=[DataRequired(), NumberRange(min=1, max=20, message='Attributes must be integers between 1 and 20')])
    wisdom = IntegerField('Wisdom', validators=[DataRequired(), NumberRange(min=1, max=20, message='Attributes must be integers between 1 and 20')])
    charisma = IntegerField('Charisma', validators=[DataRequired(), NumberRange(min=1, max=20, message='Attributes must be integers between 1 and 20')])
    knowledge = IntegerField('Knowledge', validators=[DataRequired(), NumberRange(min=1, max=20, message='Attributes must be integers between 1 and 20')])
    preparation = IntegerField('Preparation', validators=[DataRequired(), NumberRange(min=1, max=20, message='Attributes must be integers between 1 and 20')])
    respect = IntegerField('Respect', validators=[DataRequired(), NumberRange(min=1, max=20, message='Attributes must be integers between 1 and 20')])
    difficulty = IntegerField('Difficulty', validators=[DataRequired(), NumberRange(min=1, max=20, message='Attributes must be integers between 1 and 20')])
    for_credit = BooleanField('For Credit')
    attendance = BooleanField('Attendance')
    would_recommend = BooleanField("Would Recommend")
    textbook = BooleanField('Textbook')
