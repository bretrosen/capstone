from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, BooleanField
from wtforms.validators import DataRequired, ValidationError, Length, NumberRange

class PostCourseForm(FlaskForm):
    name = StringField('Name', validators = [DataRequired(), Length (min=10, max=100, message='Course name of 10 to 100 characters is required')])
    department = StringField("Department", validators=[DataRequired()])
