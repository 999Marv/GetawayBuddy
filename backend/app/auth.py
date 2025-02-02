import os
from flask import abort
from jose import jwt
from jose.exceptions import JWTError

CLERK_PUBLIC_KEY = os.getenv("CLE_KEY")

def verify_clerk_token(token: str) -> str | None:
    try:
        decoded = jwt.decode(
            token,
            CLERK_PUBLIC_KEY,
            algorithms=["RS256"],
            audience="cosmic-stingray-16.clerk.accounts.dev"
        )
        return decoded.get("sub")
    except JWTError as e:
        return None
