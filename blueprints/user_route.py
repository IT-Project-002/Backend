from concurrent.futures import process
from flask import Blueprint, render_template, redirect, url_for, request, session, flash, jsonify
from blueprints.forms import RegistrationForm, LoginForm
from connections import mail, db
from flask_mail import Message
from werkzeug.security import generate_password_hash, check_password_hash
from models import UserModel, ProductModel
import json
import wtforms_json
from tokenize import Double
import boto3
from boto.s3.key import Key
from werkzeug.utils import secure_filename
from io import BytesIO
import uuid
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, \
    unset_jwt_cookies, jwt_required, JWTManager

bp = Blueprint("user", __name__, url_prefix='/users')


@bp.route("/register", methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return {1: 'register'}
    else:
        print(json.loads(request.data))
        form = RegistrationForm.from_json(json.loads(request.data))
        email = form.email.data
        username = form.username.data
        password = form.password.data
        hash_password = generate_password_hash(password)
        bio = form.bio.data
        avatar = form.avatar.data
        randomid = uuid.uuid4()
        user = UserModel(uuid=randomid, email=email, username=username, password=hash_password, bio=bio, avatar=avatar)
        db.session.add(user)
        db.session.commit()
        return redirect(url_for("user.login"))


@bp.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return {1: 'login'}
    else:
        form = LoginForm.from_json(json.loads(request.data))
        if form.validate():
            email = form.email.data
            password = form.password.data
            user = UserModel.query.filter_by(email=email).first()
            if user and check_password_hash(user.password, password):
                create_access_token(identity=email)
                response = {"access_token": create_access_token(identity=email),
                            "uuid": user.uuid
                }
                print(response)
                return response
            else:
                return redirect(url_for("user.register"))
        else:
            return redirect(url_for("user.login"))


@bp.route("/market/<uuid>", methods=['GET'])
@jwt_required()
def market(uuid):
    # user name bio ,
    # current_user = get_jwt_identity()
    user = UserModel.query.filter_by(uuid=uuid).first()
    products = ProductModel.query.filter_by(user=user.email).all()
    products.sort(key=lambda p: p.add_time)
    # print(products)
    uniq_prods_name = []
    uniq_prods_link = []
    uniq_prods_id = []
    uniq_prods_price = []
    uniq_prods_tags = []
    for prod in products:
        uniq_prods_name.append(prod.name)
        uniq_prods_link.append(prod.images[0])
        uniq_prods_id.append(prod.uuid)
        uniq_prods_price.append(prod.price)
        uniq_prods_tags.append(prod.tags)
    # print(uniq_prods_link)
    return {
        "userID": user.uuid,
        "username": user.username,
        "userEmail": user.email,
        "JoinTime": user.join_time,
        "Bio": user.bio,
        "Avatar": user.avatar,
        "item_names": uniq_prods_name,
        "item_links": uniq_prods_link,
        "item_id": uniq_prods_id,
        "item_price": uniq_prods_price,
        "item_tags": uniq_prods_tags
    }


@bp.route("/profile", methods=['GET', 'POST'])
@jwt_required()
def profile():
    if request.method == 'GET':
        current_user = get_jwt_identity()
        user = UserModel.query.filter_by(email=current_user).first()
        return{
            "userID": user.uuid,
            "username": user.username,
            "userEmail": user.email,
            "JoinTime": user.join_time,
            "Bio": user.bio,
            "Avatar": user.avatar,
            "hide_email": user.hide_email
        }
    else:
        data = json.loads(request.data)
        current_user = get_jwt_identity()
        user = UserModel.query.filter_by(email=current_user).first()
        user.username = data['username']
        user.bio = data['bio']
        if data['showEmail'] == 'Public':
            user.hide_email = False
        else:
            user.hide_email = True
        if data['password'] != '':
            user.password = generate_password_hash(data['password'])
        db.session.commit()
        return redirect(url_for("user.login"))


@bp.route("/upload", methods=['GET', 'POST'])
@jwt_required()
def upload():
    if request.method == 'GET':
        return {1: 'upload'}
    else:
        head = 'https://it-project-002.s3.ap-southeast-2.amazonaws.com'
        current_user = get_jwt_identity()
        form = request.form
        user = current_user
        name = form.get("itemName")
        price = "{:.2f}".format(float(form.get("price")))
        tags = [i["value"] for i in json.loads(form.get("tags"))]
        images = [f"{head}/{user}/{name}/{i}" for i in range(len(request.files))]
        description = form.get("description")
        s3 = boto3.client('s3',
                          region_name='ap-southeast-2',
                          aws_access_key_id='AKIA3V2C4OGZ2UVFEEHG',
                          aws_secret_access_key='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')
        bucket_name = 'it-project-002'
        for i in range(len(request.files)):
            s3.upload_fileobj(
                request.files.get(str(i)),
                bucket_name,
                f"{user}/{name}/{i}",
                ExtraArgs={
                    "ContentType": request.files.get(str(i)).content_type
                }
            )
        randomid = uuid.uuid4()
        product = ProductModel(uuid=randomid, user=user, name=name, price=price, tags=tags, images=images, description=description)
        db.session.add(product)
        db.session.commit()
        return {}


@bp.route("/delete", methods=['POST'])
@jwt_required()
def delprod():
    current_user = get_jwt_identity()
    data = json.loads(request.data)
    product = ProductModel.query.filter_by(uuid=data['prod_id']).first()
    head = 'https://it-project-002.s3.ap-southeast-2.amazonaws.com'
    s3 = boto3.client('s3',
                        region_name='ap-southeast-2',
                        aws_access_key_id='AKIA3V2C4OGZ2UVFEEHG',
                        aws_secret_access_key='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')
    bucket_name = 'it-project-002'
    for i in s3.list_objects(Bucket=bucket_name, Prefix=f"{current_user}/{data['title']}/").get('Contents', []):
            s3.delete_object(Bucket=bucket_name, Key=i.get("Key"))
    db.session.delete(product)
    db.session.commit()
    return {}


@bp.route("/item/<uuid>",methods=['GET'])
@jwt_required()
def itemDetail(uuid):
    product = ProductModel.query.filter_by(uuid=uuid).first()
    owner_email = product.user
    current_user = get_jwt_identity()
    user = UserModel.query.filter_by(email=owner_email).first()
    print(product.images)
    return{
        "user_id":user.uuid,
        "user_name":user.username,
        "user_email":user.email,
        "prod_name":product.name,
        "prod_price":product.price,
        "prod_tags":product.tags,
        "prod_images":product.images,
        "prod_desc":product.description,
        "user_hide_email":user.hide_email
    }


@bp.route("/item/edit/<uuid>",methods=['GET', 'POST'])
@jwt_required()
def editItem(uuid):
    if request.method == 'GET':
        print(uuid)
        product = ProductModel.query.filter_by(uuid=uuid).first()
        current_user = get_jwt_identity()
        user = UserModel.query.filter_by(email=current_user).first()
        print(product.images)
        return{
            "user_name":user.username,
            "user_email":user.email,
            "prod_name":product.name,
            "prod_price":product.price,
            "prod_tags":product.tags,
            "prod_images":product.images,
            "prod_desc":product.description
        }
    else:
        product = ProductModel.query.filter_by(uuid=uuid).first()
        current_user = get_jwt_identity()
        form = request.form
        name = form.get("itemName")
        price = float(form.get("price"))
        tags = [i["value"] for i in json.loads(form.get("tags"))]
        images = json.loads(form.get("images"))
        head = 'https://it-project-002.s3.ap-southeast-2.amazonaws.com'
        
        description = form.get("description")
        s3 = boto3.client('s3',
                          region_name='ap-southeast-2',
                          aws_access_key_id='AKIA3V2C4OGZ2UVFEEHG',
                          aws_secret_access_key='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')
        bucket_name = 'it-project-002'
        fill = [0,1,2]
        print(images)
        for i in s3.list_objects(Bucket=bucket_name, Prefix=f"{current_user}/{name}/").get('Contents', []):
            if f"{head}/{i.get('Key')}" not in images:
                print(i.get("Key"))
                s3.delete_object(Bucket=bucket_name, Key=i.get("Key"))
            else:
                fill.remove(int(i.get("Key").split("/")[-1]))
        images = [i for i in images if "blob" not in i]
        for i in range(3):
            if request.files.get(str(i)):
                index = fill.pop(0)
                images += [f"{head}/{current_user}/{name}/{index}"]
                s3.upload_fileobj(
                    request.files.get(str(i)),
                    bucket_name,
                    f"{current_user}/{name}/{index}",
                    ExtraArgs={
                        "ContentType": request.files.get(str(i)).content_type
                    }
                )
        db.session.query(ProductModel).filter(ProductModel.uuid==uuid).update({"name":name, "price":price, "tags":tags, "images":images, "description":description})
        db.session.commit()
        return {}


@bp.route("/landing", methods=['GET'])
def landing():
    products = ProductModel.query.all()
    uuid = []
    img = []
    name = []
    tags = []
    price = []
    for prod in products:
        uuid.append(prod.uuid)
        img.append(prod.images)
        name.append(prod.name)
        tags.append(prod.tags)
        price.append(prod.price)
    return {
        "uuid":uuid,
        "img" : img,
        "name" : name,
        "tags" : tags,
        "price": price
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
