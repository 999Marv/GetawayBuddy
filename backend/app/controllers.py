from flask import jsonify, abort, request
from app import db
from app.models import User, Itinerary

MISSING_FIELDS_ERROR = "Missing required fields: email and password"
USER_NOT_FOUND_ERROR = "User not found"
USER_ALREADY_EXISTS = "User already exists"

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
    if not data or 'email' not in data or 'password' not in data:
        abort(400, description=MISSING_FIELDS_ERROR)

    if User.query.filter_by(email=data['email']).first():
        abort(400, description=USER_ALREADY_EXISTS)
        
    new_user = User(email=data['email'], password=data['password'])
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
