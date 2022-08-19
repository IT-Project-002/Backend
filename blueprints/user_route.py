from flask import Blueprint, render_template, redirect, url_for, request

from blueprints.forms import RegistrationForm
from connections import mail, db
from flask_mail import Message

from models import UserModel

bp = Blueprint("user", __name__, url_prefix='/user')


@bp.route("/register", methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return render_template("register.html")
    else:
        form = RegistrationForm(request.form)
        db.session.execute('CREATE TABLE IF NOT EXISTS users ('
                           'id SERIAL PRIMARY KEY,'
                           'username varchar (150) NOT NULL,'
                           'email varchar (50) NOT NULL,'
                           'password varchar(50) NOT NULL,'
                           'join_time timestamp NOT NULL);')
        if form.validate():
            email = form.email.data
            username = form.username.data
            password = form.password.data
            user = UserModel(email=email, username=username, password=password)
            db.session.add(user)
            db.session.commit()
            return redirect(url_for("user.login"))
        else:
            return redirect(url_for("user.register"))


@bp.route("/login", methods=['GET', 'POST'])
def login():
    return render_template('login.html')


# not yet ready for connect
# @bp.route("/captcha")
# def get_captcha():
#     letters = string.ascii_letters + string.digits
#     captcha = "".join(random.sample(letters, 6))
#     message = Message(
#         subject="Email Verification",
#         recipients=['dilu0828@gmail.com'],
#         body=f"your verification code for registration is {captcha}, If u didn't request for one, please ignore"
#     )
#     mail.send(message)
#     return 'success'
