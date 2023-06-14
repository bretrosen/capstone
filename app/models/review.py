from .db import db, environment, SCHEMA, add_prefix_for_prod


class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    creator_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    prof_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('profs.id')), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('courses.id')), nullable=False)
    review = db.Column(db.Text, nullable=False)
    intelligence = db.Column(db.Integer, nullable=False)
    wisdom = db.Column(db.Integer, nullable=False)
    charisma = db.Column(db.Integer, nullable=False)
    knowledge = db.Column(db.Integer, nullable=False)
    preparation = db.Column(db.Integer, nullable=False)
    respect = db.Column(db.Integer, nullable=False)
    for_credit = db.Column(db.Boolean, nullable=False)
    attendance = db.Column(db.Boolean, nullable=False)
    would_recommend = db.Column(db.Boolean, nullable=False)
    textbook = db.Column(db.Boolean, nullable=False)
    time_stamp = db.Column(db.DateTime, nullable=False)

    user = db.relationship('User', back_populates='reviews')
    prof = db.relationship('Prof', back_populates='reviews')
    course = db.relationship('Course', back_populates='reviews')

    def to_dict(self):
        return {
            'id': self.id,
            'creator_id': self.creator_id,
            'prof_id': self.prof_id,
            'course_id': self.course_id,
            'review': self.review,
            'intelligence': self.intelligence,
            'wisdom': self.wisdom,
            'knowledge': self.knowledge,
            'respect': self.respect,
            'for_credit': self.for_credit,
            'attendance': self.attendance,
            'would_recommend': self.would_recommend,
            'textbook': self.textbook,
            'time_stamp': self.time_stamp
        }
