from datetime import datetime
from connections import db


class UserModel(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(200), nullable=False, unique=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(200), nullable=False)
    join_time = db.Column(db.DateTime, default=datetime.now)
    bio = db.Column(db.String(200), nullable=True)
    avatar = db.Column(db.String(200), nullable=False)

class ProductModel(db.Model):
    __tablename__ = "products"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user = db.Column(db.String(200), nullable=False)
    name = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Numeric, nullable=False)
    tags = db.Column(db.ARRAY(db.String(200)), nullable=False)
    images = db.Column(db.ARRAY(db.String(200)), nullable=False)
    add_time = db.Column(db.DateTime, default=datetime.now)
