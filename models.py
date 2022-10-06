from datetime import datetime
from connections import db
import uuid
from sqlalchemy.dialects.postgresql import UUID


class UserModel(db.Model):
    __tablename__ = "users"
    uuid = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4())
    username = db.Column(db.String(200), nullable=False, unique=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(200), nullable=False)
    join_time = db.Column(db.DateTime, default=datetime.now)
    bio = db.Column(db.String(200), nullable=True)
    avatar = db.Column(db.String(200), nullable=False)
    hide_email = db.Column(db.Boolean,default=False, nullable=False)


class ProductModel(db.Model):
    __tablename__ = "products"
    uuid = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4())
    user = db.Column(db.String(200), nullable=False)
    name = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Numeric, nullable=False)
    tags = db.Column(db.ARRAY(db.String(200)), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    images = db.Column(db.ARRAY(db.String(200)), nullable=False)
    add_time = db.Column(db.DateTime, default=datetime.now)

    # def update(self, **kwargs):
    #     for key, value in kwargs.items():
    #         if hasattr(self, key):
    #             setattr(self, key, value)


class LikeModel(db.Model):
    __tablename__ = "likes"
    user = db.Column(UUID(as_uuid=True), primary_key=True)
    product = db.Column(UUID(as_uuid=True), primary_key=True)
    add_time = db.Column(db.DateTime, default=datetime.now)