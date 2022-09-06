from flask import Blueprint, render_template, redirect, url_for, request, session, flash
from blueprints.forms import RegistrationForm, LoginForm
from connections import mail, db
from flask_mail import Message
from werkzeug.security import generate_password_hash, check_password_hash
from models import UserModel
import json
import wtforms_json
bp = Blueprint("user", __name__, url_prefix='/user')


@bp.route("/register", methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return render_template("register.html")
    else:
        print(json.loads(request.data))
        print(type(json.loads(request.data)))
        print(type(request.data))
        form = RegistrationForm.from_json(json.loads(request.data))
        if form.validate():
            print("form validate")
            email = form.email.data
            username = form.username.data
            password = form.password.data
            hash_password = generate_password_hash(password)
            user = UserModel(email=email, username=username, password=hash_password)
            db.session.add(user)
            db.session.commit()
            return redirect(url_for("user.login"))
        else:
            return redirect(url_for("user.register"))


@bp.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template("login.html")
    else:
        print(request)
        form = LoginForm(request.form)
        if form.validate():
            email = form.email.data
            password = form.password.data
            user = UserModel.query.filter_by(email=email).first()
            if user and check_password_hash(user.password, password):
                session['user_id'] = user.id
                return redirect("/")
            else:
                flash("email or password incorrect！")
                return redirect(url_for("user.login"))
        else:
            flash("email or password structure incorrect！")
            return redirect(url_for("user.login"))


@bp.route("/logout")
def logout():
    session.clear()
    return redirect(url_for('user.login'))


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
