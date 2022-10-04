from app import app


def test_login_post_200():
    client = app.test_client()
    response = client.post("/users/login", json={
        "email": "123@gmail.com",
        "password": "Ld20010828",
    })
    assert response.status_code == 200

def test_login_post_302():
    client = app.test_client()
    response = client.post("/users/login", json={
        "email": "123@gmail.com",
        "password": "1234",
    })
    assert response.status_code == 302

def test_logout():
    client = app.test_client()
    token = client.post("/users/login", json={
            "email": "123@gmail.com",
            "password": "Ld20010828",
        }).json['access_token']
    headers = {'Authorization': "Bearer " + token}
    response = client.post("/users/logout", headers=headers)
    assert response.status_code == 200