from pymongo import MongoClient


def connect_to_userDB() -> MongoClient:
    client = MongoClient('mongodb+srv://cluster:ld20010828@cluster.igm4mvn.mongodb.net/?retryWrites=true')
    db = client.userDB
    return db
