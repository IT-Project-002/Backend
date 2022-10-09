from app import app

def test_market():
    client = app.test_client()
    token = client.post("/users/login", json={
            "email": "123@gmail.com",
            "password": "Ld20010828",
        }).json['access_token']
    headers = {'Authorization': "Bearer " + token}
    response = client.get("/users/market/ecdc86bf-ab71-478b-8ed7-478f4b563731", headers=headers)
    assert response.status_code == 200

def test_market_401():
    client = app.test_client()
    response = client.get("/users/market")
    print(response)
    assert response.status_code == 401