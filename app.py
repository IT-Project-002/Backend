from flask import Flask, render_template, request, url_for, redirect
from DB_operation import db_operation
from connect_db import connect_to_userDB
from instance import User
from register_form import RegistrationForm

app = Flask(__name__)


@app.route('/')
def hello():
    return render_template('index.html')


@app.route('/user/<name>')
def user(name):
    return render_template('hello.html', name=name)


@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegistrationForm(request.form)
    if request.method == 'POST':
        if form.validate():
            new_user = User(form.name.data,
                            form.email.data,
                            form.password.data)
            operation.create_user_record(new_user)
        else:
            return redirect(url_for("user", name='DI LU'))
    return render_template('register.html')


if __name__ == '__main__':
    db = connect_to_userDB()
    operation = db_operation(db)
    app.run(debug=True)
