import wtforms
from wtforms.validators import length, EqualTo, Email
from models import UserModel
import wtforms_json


class LoginForm(wtforms.Form):
    email = wtforms.StringField(validators=[Email()])
    password = wtforms.StringField(validators=[length(min=6, max=20)])


class RegistrationForm(wtforms.Form):
    wtforms_json.init()
    username = wtforms.StringField(validators=[length(min=3, max=20)])
    email = wtforms.StringField(validators=[Email()])
    # captcha = wtforms.StringField(validators=[length(min=4, max=4)])
    password = wtforms.StringField(validators=[length(min=6, max=20)])
    matchPwd = wtforms.StringField(validators=[EqualTo("password")])
    bio = wtforms.StringField(validators=[length(min=0, max=200)])
    # def validate_captcha(self,field):
    #     captcha = field.data
    #     email = self.email.data
    #     captcha_model = EmailCaptchaModel.query.filter_by(email=email).first()
    #     if not captcha_model or captcha_model.captcha.lower() != captcha.lower():
    #         raise wtforms.ValidationError("email verification failed！")

    def validate(self, **kwargs):
        check_validate = super(RegistrationForm, self).validate()

        if not check_validate:
            print("check failed")
            return False
        email = self.email.data
        user_model = UserModel.query.filter_by(email=email).first()
        if user_model:
            return False
        return True
