from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def confirm_password_matches(form, field):
    # Check to see that confirm password field matches password field
    confirm_password = field.data
    password = form.data['password']
    if confirm_password != password:
        raise ValidationError("Confirm Password field must be the same as the Password field")

class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), Length(min=4,max=40), username_exists])
    email = StringField('email', validators=[DataRequired(), Length(min=6, max=255), Email(), user_exists])
    password = StringField('password', validators=[DataRequired(), Length(min=6, max=40)])
    confirm_password = StringField('confirm_password', validators=[DataRequired(), Length(min=6, max=40), confirm_password_matches])
    first_name = StringField('first_name', validators=[DataRequired(), Length(max=20)])
    last_name = StringField('last_name', validators=[DataRequired(), Length(max=20)])
