from flask import jsonify, abort, request
from app import db
from app.models import User, Itinerary

MISSING_FIELDS_ERROR = "Missing required fields: clerk_id or email"
USER_NOT_FOUND_ERROR = "User not found"
USER_ALREADY_EXISTS = "User with this clerk_id already exists"
ITINERARY_NOT_FOUND_ERROR = "Itinerary not found"

def handle_get_users():
    users = User.query.all()
    return jsonify([user.as_dict() for user in users])

def handle_get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        abort(404, description=USER_NOT_FOUND_ERROR)
    return jsonify(user.as_dict())

def handle_create_user():
    data = request.get_json()
    
    if not data or 'clerk_id' not in data or 'email' not in data:
        abort(400, description=MISSING_FIELDS_ERROR)

    if User.query.filter_by(clerk_id=data['clerk_id']).first():
        abort(400, description=USER_ALREADY_EXISTS)

    new_user = User(clerk_id=data['clerk_id'], email=data['email'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.as_dict()), 201

def handle_delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        abort(404, description=USER_NOT_FOUND_ERROR)
    
    db.session.delete(user)
    db.session.commit()
    return '', 204

def sync_user_from_clerk(clerk_id, email):
    user = User.query.filter_by(clerk_id=clerk_id).first()
    if not user:
        user = User(clerk_id=clerk_id, email=email)
        db.session.add(user)
        db.session.commit()
    return user

# Itinerary controllers
def handle_get_itineraries(user_id):
    itineraries = Itinerary.query.filter_by(user_id=user_id, saved=True).all()

    return jsonify([itinerary.as_dict() for itinerary in itineraries])

def handle_create_itinerary():
    data = request.get_json()
    if not data or 'name' not in data or 'activity' not in data:
        abort(400, description="Missing required fields: name, activity")

    new_itinerary = Itinerary(
        name=data['name'],
        activity=data['activity'],
        saved=False
    )

    db.session.add(new_itinerary)
    db.session.commit()
    
    return jsonify(new_itinerary.as_dict()), 201

def handle_save_itinerary(itinerary_id, user_id):
    itinerary = Itinerary.query.get(itinerary_id)
    if not itinerary:
        abort(404, description=ITINERARY_NOT_FOUND_ERROR)

    itinerary.user_id = user_id
    itinerary.saved = True
    db.session.commit()

    return jsonify(itinerary.as_dict())

def handle_delete_itinerary(itinerary_id):
    itinerary = Itinerary.query.get(itinerary_id)
    if not itinerary:
        abort(404, description=ITINERARY_NOT_FOUND_ERROR)

    db.session.delete(itinerary)
    db.session.commit()
    
    return '', 204
