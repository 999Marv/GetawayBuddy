from os import getenv
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = getenv("DATABASE_URL", "sqlite:///default.db")

class Config:
    SECRET_KEY = 'your-secret-key'
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = "postgresql://marvinsiri:1234@localhost:5432/itinerary"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
