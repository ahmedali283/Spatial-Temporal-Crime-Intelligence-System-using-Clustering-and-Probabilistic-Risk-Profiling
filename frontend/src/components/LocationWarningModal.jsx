import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPinOff, X } from 'lucide-react';

const LocationWarningModal = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="modal-overlay" style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', zIndex: 1000,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        style={{
                            background: 'white', padding: '2rem', borderRadius: '16px',
                            maxWidth: '400px', width: '90%', position: 'relative',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.2)', textAlign: 'center'
                        }}
                    >
                        <button onClick={onClose} style={{
                            position: 'absolute', top: '15px', right: '15px',
                            background: 'none', border: 'none', cursor: 'pointer', color: '#666'
                        }}>
                            <X size={20} />
                        </button>

                        <div style={{
                            background: '#fff0f0', width: '60px', height: '60px',
                            borderRadius: '50%', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', margin: '0 auto 1rem', color: '#e03131'
                        }}>
                            <MapPinOff size={30} />
                        </div>

                        <h3 style={{ margin: '0 0 0.5rem', color: '#333' }}>Location Out of Range</h3>
                        <p style={{ color: '#666', lineHeight: '1.5' }}>
                            We currently only support crime data intelligence for <strong>Karachi</strong>.
                            Data for other regions is coming soon!
                        </p>

                        <button onClick={onClose} style={{
                            marginTop: '1.5rem', width: '100%', padding: '0.8rem',
                            background: '#228be6', color: 'white', border: 'none',
                            borderRadius: '8px', fontWeight: '600', cursor: 'pointer',
                            fontSize: '1rem'
                        }}>
                            Got it
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default LocationWarningModal;
