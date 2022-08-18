from flask import Flask, render_template
import config
from blueprints import user_bp
from connections import mail

app = Flask(__name__)
app.config.from_object(config)
app.register_blueprint(user_bp)
mail.init_app(app)


@app.route('/')
def hello():
    return render_template('index.html')


@app.route('/user/<name>')
def user(name):
    return render_template('hello.html', name=name)


if __name__ == '__main__':
    app.run(debug=True, port=9000)
