from flask import Flask, render_template
from DB_operation import db_operation
from connect_db import connect_to_userDB
from instance import User

app = Flask(__name__)


@app.route('/')
def hello():
    new_user = User('DI Lu', 'dilu0828@hotmail.com', '123')
    operation.create_user_record(new_user)
    return render_template('index.html')


@app.route('/user/<name>')
def user(name):
    return render_template('hello.html', name=name)


if __name__ == '__main__':
    db = connect_to_userDB()
    operation = db_operation(db)
    app.run(debug=True)
