from .db import db, environment, SCHEMA, add_prefix_for_prod
from .prof_courses import prof_courses

class Prof(db.Model):
    __tablename__ = "profs"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    creator_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    first_name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(20), nullable=False)
    field = db.Column(db.String(50), nullable=False)

    reviews = db.relationship('Review', back_populates='prof', cascade='all, delete')
    user = db.relationship('User', back_populates='profs')
    debates1 = db.relationship('Debate', foreign_keys='Debate.prof1_id', back_populates='prof1', cascade='all, delete')
    debates2 = db.relationship('Debate', foreign_keys='Debate.prof2_id', back_populates='prof2', cascade='all, delete')

    courses = db.relationship('Course', secondary=prof_courses, back_populates='profs')

    def to_dict(self):
        return {
            "id": self.id,
            "creator_id": self.creator_id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "field": self.field
        }
