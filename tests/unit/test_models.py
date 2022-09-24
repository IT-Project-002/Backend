from models import UserModel


def test_new_user():
    """
    GIVEN a User model
    WHEN a new User is created
    THEN check the email, password, and other fields are defined correctly
    """
    new_user = UserModel(email='hailin@gmail.com', username='HAILIN', password='28123', bio='bio message', avatar='female1')
    assert new_user.email == 'hailin@gmail.com'
    assert new_user.username == 'HAILIN'
    assert new_user.password == '28123'
    assert new_user.bio == 'bio message'
    assert new_user.avatar == 'female1'