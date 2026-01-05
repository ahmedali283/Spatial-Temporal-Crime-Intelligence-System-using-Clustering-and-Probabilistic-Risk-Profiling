import joblib
import numpy as np
import pandas as pd

import os

# 1) Load artifacts
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
artifacts = joblib.load(os.path.join(BASE_DIR, "spatial_intelligence_artifacts.joblib"))

scaler = artifacts["scaler"]
nn = artifacts["nearest_neighbors"]               # already fitted NearestNeighbors
y_cluster = artifacts["y_cluster"]                # cluster label for each NN reference point

cluster_profiles = artifacts["cluster_profiles"]
cluster_trends = artifacts.get("cluster_trends", pd.DataFrame())

# ✅ NEW: cluster-level crime distribution
cluster_crime_dist = artifacts.get("cluster_crime_dist", pd.DataFrame())

# Build lookup dicts
profile_by_cluster = {int(r["cluster_id"]): r for _, r in cluster_profiles.iterrows()}

trend_by_cluster = (
    {int(r["cluster_id"]): r for _, r in cluster_trends.iterrows()}
    if not cluster_trends.empty else {}
)

crime_by_cluster = (
    {int(r["cluster_id"]): r for _, r in cluster_crime_dist.iterrows()}
    if not cluster_crime_dist.empty else {}
)

# 2) Define prediction function
def predict_location_and_trend(lat, lon, date=None):
    # Scale input
    x = np.array([[lat, lon]], dtype=np.float32)
    x_scaled = scaler.transform(x)

    # Nearest neighbor → cluster
    dist, idx = nn.kneighbors(x_scaled, n_neighbors=1, return_distance=True)
    cid = int(y_cluster[int(idx[0][0])])

    prof = profile_by_cluster.get(cid)
    trend = trend_by_cluster.get(cid)
    crime_info = crime_by_cluster.get(cid)

    result = {
        "cluster_id": cid,
        "nearest_distance": float(dist[0][0]),

        "likely_town": prof["dominant_town"] if prof is not None else None,
        "likely_subdivision": prof["dominant_subdivision"] if prof is not None else None,
        "top_3_towns": prof["top3_towns"] if prof is not None else None,
        "top_3_subdivisions": prof["top3_subdivisions"] if prof is not None else None,
        "total_incidents_in_cluster": int(prof["incidents"]) if prof is not None else None,

        # ✅ NEW: crime likelihoods from historical distribution
        "top_5_most_likely_crimes": crime_info["top5_crimes"] if crime_info is not None else None,
        "top_5_least_likely_crimes": crime_info["bottom5_crimes"] if crime_info is not None else None,
    }

    if trend is not None:
        result.update({
            "crime_trend_slope_per_month": round(float(trend["slope_per_month"]), 2),
            "trend_r2": round(float(trend["r2"]), 2),
            "last_month": trend["last_month"],
            "last_month_crime_count": int(trend["last_count"]),
            "next_month_projection": int(round(float(trend["next_month_projection"]))),
        })

    if date:
        dt = pd.to_datetime(date, errors="coerce")
        result["input_date"] = str(dt.date()) if pd.notna(dt) else None
        result["is_weekend"] = int(dt.dayofweek in [5, 6]) if pd.notna(dt) else None

    return result


# 3) Ask for user input
if __name__ == "__main__":
    lat = float(input("Enter latitude: "))
    lon = float(input("Enter longitude: "))
    date = input("Enter date (YYYY-MM-DD) or press Enter to skip: ").strip()
    date = date if date else None
    
    # 4) Run prediction
    output = predict_location_and_trend(lat, lon, date)
    
    # 5) Pretty print result
    print("\n===== LOCATION CRIME INTELLIGENCE RESULT =====")
    for k, v in output.items():
        print(f"{k}: {v}")
