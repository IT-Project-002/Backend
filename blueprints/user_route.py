from tokenize import Double
from flask import Blueprint, render_template, redirect, url_for, request, session, flash
from blueprints.forms import RegistrationForm, LoginForm
from connections import mail, db
from flask_mail import Message
from werkzeug.security import generate_password_hash, check_password_hash
from models import UserModel, ProductModel
import json
import wtforms_json
import boto3
from boto.s3.key import Key
from werkzeug.utils import secure_filename
import requests
from io import BytesIO
bp = Blueprint("user", __name__, url_prefix='/user')


@bp.route("/register", methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return {1:'register'}
    else:
        print(json.loads(request.data))
        print(type(json.loads(request.data)))
        print(type(request.data))
        form = RegistrationForm.from_json(json.loads(request.data))
        if True:
            # if form.validate():
            print("form validate")
            email = form.email.data
            username = form.username.data
            password = form.password.data
            hash_password = generate_password_hash(password)
            user = UserModel(email=email, username=username, password=hash_password)
            db.session.add(user)
            db.session.commit()
            # print("done")
            return redirect(url_for("user.login"))
        else:
            return redirect(url_for("user.register"))


@bp.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return {1:'login'}
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


@bp.route("/upload", methods=['GET', 'POST'])
def upload():
    if request.method == 'GET':
        return {1:'upload'}
    else:
        form = request.form
        username = "lily"
        name = form.get("itemName")
        price = float(form.get("price"))
        tags = [i["value"] for i in json.loads(form.get("tags"))]
        images = [f"{username}/{name}/{i}" for i in range(len(request.files))]
        s3 = boto3.client('s3',
                    region_name='ap-southeast-2',
                    aws_access_key_id='AKIA3V2C4OGZ2UVFEEHG',
                    aws_secret_access_key= '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')
        bucket_name = 'it-project-002'
        for i in range(len(request.files)):
            s3.upload_fileobj(
                request.files.get(str(i)),
                bucket_name,
                f"{username}/{name}/{i}",
                ExtraArgs={
                    "ContentType": request.files.get(str(i)).content_type
                }
            )
        product = ProductModel(username=username, name=name, price=price, tags=tags, images=images)
        db.session.add(product)
        db.session.commit()
        return {}


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
