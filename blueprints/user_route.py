import random
import string

from flask import Blueprint, request, redirect, render_template, url_for
from DB_operation import db_operation
from connect_db import user_db
from connect_mail import mail
from instance import User
from forms import RegistrationForm
from flask_mail import Message

bp = Blueprint("user", __name__, url_prefix='/user')


@bp.route("/register", methods=['GET', 'POST'])
def register():
    operation = db_operation(user_db)
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


@bp.route("/login", methods=['GET', 'POST'])
def login():
    return render_template('login.html')


@bp.route("/captcha")
def get_captcha():
    letters = string.ascii_letters + string.digits
    captcha = "".join(random.sample(letters, 6))
    message = Message(
        subject="Email Verification",
        recipients=['dilu0828@gmail.com'],
        body=f"your verification code for registration is {captcha}, If u didn't request for one, please ignore"
    )
    mail.send(message)
    return 'success'
