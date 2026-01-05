import React, { useState, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import MapComponent from '../components/MapComponent';
import PredictionForm from '../components/PredictionForm';
import ResultDisplay from '../components/ResultDisplay';
import LocationWarningModal from '../components/LocationWarningModal';

// Approximate Bounding Box for Karachi
const KARACHI_BOUNDS = {
    minLat: 24.7,
    maxLat: 25.2,
    minLng: 66.7,
    maxLng: 67.6
};

const Analysis = () => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [predictionData, setPredictionData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const resultsRef = useRef(null);

    const checkLocation = (lat, lng) => {
        if (lat < KARACHI_BOUNDS.minLat || lat > KARACHI_BOUNDS.maxLat ||
            lng < KARACHI_BOUNDS.minLng || lng > KARACHI_BOUNDS.maxLng) {
            setShowWarning(true);
            return false; // Return false to indicate invalid location
        }
        return true;
    };

    const handleLocationUpdate = (loc) => {
        // ALWAYS update the selection so the user sees where they clicked/typed
        setSelectedLocation(loc);

        // THEN check if it's valid
        checkLocation(loc.lat, loc.lng);
    };

    const handlePredict = async (data) => {
        // Double check validation before sending request
        if (!checkLocation(data.lat, data.lon)) {
            return;
        }

        setLoading(true);
        setPredictionData(null);
        try {
            const response = await axios.post('http://localhost:8000/predict', {
                latitude: data.lat,
                longitude: data.lon,
                date: data.date || null
            });
            setPredictionData(response.data);
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
            <LocationWarningModal
                isOpen={showWarning}
                onClose={() => setShowWarning(false)}
            />

            <header className="analysis-header">
                <h2>Live Intelligence Dashboard</h2>
                <p>Select a location to generate a real-time risk profile.</p>
            </header>

            <div className="dashboard-grid">
                <div className="control-panel">
                    <MapComponent
                        selectedLocation={selectedLocation}
                        onLocationSelect={handleLocationUpdate}
                    />
                    <PredictionForm
                        selectedLocation={selectedLocation}
                        onLocationUpdate={handleLocationUpdate}
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
