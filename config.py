# EMAIL SYSTEM
MAIL_SERVER = "smtp.gmail.com"
MAIL_PORT = 587
MAIL_USE_TLS = True
MAIL_USE_SSL = False
MAIL_DEBUG = True
MAIL_USERNAME = "handicraft.it.project@gmail.com"
MAIL_PASSWORD = "tseleyelsoiczwsj"
MAIL_DEFAULT_SENDER = "dilu0828@gmail.com"

# DATABASE CONNECTION
HOST_NAME = 'dev1-b.cja5xrvxpkbq.ap-southeast-2.rds.amazonaws.com'
PORT = '5432'
DATABASE = 'WebServ'
USER_NAME = 'postgres'
PASSWORD = 'ld20010828'

DB_URI = f'postgresql://{USER_NAME}:{PASSWORD}@{HOST_NAME}/{DATABASE}'
SQLALCHEMY_DATABASE_URI = DB_URI

SQLALCHEMY_TRACK_MODIFICATIONS = True


# session and cookie
SECRET_KEY = "sdfsadfskrwerfj1233453345"
CORS_HEADERS = 'Content-Type'