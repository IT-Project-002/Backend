from flask import Blueprint, render_template, redirect, url_for, request, session, flash, jsonify
from blueprints.forms import RegistrationForm, LoginForm
from connections import mail, db
from flask_mail import Message
from werkzeug.security import generate_password_hash, check_password_hash
from models import UserModel
import json
import wtforms_json
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, \
    unset_jwt_cookies, jwt_required, JWTManager
bp = Blueprint("user", __name__, url_prefix='/users')


@bp.route("/register", methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return {1:'register'}
    else:
        print(json.loads(request.data))
        form = RegistrationForm.from_json(json.loads(request.data))
        email = form.email.data
        username = form.username.data
        password = form.password.data
        hash_password = generate_password_hash(password)
        bio = form.bio.data
        avatar = form.avatar.data
        user = UserModel(email=email, username=username, password=hash_password, bio=bio, avatar=avatar)
        db.session.add(user)
        db.session.commit()
        return redirect(url_for("user.login"))


@bp.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return {1:'login'}
    else:
        form = LoginForm.from_json(json.loads(request.data))
        if form.validate():
            email = form.email.data
            password = form.password.data
            user = UserModel.query.filter_by(email=email).first()
            if user and check_password_hash(user.password, password):
                create_access_token(identity=email)
                response = {"access_token": create_access_token(identity=email)}
                return response
            else:
                return redirect(url_for("user.login"))
        else:
            return redirect(url_for("user.login"))


@bp.route("/market", methods=['GET'])
@jwt_required()
def market():
    # user name bio ,
    current_user = get_jwt_identity()
    user = UserModel.query.filter_by(email=current_user).first()
    return {
            "userID": user.id,
            "username": user.username,
            "userEmail": user.email,
            "JoinTime": user.join_time,
            "Bio": user.bio,
            "Avatar": user.avatar
          }


@bp.route("/logout", methods=['POST'])
def logout():
    if request.method == 'POST':
        response = jsonify({"msg": "logout successful"})
        print("logout la")
        unset_jwt_cookies(response)
        return response


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
