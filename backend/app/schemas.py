# app/schemas.py
from pydantic import BaseModel, Field, confloat, model_validator
from datetime import date
from typing import List, Dict, Any


class WeatherRequest(BaseModel):
    latitude: confloat(ge=-90, le=90) = Field(..., description="Latitude between -90 and 90")
    longitude: confloat(ge=-180, le=180) = Field(..., description="Longitude between -180 and 180")
    start_date: date = Field(..., description="Start date in YYYY-MM-DD format")
    end_date: date = Field(..., description="End date in YYYY-MM-DD format")

    @model_validator(mode="after")
    def validate_date_range(self):
        if self.end_date < self.start_date:
            raise ValueError("end_date cannot be earlier than start_date")

        if (self.end_date - self.start_date).days > 31:
            raise ValueError("Date range cannot exceed 31 days")

        return self
