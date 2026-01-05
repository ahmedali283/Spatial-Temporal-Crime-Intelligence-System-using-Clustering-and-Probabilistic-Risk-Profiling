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

import re

def parse_crime_strings(crime_list):
    """
    Parses a list of tuples like [("Type", 0.123), ("Type2", 0.456)] 
    into [{"name": "Type", "prob": 0.123}, ...]
    """
    print(f"DEBUG INPUT: {crime_list}") 
    if not crime_list:
        return []
    
    parsed = []
    
    # It is a list of tuples based on inspection
    if isinstance(crime_list, list):
        for item in crime_list:
            # item should be a tuple or list of 2 elements
            try:
                if len(item) >= 2:
                    name = str(item[0])
                    prob = float(item[1])
                    parsed.append({
                        "name": name,
                        "probability": prob,
                        "percentage": round(prob * 100, 1)
                    })
            except Exception as e:
                print(f"Error parsing item {item}: {e}")
                continue
                
    return parsed

@app.post("/predict")
def predict(request: PredictionRequest):
    try:
        result = testing.predict_location_and_trend(
            request.latitude, 
            request.longitude, 
            request.date
        )
        
        # Parse the specific fields
        if "top_5_most_likely_crimes" in result:
             result["top_5_parsed"] = parse_crime_strings(result["top_5_most_likely_crimes"])
             
        if "top_5_least_likely_crimes" in result:
             result["bottom_5_parsed"] = parse_crime_strings(result["top_5_least_likely_crimes"])

        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
