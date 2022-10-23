from app import app


def test_myProfile():
     client = app.test_client()
     token = client.post("/users/login", json={
            "email": "123@gmail.com",
            "password": "Ld20010828",
        }).json['access_token']
     headers = {'Authorization': "Bearer " + token}
     response = client.get("/users/profile", headers=headers)
     assert response.status_code == 200


def test_changeProfile():
     client = app.test_client()
     token = client.post("/users/login", json={
            "email": "123@gmail.com",
            "password": "Ld20010828",
        }).json['access_token']
     headers = {'Authorization': "Bearer " + token}
     response = client.post("users/profile", headers=headers,
                            json = {
                                "username":"TLzzs",
                                "showEmail": 'Private',
                                "password":"Ld20010828",
                                "bio": '陆迪大聪明'
                            })
     assert response.status_code == 302

     response = client.post("users/profile", headers=headers,
                            json = {
                                 "username":"TLzzs",
                                "showEmail": 'Public',
                                "password":"Ld20010828",
                                "bio": '陆迪大聪明'
                            })
     assert response.status_code == 302