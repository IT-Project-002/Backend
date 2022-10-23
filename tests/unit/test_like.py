from app import app


def test_myFav():
     client = app.test_client()
     token = client.post("/users/login", json={
            "email": "123@gmail.com",
            "password": "Ld20010828",
        }).json['access_token']
     headers = {'Authorization': "Bearer " + token}
     response = client.get("/users/favourite", headers=headers)
     assert response.status_code == 200


def test_like_unlike():
    client = app.test_client()
    token = client.post("/users/login", json={
            "email": "123@gmail.com",
            "password": "Ld20010828",
        }).json['access_token']
    headers = {'Authorization': "Bearer " + token}
    response = client.post("/users/like", headers=headers,
                json ={
                    "item":"00c678d8-bba5-4714-a8ab-15969305e001"
                })
    assert response.status_code == 200
    client.post("/users/like", headers=headers,
                json ={
                    "item":"00c678d8-bba5-4714-a8ab-15969305e001"
                })
    assert response.status_code == 200