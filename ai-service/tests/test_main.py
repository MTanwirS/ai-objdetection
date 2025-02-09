import pytest
from fastapi.testclient import TestClient
from fastapi import HTTPException
import sys
import os
import io

# Add the path to the directory containing main.py
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from main import app

client = TestClient(app)

def test_predict_endpoint_valid_image():
    # Upload a valid image file
    with open('./premium_photo.jpg', 'rb') as f:
        response = client.post("/predict", files={"file": f})

    # Assertions
    assert response.status_code == 200
    data = response.json()
    assert "results" in data
    assert "image" in data

def test_predict_endpoint_invalid_image():
    # Upload an invalid image file
    invalid_image = io.BytesIO(b"not an image")
    response = client.post("/predict", files={"file": ("invalid_image.jpg", invalid_image, "image/jpeg")})

    # Assertions
    assert response.status_code == 400
    data = response.json()
    assert "detail" in data