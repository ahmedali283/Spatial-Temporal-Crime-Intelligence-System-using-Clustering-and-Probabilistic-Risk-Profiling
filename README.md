<p align="center">
  <img src="https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI">
  <img src="https://img.shields.io/badge/Scikit--Learn-ML-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white" alt="Scikit-Learn">
</p>

<h1 align="center">Spatial-Temporal Crime Intelligence System</h1>

<p align="center">
  <strong>Advanced Geospatial Crime Analysis with Probabilistic Risk Profiling & Predictive Trend Forecasting</strong>
</p>

<p align="center">
  A full-stack machine learning application that leverages spatial clustering algorithms and temporal trend analysis to provide actionable crime intelligence for any geographic location in Karachi, Pakistan.
</p>

---

## Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Reference](#-api-reference)
- [Data Pipeline](#-data-pipeline)
- [Model Training](#-model-training)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## Overview

The **Spatial-Temporal Crime Intelligence System** is an end-to-end solution designed for crime risk assessment and forecasting. By combining **geospatial clustering** with **probabilistic crime type distribution** and **temporal trend regression**, the system provides:

- **Location-based risk profiling** — Identify high-risk vs. low-risk crime types for any coordinate
- **Crime trend forecasting** — Predict future crime rates using historical monthly data
- **Area intelligence** — Discover dominant towns, subdivisions, and crime hotspots
- **Interactive visualization** — Explore results through a modern, data-rich UI

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Geospatial Clustering** | K-Means clustering on latitude/longitude to group crime-prone regions |
| **Probabilistic Crime Prediction** | Top 5 most/least likely crime types based on historical cluster distribution |
| **Temporal Trend Analysis** | Linear regression on monthly crime counts to forecast future incidents |
| **Nearest Neighbor Mapping** | Efficiently assigns new coordinates to existing crime clusters |
| **Interactive Map** | Leaflet-based map for pinpoint location selection |
| **REST API** | FastAPI backend with CORS-enabled endpoints |
| **Cyber/Sci-Fi UI** | Modern React interface with Framer Motion animations |

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React + Vite)                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │  Map View   │  │ Input Form  │  │    Results Dashboard    │  │
│  │  (Leaflet)  │  │ (Lat/Lon)   │  │  (Charts + Risk Cards)  │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└──────────────────────────┬──────────────────────────────────────┘
                           │ HTTP POST /predict
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND (FastAPI)                          │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                   Prediction Engine                      │    │
│  │  • StandardScaler (coordinate normalization)           │    │
│  │  • NearestNeighbors (cluster assignment)               │    │
│  │  • Cluster Profiles & Trends Lookup                    │    │
│  └─────────────────────────────────────────────────────────┘    │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    ML ARTIFACTS (.joblib)                       │
│  • Fitted NearestNeighbors model                               │
│  • StandardScaler for coordinates                              │
│  • Cluster profiles (town, subdivision, incidents)             │
│  • Monthly crime trends (slope, R², projections)               │
│  • Crime type distribution per cluster                         │
│  └─────────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **Python 3.10+** | Core programming language |
| **FastAPI** | High-performance REST API framework |
| **Uvicorn** | ASGI server for async handling |
| **Scikit-Learn** | Machine learning (K-Means, NearestNeighbors, LinearRegression) |
| **Pandas** | Data manipulation and analysis |
| **NumPy** | Numerical computations |
| **Joblib** | Model serialization |

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 19** | UI framework |
| **Vite** | Build tool and dev server |
| **Leaflet / React-Leaflet** | Interactive mapping |
| **Framer Motion** | Smooth animations |
| **Recharts** | Data visualization |
| **Axios** | HTTP client |
| **Lucide React** | Icon library |

---

## Installation

### Prerequisites

- Python 3.10 or higher
- Node.js 18 or higher
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/Spatial-Temporal-Crime-Intelligence-System.git
cd Spatial-Temporal-Crime-Intelligence-System
```

### 2. Backend Setup

```bash
# Install Python dependencies
pip install -r backend/requirements.txt
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install Node dependencies
npm install
```

### 4. Quick Start (Windows)

Simply run the batch file to start both servers:

```bash
start_app.bat
```

This will:
- Launch the FastAPI backend on `http://localhost:8000`
- Launch the Vite frontend on `http://localhost:5173`

### Manual Start

**Backend:**
```bash
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

**Frontend:**
```bash
cd frontend
npm run dev
```

---

## Usage

1. **Open the application** at `http://localhost:5173`
2. **Navigate** to the Analysis page via the "Launch Intelligence System" button
3. **Select a location** by either:
   - Clicking on the interactive map
   - Manually entering latitude/longitude coordinates
4. **Optionally** set a target date for temporal context
5. **Click "Analyze Location"** to receive:
   - Cluster assignment and area intelligence
   - Top 5 most likely crime types with probabilities
   - Top 5 least likely crime types
   - Crime trend direction (increasing/decreasing/stable)
   - Next month crime projection
   - Overall risk verdict

---

## API Reference

### Base URL
```
http://localhost:8000
```

### Endpoints

#### `GET /`
Health check endpoint.

**Response:**
```json
{
  "message": "Crime Intelligence API is running"
}
```

#### `POST /predict`
Predict crime intelligence for a given location.

**Request Body:**
```json
{
  "latitude": 24.8607,
  "longitude": 67.0011,
  "date": "2025-01-15"  // Optional
}
```

**Response:**
```json
{
  "cluster_id": 15,
  "nearest_distance": 0.0023,
  "likely_town": "Saddar Town",
  "likely_subdivision": "Civil Lines",
  "top_3_towns": ["Saddar Town", "Jamshed Town", "Gulshan Town"],
  "top_3_subdivisions": ["Civil Lines", "Garden", "PECHS"],
  "total_incidents_in_cluster": 3542,
  "top_5_most_likely_crimes": [["THEFT", 0.32], ["ROBBERY", 0.21], ...],
  "top_5_least_likely_crimes": [["KIDNAPPING", 0.01], ...],
  "crime_trend_slope_per_month": 2.5,
  "trend_r2": 0.78,
  "last_month": "2024-12",
  "last_month_crime_count": 142,
  "next_month_projection": 145
}
```

---

## Data Pipeline

### Input Data
The system processes the Karachi Crime Dataset (`karachi_crime_dataset_cleaned.csv`) containing:
- **100,000+ crime records**
- **29 features** including location, time, crime type, severity, and administrative boundaries

### Processing Steps

1. **Data Cleaning & Normalization**
   - Crime type standardization
   - Coordinate validation
   - Temporal feature extraction

2. **Spatial Clustering**
   - K-Means clustering on (lat, lon) coordinates
   - Cluster profiling (dominant areas, incident counts)

3. **Crime Distribution**
   - Per-cluster crime type frequency calculation
   - Probability distribution for each crime category

4. **Trend Analysis**
   - Monthly aggregation per cluster
   - Linear regression for slope calculation
   - R² scoring for trend reliability

---

## Model Training

Training notebooks are provided for reproducibility:

| Notebook | Purpose |
|----------|---------|
| `karachi_crime_preprocessing_crime_type_normalization.ipynb` | Data cleaning and crime type mapping |
| `karachi_highrisk_preprocessing_leakage_safe_root.ipynb` | Feature engineering with leakage prevention |
| `karachi_highrisk_training_evaluation_compare_models.ipynb` | Model comparison and evaluation |
| `karachi_spatial_intelligence_training_evaluation.ipynb` | **Main training pipeline** — produces final artifacts |

### Output Artifacts

The training produces `spatial_intelligence_artifacts.joblib` containing:
- `scaler` — Fitted StandardScaler
- `nearest_neighbors` — Fitted NearestNeighbors model
- `y_cluster` — Cluster labels for reference points
- `cluster_profiles` — DataFrame with area intelligence
- `cluster_trends` — DataFrame with temporal trends
- `cluster_crime_dist` — DataFrame with crime type distributions

---

## Project Structure

```
📦 Spatial-Temporal-Crime-Intelligence-System
├── 📂 backend/
│   ├── __init__.py
│   ├── main.py                 # FastAPI application
│   ├── testing.py              # Prediction engine
│   ├── requirements.txt        # Python dependencies
│   └── spatial_intelligence_artifacts.joblib
│
├── 📂 frontend/
│   ├── 📂 src/
│   │   ├── 📂 components/      # React components
│   │   │   ├── AnimatedBackground.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── MapComponent.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PredictionForm.jsx
│   │   │   ├── ResultDisplay.jsx
│   │   ├── 📂 pages/
│   │   │   ├── Analysis.jsx
│   │   │   ├── FAQ.jsx
│   │   │   ├── Home.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── 📂 Pre Processed Data/
│   ├── karachi_crime_dataset_cleaned.csv
│   ├── X_train.npz / X_test.npz
│   └── y_train.csv / y_test.csv
│
├── 📂 Trained Model (.joblib)/
│   ├── spatial_intelligence_artifacts.joblib
│   ├── cluster_profiles.csv
│   ├── cluster_crime_dist.csv
│   └── cluster_monthly_trends.csv
│
├── 📂 Figures/                 # EDA visualizations
│
├── 📂 Project Report/          # Documentation
│
├── 📓 *.ipynb                  # Training notebooks
├── start_app.bat               # Quick start script (Windows)
└── README.md
```

---

## Screenshots

<p align="center">
  <em>Screenshots coming soon...</em>
</p>

<!-- Add screenshots here when available
![Home Page](./Figures/screenshot_home.png)
![Analysis Dashboard](./Figures/screenshot_analysis.png)
-->

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Authors

- **Ahmed Ali** - *Data Preprocessing, Feature Engineering, KMEANS, HDSCAN,* - [GitHub Profile](https://github.com/ahmedali283)
- **Bazil Altaf** - *Data Visualization, OPTICS, LINEAR REGRESSION,* - [GitHub Profile](https://github.com/ahmedali283)

---

## Acknowledgments

- Karachi Crime Dataset contributors
- OpenStreetMap for map tiles
- The open-source community

---

<p align="center">
  Made with ❤️ for safer communities
</p>
