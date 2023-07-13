from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class PostDebateForm(FlaskForm):
    topic = IntegerField("Topic", validators=[DataRequired()])
    prof1 = IntegerField("Prof1", validators=[DataRequired()])
    prof2 = IntegerField("Prof1", validators=[DataRequired()])
    field = StringField("Field", validators=[DataRequired(), Length(min=5, max=50, message='Field must be between 5 and 50 characters')])
