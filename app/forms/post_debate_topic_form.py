from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class PostDebateTopicForm(FlaskForm):
    topic = StringField("Topic", validators=[DataRequired(), Length(min=5, max=150, message="Debate topis must be between 5 and 150 characters")])
