import os
import requests
from flask import request, abort

CLERK_API_URL = "https://api.clerk.dev/v1"
CLERK_SECRET_KEY = os.getenv("CLERK_SECRET_KEY")

def verify_clerk_token():
    auth_header = request.headers.get("Authorization")

    if not auth_header or not auth_header.startswith("Bearer "):
        abort(401, description="Missing or invalid authorization token")

    token = auth_header.split(" ")[1]
    headers = {"Authorization": f"Bearer {CLERK_SECRET_KEY}"}

    response = requests.get(f"{CLERK_API_URL}/sessions/{token}", headers=headers)

    if response.status_code != 200:
        abort(403, description="Invalid token")

    user_data = response.json()
    return user_data.get("user_id")
