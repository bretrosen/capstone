from .db import db, environment, SCHEMA, add_prefix_for_prod


class Debate(db.Model):
    __tablename__= 'debates'

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    creator_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    topic_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('debate_topics.id')), nullable=False)
    prof1_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('profs.id')), nullable=False)
    prof2_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('profs.id')), nullable=False)
    field = db.Column(db.String(50), nullable=False)

    user = db.relationship('User', back_populates='debates')
    topic = db.relationship('DebateTopic', back_populates='debates')
    prof1 = db.relationship('Prof', backref ='debates1', foreign_keys=[prof1_id])
    prof2 = db.relationship('Prof', backref='debates2', foreign_keys=[prof2_id])

    def to_dict(self):
        return {
            'id': self.id,
            'creator_id': self.creator_id,
            'topic_id': self.topic_id,
            'prof1_id': self.prof1_id,
            'prof2_id': self.prof2_id,
            'field': self.field
        }
