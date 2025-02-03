from flask import jsonify, abort, request
from app import db
from app.models import Itinerary, UserItinerary
import json
from app.ai_generation.generate_itinerary import generate_completion
from app.auth import verify_clerk_token
import random
import string

MISSING_FIELDS_ERROR = "Missing required fields: clerk_id"
ITINERARY_NOT_FOUND_ERROR = "Itinerary not found"
AI_RESPONSE_NOT_GENERATED = "AI response not generated"
AI_NOT_EXPECTED_FORMAT = "AI response was not in the expected format"
AI_RESPONSE_FAILED_TO_PARSE = "AI response failed to parse"

def get_verified_clerk_id():
    """Extracts and verifies the Clerk authentication token from request headers."""

    if request.method == "OPTIONS":
        return None
    
    auth_header = request.headers.get("Authorization")

    if not auth_header or not auth_header.startswith("Bearer "):
        abort(403, description="Missing or invalid Authorization header")

    token = auth_header.split(" ")[1]
    clerk_id = verify_clerk_token(token)

    if not clerk_id:
        abort(403, description="Invalid Clerk token")

    return clerk_id

def handle_get_itineraries():
    """Retrieve the user's saved itineraries and shared itineraries separately."""
    clerk_id = get_verified_clerk_id()

    saved_itineraries = Itinerary.query.filter_by(clerk_id=clerk_id, saved=True).all()

    shared_itineraries = (
        db.session.query(Itinerary)
        .join(UserItinerary, Itinerary.id == UserItinerary.itinerary_id)
        .filter(UserItinerary.clerk_id == clerk_id)
        .all()
    )

    return jsonify({
        "saved": [dict(itinerary.as_dict(), is_shared=False) for itinerary in saved_itineraries],
        "shared": [dict(itinerary.as_dict(), is_shared=True) for itinerary in shared_itineraries]
    })


def handle_create_itinerary():
    """Generates an itinerary based on user input and Clerk authentication."""
    data = request.get_json()
    clerk_id = data.get("clerk_id")

    if not clerk_id:
        abort(400, description=MISSING_FIELDS_ERROR)

    ai_response = generate_completion(data)

    if not ai_response:
        abort(500, description=AI_RESPONSE_NOT_GENERATED)

    try:
        itinerary_data = json.loads(ai_response)
        if not isinstance(itinerary_data, dict):
            abort(500, description=AI_NOT_EXPECTED_FORMAT)
    except json.JSONDecodeError:
        abort(500, description=AI_RESPONSE_FAILED_TO_PARSE)

    new_itinerary = Itinerary(
        clerk_id=clerk_id,
        name=f"Your Trip to {data['country']}",
        activity=itinerary_data,
        saved=False
    )

    db.session.add(new_itinerary)
    db.session.commit()

    return jsonify(new_itinerary.as_dict()), 201

def handle_save_itinerary(clerk_id, itinerary_id):
    """Save or unsave an itinerary for a user, but do not add it to UserItinerary."""
    verified_clerk_id = get_verified_clerk_id()

    if clerk_id != verified_clerk_id:
        abort(403, description="You are not authorized to modify this itinerary.")

    itinerary = Itinerary.query.filter_by(id=itinerary_id, clerk_id=clerk_id).first()
    if not itinerary:
        abort(404, description=ITINERARY_NOT_FOUND_ERROR)

    itinerary.saved = not itinerary.saved
    db.session.commit()

    return jsonify(itinerary.as_dict())



def handle_delete_itinerary(itinerary_id):
    """Deletes an itinerary if the user is authenticated."""
    clerk_id = get_verified_clerk_id()

    itinerary = Itinerary.query.filter_by(id=itinerary_id, clerk_id=clerk_id).first()
    if not itinerary:
        abort(404, description=ITINERARY_NOT_FOUND_ERROR)

    db.session.delete(itinerary)
    db.session.commit()

    return '', 204

def generate_share_code():
    """Generates a short, user-friendly 6-character alphanumeric share code."""
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))

def handle_share_itinerary(itinerary_id):
    """Generate and return a shareable code for an itinerary."""
    clerk_id = get_verified_clerk_id()

    itinerary = Itinerary.query.filter_by(id=itinerary_id, clerk_id=clerk_id).first()
    
    if not itinerary:
        abort(404, description=ITINERARY_NOT_FOUND_ERROR)

    if not itinerary.share_code:
        itinerary.share_code = generate_share_code()
        db.session.commit()

    return jsonify({"share_code": itinerary.share_code})

def handle_get_shared_itinerary(share_code):
    """Allow a user to claim a shared itinerary using a share code."""
    clerk_id = get_verified_clerk_id()

    itinerary = Itinerary.query.filter_by(share_code=share_code).first()

    if not itinerary:
        abort(404, description=ITINERARY_NOT_FOUND_ERROR)

    existing_entry = UserItinerary.query.filter_by(clerk_id=clerk_id, itinerary_id=itinerary.id).first()
    if existing_entry:
        return jsonify({"message": "Itinerary already added"}), 200

    new_entry = UserItinerary(clerk_id=clerk_id, itinerary_id=itinerary.id)
    db.session.add(new_entry)
    db.session.commit()

    return jsonify({"message": "Itinerary added successfully", "itinerary": itinerary.as_dict()}), 201
