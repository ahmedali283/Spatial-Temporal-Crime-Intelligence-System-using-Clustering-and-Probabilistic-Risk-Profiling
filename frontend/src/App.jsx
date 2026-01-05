import React, { useState, useRef } from 'react';
import axios from 'axios';
import HeroSection from './components/HeroSection';
import MapComponent from './components/MapComponent';
import PredictionForm from './components/PredictionForm';
import ResultDisplay from './components/ResultDisplay';

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [predictionData, setPredictionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const scrollToPrediction = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePredict = async (data) => {
    setLoading(true);
    setPredictionData(null);
    try {
      const response = await axios.post('http://localhost:8000/predict', {
        latitude: data.lat,
        longitude: data.lon,
        date: data.date || null
      });
      setPredictionData(response.data);
    } catch (error) {
      console.error("Error predicting crime:", error);
      alert("Failed to get prediction from server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <HeroSection onGetStarted={scrollToPrediction} />

      <div className="main-content" ref={scrollRef}>
        <div className="container">
          <h2 className="section-title">Crime Risk Analysis</h2>
          <div className="content-grid">
            <div className="left-panel">
              <MapComponent onLocationSelect={setSelectedLocation} />
              <PredictionForm
                selectedLocation={selectedLocation}
                onPredict={handlePredict}
                loading={loading}
              />
            </div>
            <div className="right-panel">
              {predictionData ? (
                <ResultDisplay data={predictionData} />
              ) : (
                <div className="placeholder-result">
                  <p>Select a location on the map and click "Generate Intelligence Report" to see risk analysis.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
