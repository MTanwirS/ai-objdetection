# Technical Assessment

This document outlines the development of microservice consisting of two main components: a UI backend service and an AI backend service.

The UI end takes the image input from the user.

The AI backend utilizes a lightweight open-source model to perform object detection and returns the results in a structured JSON format. 

The two components communicate seamlessly to provide a comprehensive solution to the user.

## Prerequisites
To successfully replicate this solution, ensure you have the following installed:
- Docker: For containerization of the application.
- Python (Flask or FastAPI): For building the backend services.
- Lightweight Detection Model: Any open-source model suitable for object detection (e.g., YOLO, MobileNet SSD,etc)

(for reference use:- https://github.com/ultralytics/yolov3) for detection, if you dont have GPU, use CPU to complete your task
## Deliverables
- Your task project folder should be zipped and mailed to us,such that we should be able to replicate your solution in our system or share your github private link.
- A documentation to your project solution, essentially the steps, how did you to reach to the solution (any reference you took from anywhere mention it in the documentation)
- Output images (containing the bounding box) and corresponding json files.

---

# AI Microservice

## Overview
This project consists of two components: the AI Component and the UI Component. The AI Component provides an AI backend for object detection that uses Python, and the UI Component is a Next.js-based frontend for interacting with the AI backend.

## Prerequisites

Before you start, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (for the frontend)
- [Python](https://www.python.org/downloads/) (for the backend)
- [pip](https://pip.pypa.io/en/stable/) (Python package manager)
- [npm](https://www.npmjs.com/) (Node package manager)

## Structure
- `ai-micro`: Contains documentation for the project.
- `ai-micro/ai-service/`: Contains the AI backend code and documentation.
- `ai-micro/ui-service/`: Contains the frontend code and documentation.

 **Frontend** will be available at `http://localhost:3000`.

**Backend** will be available at `http://localhost:8000`.

**Upload the image to get the object detection result**

## Clone the repository
```bash
git clone https://github.com/MTanwirS/ai-objdetection.git
cd ai-objdetection
```

## Install and run using Docker

You can build and run both services using Docker Compose with the following command in the `ai-micro` folder:

   ```bash
   docker-compose up --build

   # To stop the run
   docker-compose down
   ```
Build, Run, Stop - only Frontend 
```bash
docker build -f ui-service/Dockerfile -t UI-app ui-serv

docker run -p 3000:3000 UI-app

docker stop AI-app
```

Build, Run, Stop - only Backend
```bash
docker build -f ai-service/Dockerfile -t AI-app ai-serv

docker run -p 8000:8000 AI-app

docker stop AI-app
```

## Installation and Usage (non-Docker)

### Install dependencies for the frontend (Next.js)


Navigate to the `ui-service` directory and install the dependencies.

```bash
cd ui-service
npm install
```
Refer to `ai-micro/ui-service/README.md` for detailed instructions on installing and running the UI component.

### Install dependencies for the backend (FastAPI)
Navigate to the `ai-service` directory

```bash
cd ai-service
```
(Optional) Create a python virtual environment if needed - Replace myvenv with name as needed. Activate the virtual environment.
```bash
python -m venv myvenv

# Windows
myvenv\Scripts\activate

# Linux
source myvenv/bin/activate
```

Install the dependencies:
```bash
python -m pip install -r requirements.txt
```

Refer to `ai-micro/ai-service/README.md` for detailed instructions on installing and running the AI component.

### Running the application

#### Method 1 : Using Concurrently

Install concurrently to run both servers together:

```bash
cd ui-service
npm install concurrently --save-dev
```
Update the scripts section of your `ui-service/package.json` to include:

```json
"scripts": {
  "devapp": "concurrently \"npm run dev:frontend\" \"npm run dev:backend\"",
  "dev:frontend": "next dev",
  "dev:backend": "uvicorn main:app"
}
```
Now, you can run both servers by executing:

```bash
npm run devapp
```

#### Method 2 : Use two terminals

To run the frontend `ui-service` (Next.js) server, use the following command:

```bash
npm run dev
```

To run the backend (FastAPI) server, use the following command:

```bash
uvicorn main:app
```

#### Method 3 : Using `pm2` (for Node.js + Uvicorn)

Install `pm2` globally:
You can install `pm2` globally with the following command:

```bash
npm install pm2 -g
```

Start both services:
First, run the frontend with `pm2`:

```bash
pm2 start npm --name "frontend" -- run dev
```

Then, run the FastAPI backend with `pm2`:

```bash
pm2 start uvicorn --name "backend" -- main:app
```

`pm2` allows you to monitor, restart, and manage the processes efficiently.

```bash
# To see the status of the processes:
pm2 list

#To stop both services:
pm2 stop all
```
#### Method 4 
Run the following python program
```bash
./ai-service/runServers.py
```

### Stopping Processes:
The `KeyboardInterrupt` will trigger the cleanup, and the `subprocess` objects are sent a `SIGINT` signal to stop them. These are equivalent to manually pressing `Ctrl+C` to stop the processes.



