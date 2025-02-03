from sqlalchemy import Column, String, Integer, DateTime, JSON, Boolean, ForeignKey
import datetime
from .db import db

class Itinerary(db.Model):
    __tablename__ = 'itineraries'

    id = Column(Integer, primary_key=True)
    clerk_id = Column(String(255), nullable=False)
    name = Column(String(126), nullable=False)
    activity = Column(JSON, nullable=False)
    saved = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.now(datetime.UTC))
    share_code = Column(String(126), unique=True, nullable=True)

    def as_dict(self):
        return {
            'id': self.id,
            'clerk_id': self.clerk_id,
            'name': self.name,
            'activity': self.activity,
            'saved': self.saved,
            'created_at': self.created_at
        }

from app.db import db

class UserItinerary(db.Model):
    __tablename__ = "user_itineraries"

    id = Column(Integer, primary_key=True)
    clerk_id = Column(String, nullable=False)
    itinerary_id = Column(Integer, ForeignKey("itineraries.id"), nullable=False)

    itinerary = db.relationship("Itinerary", backref="user_itineraries", lazy=True)
