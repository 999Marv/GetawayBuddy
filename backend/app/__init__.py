from flask import Flask
from flask_migrate import Migrate
from config import DevelopmentConfig, TestingConfig
from .models import Itinerary
from .db import db
import os
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    website = os.getenv("WEBSITE")

    CORS(app, supports_credentials=True, resources={r"/*": {
        "origins": website,
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    }})

    env = os.getenv("FLASK_ENV", "development")

    if env == "testing":
        app.config.from_object(TestingConfig)
    else:
        app.config.from_object(DevelopmentConfig)

    db.init_app(app)
    migrate = Migrate(app, db)

    from .routes import main
    app.register_blueprint(main)

    return app
