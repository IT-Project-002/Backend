import json
from datetime import datetime, timezone, timedelta
from flask import Flask, session, g, request
from flask_cors import CORS
import config
from blueprints import user_bp
from connections import mail, db
from flask_migrate import Migrate
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager
from models import UserModel

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
app.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=10)
jwt = JWTManager(app)
cors = CORS(app)
app.config.from_object(config)
db.init_app(app)
mail.init_app(app)

migrate = Migrate(app, db)

app.register_blueprint(user_bp)

@app.route('/')
def index():
    return app.send_static_file('index.html')
# this part not done yet
@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            # print('new token: '+access_token)
            data = response.get_data()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response


if __name__ == '__main__':
    app.run(debug=True, port=9000)
