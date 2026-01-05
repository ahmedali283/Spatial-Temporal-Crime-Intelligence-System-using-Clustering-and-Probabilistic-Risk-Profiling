import React, { useState } from 'react';
import { Calendar, Loader, Sliders, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const PredictionForm = ({ selectedLocation, onPredict, loading }) => {
    const [date, setDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedLocation) {
            onPredict({
                lat: selectedLocation.lat,
                lon: selectedLocation.lng,
                date: date
            });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="form-container"
        >
            <h3><Sliders size={24} /> Prediction Parameters</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Selected Location</label>
                    <div className={`location-display ${selectedLocation ? 'active' : ''}`}>
                        {selectedLocation ? (
                            <>
                                <span><MapPin size={16} style={{ marginRight: 8 }} /> {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}</span>
                                <span style={{ fontSize: '0.8em', color: 'green' }}>✓ Set</span>
                            </>
                        ) : (
                            <span>Click on map to select...</span>
                        )}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="date">Analysis Date (Optional)</label>
                    <div className="input-wrapper">
                        <Calendar size={20} className="input-icon" color="#777" />
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="predict-button"
                    disabled={!selectedLocation || loading}
                >
                    {loading ? <><Loader className="spin" /> Analyzing Intelligence Matrix...</> : "Generate Risk Profile"}
                </button>
            </form>
        </motion.div>
    );
};

export default PredictionForm;
