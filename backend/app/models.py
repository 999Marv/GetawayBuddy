from sqlalchemy import Column, String, Integer, ForeignKey, DateTime, JSON, Boolean
from sqlalchemy.orm import relationship
import datetime
from .db import db

class User(db.Model):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    clerk_id = Column(String(255), unique=True, nullable=False)
    email = Column(String(120), unique=True, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.now(datetime.UTC))

    itineraries = relationship('Itinerary', back_populates='user')

    def as_dict(self):
        return {
            'id': self.id,
            'clerk_id': self.clerk_id,
            'email': self.email,
            'created_at': self.created_at
        }

class Itinerary(db.Model):
    __tablename__ = 'itineraries'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    name = Column(String(126), nullable=False)
    activity = Column(JSON, nullable=False)
    saved = Column(Boolean, default=False)
    start_date = Column(DateTime, nullable=True)
    end_date = Column(DateTime, nullable=True)
    created_at= Column(DateTime, default=datetime.datetime.now(datetime.UTC))

    user = relationship('User', back_populates='itineraries')

    def as_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'activity': self.activity,
            'saved': self.saved,
            'start_date': self.start_date,
            'end_date': self.end_date,
            'created_at': self.created_at
        }