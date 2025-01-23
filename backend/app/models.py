from sqlalchemy import Column, String, Integer, DateTime, JSON, Boolean
import datetime
from .db import db

class Itinerary(db.Model):
    __tablename__ = 'itineraries'

    id = Column(Integer, primary_key=True)
    clerk_id = Column(String(255), nullable=False)
    name = Column(String(126), nullable=False)
    activity = Column(JSON, nullable=False)
    saved = Column(Boolean, default=False)
    start_date = Column(DateTime, nullable=True)
    end_date = Column(DateTime, nullable=True)
    created_at= Column(DateTime, default=datetime.datetime.now(datetime.UTC))

    def as_dict(self):
        return {
            'id': self.id,
            'clerk_id': self.clerk_id,
            'name': self.name,
            'activity': self.activity,
            'saved': self.saved,
            'start_date': self.start_date,
            'end_date': self.end_date,
            'created_at': self.created_at
        }