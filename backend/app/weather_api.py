# app/weather_api.py
import requests

OPEN_METEO_URL = "https://archive-api.open-meteo.com/v1/archive"

def fetch_weather(lat: float, lon: float, start: str, end: str):
    params = {
        "latitude": lat,
        "longitude": lon,
        "start_date": start,
        "end_date": end,
        "daily": "temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min",
        "timezone": "UTC"
    }
    response = requests.get(OPEN_METEO_URL, params=params)
    if response.status_code != 200:
        raise Exception(f"Open-Meteo error: {response.text}")
    return response.json()
