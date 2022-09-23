from datetime import timedelta
from flask import Flask, session, g
from flask_cors import CORS
import config
from blueprints import user_bp
from connections import mail, db
from flask_migrate import Migrate
import boto3

from models import UserModel

app = Flask(__name__)
cors = CORS(app, resources={'/*':{'origins': 'http://localhost:3000'}})
app.config.from_object(config)
db.init_app(app)
mail.init_app(app)
# s3 = boto3.client('s3',
#             region_name = app.config.get("REGION_NAME"),
#             aws_access_key_id = app.config.get("AWS_ACCESS_KEY_ID"),
#             aws_secret_access_key = app.config.get("AWS_SECRET_ACCESS_KEY"))

migrate = Migrate(app, db)

app.register_blueprint(user_bp)


@app.before_request
def before_request():
    user_id = session.get("user_id")
    if user_id:
        try:
            user = UserModel.query.get(user_id)
            setattr(g, "user", user)
            session.permanent = True
            app.permanent_session_lifetime = timedelta(minutes=1)
        except:
            g.user = None


@app.context_processor
def context_processor():
    if hasattr(g, "user"):
        return {"user": g.user}
    else:
        return {}


if __name__ == '__main__':
    app.run(debug=True, port=9000)
