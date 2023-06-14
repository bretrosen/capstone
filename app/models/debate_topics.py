from .db import db, environment, SCHEMA, add_prefix_for_prod


class DebateTopic(db.Model):
    __tablename__= 'debate_topics'

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    topic = db.Column(db.String(255), nullable=False)

    debates = db.relationship('Debate', back_populates='topic')

    def to_dict(self):
        return {
            'id': self.id,
            'topic': self.topic
        }
