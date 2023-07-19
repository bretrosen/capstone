from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, DebateTopic
from app.forms.post_debate_topic_form import PostDebateTopicForm

debate_topic_routes = Blueprint('debate_topics', __name__)


@debate_topic_routes.route('/')
def all_debate_topics():
    '''
    Query for all debate topics and return a dictionary of them.
    '''

    all_debate_topics = DebateTopic.query.all()
    topics_dict = [topic.to_dict() for topic in all_debate_topics]

    return {'debate_topics': topics_dict}

@debate_topic_routes.route('/new', methods=['GET', 'POST'])
@login_required
def post_topic():
    '''
    Renders an empty form for the GET request. Validates the form and creates a new debate topic for the POST request.
    '''

    form = PostDebateTopicForm()

    form['csrf_token'].data = request.cookies['csrf_token'] # Boilerplate code

    if form.validate_on_submit():
        new_topic = DebateTopic(
            topic = form.data['topic']
        )

        db.session.add(new_topic)
        db.session.commit()
        return new_topic.to_dict()

    else:
        return form.errors
