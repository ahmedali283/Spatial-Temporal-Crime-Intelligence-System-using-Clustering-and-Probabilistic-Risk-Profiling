import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Activity, Map, ArrowRight } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="hero-content"
            >
                <Shield size={80} className="hero-icon" />
                <h1 className="hero-title">Spatial-Temporal Crime Intelligence</h1>
                <p className="hero-subtitle">
                    Advanced probabilistic risk profiling and predictive analysis system.
                </p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cta-button big-cta"
                    onClick={() => navigate('/analyze')}
                >
                    Launch Intelligence System <ArrowRight size={20} />
                </motion.button>
            </motion.div>

            <div className="features-grid">
                <FeatureCard
                    icon={<Map size={32} />}
                    title="Geospatial Analysis"
                    desc="Precise location-based clustering using high-density historical data."
                    delay={0.2}
                />
                <FeatureCard
                    icon={<Activity size={32} />}
                    title="Predictive Trends"
                    desc="Temporal forecasting to anticipate crime rate fluctuations."
                    delay={0.4}
                />
                <FeatureCard
                    icon={<Shield size={32} />}
                    title="Risk Profiling"
                    desc="Comprehensive breakdown of high-risk and low-risk crime types."
                    delay={0.6}
                />
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.6 }}
        className="feature-card"
    >
        <div className="feature-icon">{icon}</div>
        <h3>{title}</h3>
        <p>{desc}</p>
    </motion.div>
);

export default Home;
