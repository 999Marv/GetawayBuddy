from flask import jsonify
from werkzeug.exceptions import HTTPException

def not_found_error(e):
    return jsonify({"error": "Resource not found"}), 404

def bad_request_error(e):
    return jsonify({"error": "Bad request: " + str(e)}), 400

def internal_server_error(e):
    return jsonify({"error": "An internal server error occurred"}), 500

def generic_error_handler(e):
    return jsonify({"error": str(e)}), getattr(e, 'code', 500)