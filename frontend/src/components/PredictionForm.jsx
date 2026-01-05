import React, { useState } from 'react';
import { Calendar, Loader } from 'lucide-react';

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
        <div className="form-container">
            <h3>Prediction Parameters</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Selected Location:</label>
                    <div className="location-display">
                        {selectedLocation ?
                            `${selectedLocation.lat.toFixed(4)}, ${selectedLocation.lng.toFixed(4)}` :
                            "No location selected (Click on map)"}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="date">Date (Optional):</label>
                    <div className="input-wrapper">
                        <Calendar size={18} className="input-icon" />
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
                    {loading ? <><Loader className="spin" /> Analyzing...</> : "Generate Intelligence Report"}
                </button>
            </form>
        </div>
    );
};

export default PredictionForm;
