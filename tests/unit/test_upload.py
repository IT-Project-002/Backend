from app import app


def test_upLoadImage():
     client = app.test_client()
     token = client.post("/users/login", json={
            "email": "123@gmail.com",
            "password": "Ld20010828",
        }).json['access_token']
     headers = {'Authorization': "Bearer " + token}
     response = client.post("/users/upload", headers=headers,
                form = {
                    'itemName': 'fdvgsfdg',
                    'price': '21312312', 
                    'description': 'dsfasdfadsfafaafs',
                    'tags': {"value":"textiles","label":"Textiles"}
                }
     )
     assert response.status_code==302