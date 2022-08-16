

class db_operation:
    def __init__(self, db):
        self.db = db

    def create_user_record(self, user):
        return self.db.userInfo.insert_one(user.generate_doc())

    # def create_email_verification_record(self):
