# EMAIL SYSTEM
MAIL_SERVER = "smtp.gmail.com"
MAIL_PORT = 587
MAIL_USE_TLS = True
MAIL_USE_SSL = False
MAIL_DEBUG = True
MAIL_USERNAME = "dilu0828@gmail.com"
MAIL_PASSWORD = "pfrzxaqryvrvbncg"
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

# S3 CONNECTION
REGION_NAME = 'ap-southeast-2'
BUCKET_NAME = 'it-project-002'
AWS_ACCESS_KEY_ID = 'AKIA3V2C4OGZ2UVFEEHG'
AWS_SECRET_ACCESS_KEY = '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'

# session and cookie
SECRET_KEY = "sdfsadfskrwerfj1233453345"
CORS_HEADERS = 'Content-Type'