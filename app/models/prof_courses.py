from .db import db, environment, SCHEMA, add_prefix_for_prod

# join table for profs and courses
# better named as class_assignments or something?
prof_courses = db.Table(
    "prof_courses",
    db.Model.metadata,
    db.Column("id", db.Integer, primary_key=True),
    db.Column("prof_id", db.Integer, db.ForeignKey(add_prefix_for_prod("profs.id"))),
    db.Column(
        "course_id", db.Integer, db.ForeignKey(add_prefix_for_prod("courses.id"))
    )
)

if environment == "production":
    prof_courses.schema = SCHEMA
