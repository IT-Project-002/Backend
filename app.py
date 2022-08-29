from datetime import timedelta

from flask import Flask, session, g
import config
from blueprints import user_bp
from connections import mail, db
from flask_migrate import Migrate

from models import UserModel

app = Flask(__name__)
app.config.from_object(config)
db.init_app(app)
mail.init_app(app)

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
