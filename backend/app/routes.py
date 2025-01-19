from flask import Blueprint, request
from app.controllers import (
    handle_get_users,
    handle_get_user,
    handle_create_user,
    handle_delete_user,
    handle_create_itinerary,
    handle_get_itineraries,
    handle_delete_itinerary,
    handle_save_itinerary
)
from app.error_handlers import bad_request_error, not_found_error

main = Blueprint('main', __name__)

main.register_error_handler(404, not_found_error)
main.register_error_handler(400, bad_request_error)

@main.route('/health', methods=['GET'])
def health():
    return 'hi'

@main.route('/users', methods=['GET'])
def get_users():
    return handle_get_users()

@main.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    return handle_get_user(user_id)

@main.route('/users', methods=['POST'])
def create_user():
    return handle_create_user()

@main.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    return handle_delete_user(user_id)

@main.route('/itineraries', methods=['POST'])
def create_itinerary():
    return handle_create_itinerary()

@main.route('/itineraries/<int:itinerary_id>/save', methods=['PUT'])
def save_itinerary(itinerary_id):
    data = request.get_json()
    return handle_save_itinerary(itinerary_id, data.get('user_id'))

@main.route('/users/<int:user_id>/itineraries', methods=['GET'])
def get_user_itineraries(user_id):
    return handle_get_itineraries(user_id)

@main.route('/itineraries/<int:itinerary_id>', methods=['DELETE'])
def delete_itinerary(itinerary_id):
    return handle_delete_itinerary(itinerary_id)