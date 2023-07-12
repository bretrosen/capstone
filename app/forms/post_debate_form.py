from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, BooleanField
from wtforms.validators import DataRequired, ValidationError, Length, NumberRange

class PostDebateForm(FlaskForm):
    topic = StringField("Topic", validators=[DataRequired(), Length(min=5, max=150, message='Debate topics must be between 5 and 150 characters')])
    prof1 = IntegerField("Prof1", validators=[DataRequired()])
    prof2 = IntegerField("Prof1", validators=[DataRequired()])
    field = StringField("Field", validators=[DataRequired()])
