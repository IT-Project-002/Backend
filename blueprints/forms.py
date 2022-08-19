import wtforms
from wtforms.validators import length, EqualTo, Email
from models import UserModel


class LoginForm(wtforms.Form):
    email = wtforms.StringField(validators=[Email()])
    password = wtforms.StringField(validators=[length(min=6, max=20)])


class RegistrationForm(wtforms.Form):
    username = wtforms.StringField(validators=[length(min=3, max=20)])
    email = wtforms.StringField(validators=[Email()])
    # captcha = wtforms.StringField(validators=[length(min=4, max=4)])
    password = wtforms.StringField(validators=[length(min=6, max=20)])
    password_confirm = wtforms.StringField(validators=[EqualTo("password")])

    # def validate_captcha(self,field):
    #     captcha = field.data
    #     email = self.email.data
    #     captcha_model = EmailCaptchaModel.query.filter_by(email=email).first()
    #     if not captcha_model or captcha_model.captcha.lower() != captcha.lower():
    #         raise wtforms.ValidationError("邮箱验证码错误！")

    def validate(self, **kwargs):
        check_validate = super(RegistrationForm, self).validate()

        if not check_validate:
            return False
        email = self.email.data
        user_model = UserModel.query.filter_by(email=email).first()
        if user_model:
            return False
        return True
