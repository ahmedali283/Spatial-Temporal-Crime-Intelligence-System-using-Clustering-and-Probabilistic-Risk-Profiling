import joblib
import pandas as pd
import os

try:
    path = "backend/spatial_intelligence_artifacts.joblib"
    if not os.path.exists(path):
        print(f"File not found at {path}")
        # Try root
        path = "spatial_intelligence_artifacts.joblib"

    print(f"Loading {path}...")
    artifacts = joblib.load(path)
    
    # Check cluster_crime_dist
    print("\nKeys:", artifacts.keys())
    
    if "cluster_crime_dist" in artifacts:
        df = artifacts["cluster_crime_dist"]
        print("\nDF Head:")
        print(df.head(1))
        
        print("\nFirst row 'top5_crimes' type:", type(df.iloc[0]["top5_crimes"]))
        print("First row 'top5_crimes' value:", df.iloc[0]["top5_crimes"])
        
        print("\nFirst row 'bottom5_crimes' type:", type(df.iloc[0]["bottom5_crimes"]))
        print("First row 'bottom5_crimes' value:", df.iloc[0]["bottom5_crimes"])
    else:
        print("cluster_crime_dist not found in artifacts")

except Exception as e:
    print(f"Error: {e}")
