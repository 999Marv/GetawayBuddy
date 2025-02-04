from flask import Blueprint, request, jsonify
from app.controllers import (
    handle_create_itinerary,
    handle_delete_shared_itinerary,
    handle_get_itineraries,
    handle_delete_itinerary,
    handle_save_itinerary,
    handle_share_itinerary,
    handle_get_shared_itinerary
)
from app.error_handlers import bad_request_error, not_found_error
from app.controllers import get_verified_clerk_id  # if needed

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

@main.route('/itineraries/<int:itinerary_id>/save', methods=['PUT', 'OPTIONS'])
def save_itinerary(itinerary_id):
    if request.method == "OPTIONS":
        return jsonify({"message": "Preflight OK"}), 200
    clerk_id = get_verified_clerk_id()
    return handle_save_itinerary(clerk_id, itinerary_id)


@main.route('/itineraries/<int:itinerary_id>', methods=['DELETE'])
def delete_itinerary(itinerary_id):
    return handle_delete_itinerary(itinerary_id)

@main.route('/itineraries/<int:itinerary_id>/share', methods=['POST'])
def share_itinerary(itinerary_id):
    return handle_share_itinerary(itinerary_id)

@main.route('/itineraries/share', methods=['POST'])
def claim_itinerary():
    return handle_get_shared_itinerary()

@main.route('/itineraries/<int:itinerary_id>/shared', methods=['DELETE', 'OPTIONS'])
def delete_shared_itinerary(itinerary_id):
    if request.method == "OPTIONS":
        return jsonify({"message": "Preflight OK"}), 200
    clerk_id = get_verified_clerk_id()
    return handle_delete_shared_itinerary(clerk_id, itinerary_id)
