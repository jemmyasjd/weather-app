# app/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from app.schemas import WeatherRequest
from app.weather_api import fetch_weather
from app.storage import upload_json, list_files, get_file_content

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.post("/store-weather-data")
def store_weather(data: WeatherRequest):
    if (data.end_date - data.start_date).days > 31:
        raise HTTPException(status_code=400, detail="Date range cannot exceed 31 days")

    try:
        weather_data = fetch_weather(data.latitude, data.longitude, str(data.start_date), str(data.end_date))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    timestamp = int(datetime.utcnow().timestamp())
    file_name = f"weather_{data.latitude}_{data.longitude}_{data.start_date}_{data.end_date}_{timestamp}.json"
    try:
        upload_json(file_name, weather_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return {"status": "ok", "file": file_name}

@app.get("/list-weather-files")
def list_weather_files():
    try:
        files = list_files()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return {"files": files}

@app.get("/weather-file-content/{file_name}")
def get_weather_file(file_name: str):
    content = get_file_content(file_name)
    if not content:
        raise HTTPException(status_code=404, detail={"status": "error", "message": "not found"})
    return content

@app.get("/health")
def health():
    return {"status": "ok"}