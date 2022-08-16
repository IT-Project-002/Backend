from datetime import datetime


class User:
    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password

    def generate_doc(self):
        user = {
            'name': self.name,
            'email': self.email,
            'created_at': datetime.now(),
            'password': self.password
        }
        return user
    