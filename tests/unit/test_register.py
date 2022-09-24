from app import app
import random
import string


def random_char(char_num):
    return ''.join(random.choice(string.ascii_letters) for _ in range(char_num))


def test_register():
    client = app.test_client()
    response = client.post("/users/register", json={
        "username": random_char(16),
        "email":  random_char(8)+'@gmail.com',
        "password":  "A1234567",
        "matchPwd": "A1234567",
        "bio":  "",
        "avatar":  "male1",
    })
    assert response.status_code == 302

def test_register_email_dupe():
    client = app.test_client()
    response = client.post("/users/register", json={
        "username": "test2",
        "email":  "lilyliyf@hotmail.com",
        "password":  "A1234567",
        "matchPwd": "A1234567",
        "bio":  "",
        "avatar":  "male1",
    })
    assert response.status_code == 500

def test_register_user_dupe():
    client = app.test_client()
    response = client.post("/users/register", json={
        "username": "test",
        "email":  "test@123.com",
        "password":  "A1234567",
        "matchPwd": "A1234567",
        "bio":  "",
        "avatar":  "male1",
    })
    assert response.status_code == 500