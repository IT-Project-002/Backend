from flask import Blueprint, request, redirect, render_template, url_for

from DB_operation import db_operation
from connect_db import connect_to_userDB
from instance import User
from register_form import RegistrationForm

bp = Blueprint("user", __name__, url_prefix='/user')


@bp.route("/register", methods=['GET', 'POST'])
def register():
    db = connect_to_userDB()
    operation = db_operation(db)
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
