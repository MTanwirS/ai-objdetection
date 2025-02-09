from ultralytics import YOLO
from PIL import Image, UnidentifiedImageError
import io
import numpy as np

# Load the YOLO model
model = YOLO('yolo11n.pt')  # You can choose other versions like yolov8s.pt, yolov8m.pt, etc.

# Define a function to run inference and generate a plot
def predict(image_bytes):
  try:
    img = Image.open(io.BytesIO(image_bytes))
  except UnidentifiedImageError:
    return {"error": "Invalid image format"}, None

  try:
    results = model(img)
    json_results = results[0].to_json()

    # Generate an image with bounding boxes
    plotted_img = results[0].plot()
  except Exception as e:
    return {"error": str(e)}, None

  try:
    img_pil = Image.fromarray(plotted_img[..., ::-1])  # Convert BGR to RGB for PIL

    # Save the image for debugging
    # img_pil.save('./detected_image.png')

    # Convert the image to bytes
    img_byte_arr = io.BytesIO()
    img_pil.save(img_byte_arr, format='PNG')
    img_byte_arr = img_byte_arr.getvalue()
  except Exception as e:
    return {"error":str(e)}, None

  return json_results, img_byte_arr