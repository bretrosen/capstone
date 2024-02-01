from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, IntegerField, SelectField, BooleanField
from wtforms.validators import DataRequired, ValidationError, Length, NumberRange
from ..api.AWS_helpers import ALLOWED_EXTENSIONS

class PostProfForm(FlaskForm):
    first_name = StringField('First Name', validators = [DataRequired(), Length(max=20, message='First name of 20 or fewer characters is required')])
    last_name = StringField('Last Name', validators = [DataRequired(), Length(max=20, message='Last name of 20 or fewer characters is required')])
    field = StringField('Field', validators = [DataRequired(), Length(max=50, message='Professor field of study of 50 or fewer characters is required')])
    image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
