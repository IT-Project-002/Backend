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
        form = json.loads(request.data)
        print(form)
        username = "lily"
        name = form["itemName"]
        price = float(form["price"])
        tags = [i["value"] for i in form["tags"]]
        images = [f"{username}/{name}/{i}" for i in range(len(form["selectedImages"]))]
        s3 = boto3.client('s3',
                    region_name='ap-southeast-2',
                    aws_access_key_id='AKIA3V2C4OGZ2UVFEEHG',
                    aws_secret_access_key= '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')
        bucket_name = 'it-project-002'
        # for i in range(len(request.files)):
        #     s3.upload_fileobj(
        #         request.files[i],
        #         bucket_name,
        #         f"{username}/{name}/{i}",
        #         ExtraArgs={
        #             "ContentType": request.files[i].content_type
        #         }
        #     )
        # for i in range(len(form['selectedImages'])):
        #     url = form['selectedImages'][i]
        #     r = requests.get(url)
        #     k = Key(bucket_name)
        #     k.key = f"{username}/{name}/{i}"
        #     k.content_type = r.headers['content-type']
        #     k.set_contents_from_string(r.content)
        product = ProductModel(username=username, name=name, price=price, tags=tags, images=images)
        # db.session.add(product)
        # db.session.commit()
        return {}


# @app.route('/', methods=['POST'])
# def upload():
#     if request.method == "POST":
#         f = request.files['file']
#         s3.upload_fileobj(
#             f,
#             bucket_name,
#             secure_filename(f.filename),
#             ExtraArgs={
#                 "ContentType": f.content_type
#             }
#         )
#     return redirect("/display")

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
