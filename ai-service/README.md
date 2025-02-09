# AI Component

## Overview
This component provides an AI backend for object detection using the YOLO model (v11). It is built with FastAPI and runs with Uvicorn.

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/MTanwirS/
    cd 
    ```
2. Create a virtual environment:
    Navigate to the `ai-service` directory

    ```bash
    cd ai-service
    ```
    Create a python virtual environment if needed - Replace myvenv with name as needed
    ```bash
    python -m venv myvenv
    ```

    Activate the virtual environment


    ```bash
    myvenv\Scripts\activate
    ```
    On linux  `source myvenv/bin/activate`

3. Install the dependencies:
    ```bash
    python -m pip install -r requirements.txt
    ```

## Usage
1. Run the FastAPI server:
    ```bash
    uvicorn main:app
    ```
2. Run tests
    ```bash
    pytest ./tests/
    ```

## API Documentation
### POST /predict
- **Description**: Predicts objects in an uploaded image.
- **Request**: Upload an image file.
- **Response**: JSON with detection results and the processed image.

## Examples
To test the API without any frontend , use the following command:
```sh
# On Linux:
python predict.py "/path/to/file with spaces/image.jpg"

# On Windows:
python predict.py "C:\path\to\file with spaces\image.jpg"
```
