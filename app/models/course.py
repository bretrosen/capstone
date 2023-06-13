from .db import db, environment, SCHEMA, add_prefix_for_prod
from .prof_courses import prof_courses

class Course(db.Model):
    __tablename__='courses'

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    creator_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    department_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('departments.id')))
    name = db.Column(db.String(100), nullable=False)

    user = db.relationship('User', back_populates='courses')
    departments = db.relationship('Department', back_populates='course')

    profs = db.relationship('Prof', secondary=prof_courses, back_populates='courses')

    def to_dict(self):
        return {
            'id': self.id,
            'creator_id': self.creator_id,
            'department_id': self.department_id,
            'name': self.name
        }
