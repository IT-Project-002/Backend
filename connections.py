from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail
import boto3

mail = Mail()
db = SQLAlchemy()
# s3 = boto3.client('s3',
#             region_name = app.config.get("REGION_NAME"),
#             aws_access_key_id = app.config.get("AWS_ACCESS_KEY_ID"),
#             aws_secret_access_key = app.config.get("AWS_SECRET_ACCESS_KEY"))