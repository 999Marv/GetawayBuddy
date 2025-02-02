from flask import jsonify, abort, make_response, request
from app import db
from app.models import Itinerary
import json
from app.ai_generation.generate_itinerary import generate_completion
from app.auth import verify_clerk_token

MISSING_FIELDS_ERROR = "Missing required fields: clerk_id"
ITINERARY_NOT_FOUND_ERROR = "Itinerary not found"
AI_RESPONSE_NOT_GENERATED = "AI response not generated"
AI_NOT_EXPECTED_FORMAT = "AI response was not in the expected format"
AI_RESPONSE_FAILED_TO_PARSE = "AI response failed to parse"

def handle_get_itineraries():
    if request.method == 'OPTIONS':
        return jsonify({"message": "Preflight request handled"}), 200

    auth_header = request.headers.get("Authorization")

    if not auth_header or not auth_header.startswith("Bearer "):
        abort(403, description="Missing or invalid Authorization header")

    token = auth_header.split(" ")[1]

    clerk_id = verify_clerk_token(token)

    if not clerk_id:
        abort(403, description="Invalid Clerk token")

    itineraries = Itinerary.query.filter_by(clerk_id=clerk_id, saved=True).all()

    return jsonify([itinerary.as_dict() for itinerary in itineraries])

def handle_create_itinerary():
    """
    Generates an itinerary based on user input and Clerk authentication.
    """
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
        name=f"Trip to {data["country"]}",
        activity=itinerary_data,
        saved=False,
        start_date=data.get("start_date"),
        end_date=data.get("end_date")
    )

    db.session.add(new_itinerary)
    db.session.commit()
    
    return jsonify(new_itinerary.as_dict()), 201

def handle_save_itinerary(clerk_id, itinerary_id):
    """
    Save the generated itinerary using the clerk ID provided in the URL,
    but verify that it matches the clerk ID from the authentication token.
    """
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        abort(403, description="Missing or invalid Authorization header")
    
    token = auth_header.split(" ")[1]
    verified_clerk_id = verify_clerk_token(token)
    if not verified_clerk_id:
        abort(403, description="Invalid Clerk token")

    if clerk_id != verified_clerk_id:
        abort(403, description="You are not authorized to modify this itinerary.")
    
    itinerary = Itinerary.query.filter_by(id=itinerary_id, clerk_id=clerk_id).first()
    if not itinerary:
        abort(404, description=ITINERARY_NOT_FOUND_ERROR)

    # setting itineraries to true or false when the save button is pressed
    itinerary.saved = False if itinerary.saved else True
    db.session.commit()

    return jsonify(itinerary.as_dict())

def handle_delete_itinerary(itinerary_id):
    clerk_id = verify_clerk_token()
    
    if not clerk_id:
        abort(400, description=MISSING_FIELDS_ERROR)

    itinerary = Itinerary.query.filter_by(id=itinerary_id, clerk_id=clerk_id).first()
    
    if not itinerary:
        abort(404, description=ITINERARY_NOT_FOUND_ERROR)

    db.session.delete(itinerary)
    db.session.commit()

    return '', 204
