import os
import pytest
from app import create_app, db
from config import TestingConfig

# Ensure we are using the test environment
os.environ["FLASK_ENV"] = "testing"

@pytest.fixture
def app():
    """Create and configure a new app instance for each test."""
    app = create_app()
    app.config.from_object(TestingConfig)

    with app.app_context():
        db.create_all()  # Create test database schema
        yield app
        db.session.remove()  # Ensure no open transactions
        db.drop_all()  # Clean up test database after tests

@pytest.fixture
def client(app):
    """Provide a test client for the Flask application."""
    return app.test_client()

@pytest.fixture
def runner(app):
    """Provide a test CLI runner for the Flask application."""
    return app.test_cli_runner()
