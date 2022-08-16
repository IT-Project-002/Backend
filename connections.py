from pymongo import MongoClient
from flask_mail import Mail

mail = Mail()

client = MongoClient('mongodb+srv://cluster:ld20010828@cluster.igm4mvn.mongodb.net/?retryWrites=true')
user_db = client.userDB

