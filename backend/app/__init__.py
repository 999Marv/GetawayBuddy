from flask import Flask
from flask_migrate import Migrate
from config import DevelopmentConfig, TestingConfig
from .models import User, Itinerary
from .db import db
import os

def create_app():
    app = Flask(__name__)

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
