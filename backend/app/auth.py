import os
import requests
import time
from flask import abort
from jose import jwt, jwk
from jose.exceptions import JWTError, JWKError

CLERK_JWKS_URL = os.getenv("CLE_JWKS_URL")
CLERK_AUDIENCE = os.getenv("CLE_AUDIENCE")
CLERK_ISSUER = os.getenv("CLE_ISSUER")

jwks_cache = {"keys": None, "expires": 0}

def get_jwks():
    now = time.time()
    if jwks_cache["expires"] > now:
        return jwks_cache["keys"]
    
    try:
        response = requests.get(CLERK_JWKS_URL, timeout=5) 
        response.raise_for_status()
        jwks = response.json()
        jwks_cache["keys"] = jwks
        jwks_cache["expires"] = now + 3600
        return jwks
    except requests.RequestException as e:
        print(f"JWKS Fetch Error: {str(e)}")
        return None

def verify_clerk_token(token: str) -> str | None:
    try:
        header = jwt.get_unverified_header(token)
        jwks = get_jwks()
        if not jwks:
            return None
        
        public_key = None
        for key in jwks["keys"]:
            if key["kid"] == header["kid"]:
                public_key = jwk.construct(key)
                break
        
        if not public_key:
            raise JWTError("No matching public key found in JWKS")

        decoded = jwt.decode(
            token,
            public_key,
            algorithms=["RS256"],
            audience=CLERK_AUDIENCE,
            issuer=CLERK_ISSUER,
        )
        return decoded.get("sub")
    
    except JWTError as e:
        print(f"JWT Verification Failed: {str(e)}")
        return None
    except Exception as e:
        print(f"Unexpected Error: {str(e)}")
        return None