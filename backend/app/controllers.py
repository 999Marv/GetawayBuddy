from flask import jsonify, abort, request
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
    clerk_id = verify_clerk_token()

    if not clerk_id:
        abort(400, description=MISSING_FIELDS_ERROR)

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
        name="trip",
        activity=itinerary_data,
        saved=False,
        start_date=data.get("start_date"),
        end_date=data.get("end_date")
    )

    db.session.add(new_itinerary)
    db.session.commit()
    
    return jsonify(new_itinerary.as_dict()), 201

def handle_save_itinerary(itinerary_id):
    """
    Save the generated itinerary to the user's account using Clerk ID.
    """
    data = request.get_json()
    clerk_id = data.get("clerk_id")

    if not clerk_id:
        abort(400, description=MISSING_FIELDS_ERROR)

    itinerary = Itinerary.query.filter_by(id=itinerary_id, clerk_id=clerk_id).first()
    if not itinerary:
        abort(404, description=ITINERARY_NOT_FOUND_ERROR)

    itinerary.saved = True
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
