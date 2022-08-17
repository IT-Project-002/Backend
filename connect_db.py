from pymongo import MongoClient

client = MongoClient('mongodb+srv://cluster:ld20010828@cluster.igm4mvn.mongodb.net/?retryWrites=true')
user_db = client.userDB

