from wtforms import Form, StringField, PasswordField, validators

from connections import user_db


class RegistrationForm(Form):
    name = StringField('name', [validators.Length(min=4, max=25)])
    email = StringField('Email Address', [validators.Length(min=6, max=35)])
    password = PasswordField('New Password', [
        validators.DataRequired(),
        validators.EqualTo('confirm', message='Passwords must match')
    ])
    confirm = PasswordField('Repeat Password')

    # accept_tos = BooleanField('I accept the TOS', [validators.DataRequired()])

    def validate(self, **kwargs):
        check_validate = super(RegistrationForm, self).validate()

        # If validator no pass
        if not check_validate:
            return False

        # Check the user whether exist.
        user = user_db.userInfo.find_one({"email": self.email.data})
        if user:
            self.email.errors.append('User with that email already exists.')
            return False
        return True
