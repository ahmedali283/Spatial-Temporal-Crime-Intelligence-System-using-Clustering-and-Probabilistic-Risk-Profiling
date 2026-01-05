from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import uvicorn
from . import testing
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this to the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictionRequest(BaseModel):
    latitude: float
    longitude: float
    date: Optional[str] = None

@app.get("/")
def read_root():
    return {"message": "Crime Intelligence API is running"}

@app.post("/predict")
def predict(request: PredictionRequest):
    try:
        # Call the prediction function from testing.py
        # We need to ensure testing.py exposes this function widely
        result = testing.predict_location_and_trend(
            request.latitude, 
            request.longitude, 
            request.date
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
