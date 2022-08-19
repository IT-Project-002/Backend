from flask import Flask, render_template
import config
from blueprints import user_bp
from connections import mail, db
from flask_migrate import Migrate

app = Flask(__name__)
app.config.from_object(config)
db.init_app(app)
mail.init_app(app)

migrate = Migrate(app, db)

app.register_blueprint(user_bp)

if __name__ == '__main__':
    app.run(debug=True, port=9000)
