from flask import Blueprint
from app.controllers import (
    handle_create_itinerary,
    handle_get_itineraries,
    handle_delete_itinerary,
    handle_save_itinerary
)
from app.error_handlers import bad_request_error, not_found_error

main = Blueprint('main', __name__)

main.register_error_handler(404, not_found_error)
main.register_error_handler(400, bad_request_error)

@main.route('/')
def home():
    return 'hi'

@main.route('/itineraries', methods=['GET', 'OPTIONS'])
def get_itineraries():
    return handle_get_itineraries()

@main.route('/itineraries', methods=['POST'])
def create_itinerary():
    return handle_create_itinerary()

@main.route('/itineraries/<string:clerk_id>/<int:itinerary_id>/save', methods=['PUT'])
def save_itinerary(clerk_id, itinerary_id):
    return handle_save_itinerary(clerk_id, itinerary_id)

@main.route('/itineraries/<int:itinerary_id>', methods=['DELETE'])
def delete_itinerary(itinerary_id):
    return handle_delete_itinerary(itinerary_id)
