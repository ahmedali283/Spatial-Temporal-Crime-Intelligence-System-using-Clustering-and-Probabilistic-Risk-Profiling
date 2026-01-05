import React, { useState, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import MapComponent from '../components/MapComponent';
import PredictionForm from '../components/PredictionForm';
import ResultDisplay from '../components/ResultDisplay';

const Analysis = () => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [predictionData, setPredictionData] = useState(null);
    const [loading, setLoading] = useState(false);
    const resultsRef = useRef(null);

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
            // Smooth scroll to results after a short delay to allow render
            setTimeout(() => {
                resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        } catch (error) {
            console.error("Error predicting crime:", error);
            alert("Failed to get prediction from server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="analysis-page"
        >
            <header className="analysis-header">
                <h2>Live Intelligence Dashboard</h2>
                <p>Select a location to generate a real-time risk profile.</p>
            </header>

            <div className="dashboard-grid">
                <div className="control-panel">
                    <MapComponent
                        selectedLocation={selectedLocation}
                        onLocationSelect={setSelectedLocation}
                    />
                    <PredictionForm
                        selectedLocation={selectedLocation}
                        onLocationUpdate={setSelectedLocation}
                        onPredict={handlePredict}
                        loading={loading}
                    />
                </div>

                <div className="results-panel" ref={resultsRef}>
                    {predictionData ? (
                        <ResultDisplay data={predictionData} />
                    ) : (
                        <div className="empty-state">
                            <p>Awaiting Geographical Input...</p>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default Analysis;
