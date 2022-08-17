from flask import Flask, render_template
from blueprints import user_bp


app = Flask(__name__)
app.register_blueprint(user_bp)


@app.route('/')
def hello():
    return render_template('index.html')


@app.route('/user/<name>')
def user(name):
    return render_template('hello.html', name=name)


if __name__ == '__main__':
    app.run(debug=True)
