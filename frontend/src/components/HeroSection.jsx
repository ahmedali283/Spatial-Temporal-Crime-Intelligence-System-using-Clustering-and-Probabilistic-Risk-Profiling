import React from 'react';
import { Shield, ChevronDown } from 'lucide-react';

const HeroSection = ({ onGetStarted }) => {
    return (
        <div className="hero-container">
            <div className="hero-content">
                <Shield size={64} color="#001f3f" strokeWidth={1.5} />
                <h1>Crime Intelligence System</h1>
                <p>Spatial-Temporal Crime Analysis & Risk Profiling</p>
                <button className="cta-button" onClick={onGetStarted}>
                    Analyze Location
                </button>
            </div>
            <div className="hero-scroll">
                <p>Scroll to Explore</p>
                <ChevronDown size={24} />
            </div>
        </div>
    );
};

export default HeroSection;
