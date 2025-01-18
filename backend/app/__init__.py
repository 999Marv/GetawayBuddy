from flask import Flask
from config import DATABASE_URL
from flask_migrate import Migrate
from .models import User, Itinerary
from .db import db

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)

    migrate = Migrate(app, db)

    from .routes import main
    app.register_blueprint(main)

    return app
