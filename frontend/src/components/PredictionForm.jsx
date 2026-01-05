import React, { useState, useEffect } from 'react';
import { Calendar, Loader, Sliders, MapPin, Crosshair } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PredictionForm = ({ selectedLocation, onLocationUpdate, onPredict, loading }) => {
    const [date, setDate] = useState('');
    const [latInput, setLatInput] = useState('');
    const [lngInput, setLngInput] = useState('');

    // Sync local inputs when map selection changes
    useEffect(() => {
        if (selectedLocation) {
            setLatInput(selectedLocation.lat.toFixed(6));
            setLngInput(selectedLocation.lng.toFixed(6));
        }
    }, [selectedLocation]);

    const handleManualUpdate = () => {
        const lat = parseFloat(latInput);
        const lng = parseFloat(lngInput);
        if (!isNaN(lat) && !isNaN(lng)) {
            onLocationUpdate({ lat, lng });
        }
    };

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

    const inputVariants = {
        focus: { scale: 1.02, borderColor: "#00b4d8", boxShadow: "0 0 0 3px rgba(0, 180, 216, 0.1)" },
        hover: { scale: 1.01 }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="form-container"
        >
            <h3><Sliders size={24} /> Prediction Parameters</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Geo-Coordinates</label>
                    <div className="coords-grid">
                        <motion.div
                            className="input-wrapper"
                            whileHover="hover"
                            whileFocus="focus"
                            variants={inputVariants}
                        >
                            <span className="input-prefix">Lat</span>
                            <input
                                type="number"
                                step="any"
                                placeholder="Latitude"
                                value={latInput}
                                onChange={(e) => setLatInput(e.target.value)}
                                onBlur={handleManualUpdate}
                                className="coord-input"
                            />
                        </motion.div>
                        <motion.div
                            className="input-wrapper"
                            whileHover="hover"
                            whileFocus="focus"
                            variants={inputVariants}
                        >
                            <span className="input-prefix">Lng</span>
                            <input
                                type="number"
                                step="any"
                                placeholder="Longitude"
                                value={lngInput}
                                onChange={(e) => setLngInput(e.target.value)}
                                onBlur={handleManualUpdate}
                                className="coord-input"
                            />
                        </motion.div>
                    </div>
                </div>

                <div className="form-group">
                    <label>Selected Location Status</label>
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={selectedLocation ? 'active' : 'inactive'}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className={`location-display ${selectedLocation ? 'active' : ''}`}
                        >
                            {selectedLocation ? (
                                <>
                                    <span><Crosshair size={16} style={{ marginRight: 8 }} /> Coordinates Set</span>
                                    <span style={{ fontSize: '0.8em', color: 'green', fontWeight: 'bold' }}>READY</span>
                                </>
                            ) : (
                                <span>Click map or enter coordinates...</span>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="form-group">
                    <label htmlFor="date">Analysis Date (Optional)</label>
                    <motion.div
                        className="input-wrapper"
                        whileHover="hover"
                        whileFocus="focus"
                        variants={inputVariants}
                    >
                        <Calendar size={20} className="input-icon" color="#777" />
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </motion.div>
                </div>

                <motion.button
                    type="submit"
                    className="predict-button"
                    disabled={!selectedLocation || loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {loading ? <><Loader className="spin" /> Analyzing Intelligence Matrix...</> : "Generate Risk Profile"}
                </motion.button>
            </form>
        </motion.div>
    );
};

export default PredictionForm;
