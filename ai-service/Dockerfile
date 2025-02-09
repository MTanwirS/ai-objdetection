 # Backend Dockerfile
 FROM python:latest

 WORKDIR /ai-serv

 COPY requirements.txt .

 RUN pip install --no-cache-dir -r requirements.txt

 COPY . .

 EXPOSE 8000

 CMD ["uvicorn", "main:app"]