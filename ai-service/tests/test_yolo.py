import pytest
from PIL import Image
from unittest.mock import patch, MagicMock
import io
import sys
import os
import numpy as np

# Add the path to the directory containing yolo.py
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Import the predict function from yolo.py
from yolo import predict

def test_predict_valid_image():
    # Mock an image bytes object
    image_bytes = io.BytesIO()
    Image.new('RGB', (100, 100)).save(image_bytes, format='PNG')
    image_bytes = image_bytes.getvalue()

    # Mock the YOLO model
    with patch('yolo.YOLO') as MockModel:
        mock_instance = MockModel.return_value
        mock_results = MagicMock()
        # Ensure to_json returns a valid JSON string
        mock_results.to_json.return_value = '[{"dummy": "json"}]'
        mock_results.plot.return_value = np.zeros((100, 100, 3), dtype=np.uint8)

        # Directly mock the Results object
        with patch('yolo.model', return_value=[mock_results]):
            json_results, img_byte_arr = predict(image_bytes)

            # Debugging statements
            print("Mocked JSON Results: ", mock_results.to_json.return_value)
            print("Predicted JSON Results: ", json_results)

            # Assertions
            assert "dummy" in json_results
            assert isinstance(json_results, str)
            assert isinstance(img_byte_arr, bytes)

def test_predict_invalid_image():
    # Mock invalid image bytes object
    invalid_image_bytes = b"not an image"

    # Call the predict function with invalid image bytes
    json_results, img_byte_arr = predict(invalid_image_bytes)

    # Assertions
    assert "error" in json_results
    assert img_byte_arr is None