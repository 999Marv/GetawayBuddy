from app.models import User, Itinerary
from app import db

def create_user():
    return User(clerk_id="222", email="test@ex.com")

def create_itinerary(user):
     return Itinerary(user_id=user.id, name="Paris Trip", activity={}, saved=True)

def test_create_user(app):
    with app.app_context():
        user = create_user()
        db.session.add(user)
        db.session.commit()

        assert User.query.count() == 1
        assert user.email == "test@ex.com"
        assert user.clerk_id == "222"


def test_user_itinerary_relationship(app):
    with app.app_context():
        user = create_user()
        db.session.add(user)
        db.session.commit()

        itinerary = create_itinerary(user)
        db.session.add(itinerary)
        db.session.commit()

        assert user.itineraries[0].name == "Paris Trip"
        assert itinerary.user_id == user.id