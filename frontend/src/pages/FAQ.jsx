import React from 'react';
import { motion } from 'framer-motion';

const FAQ = () => {
    const faqs = [
        {
            q: "How accurate is the risk profiling?",
            a: "Our system uses historical data clustering and nearest neighbor algorithms to estimate risk profiles with high statistical significance, though no prediction is 100% guaranteed."
        },
        {
            q: "What data sources are used?",
            a: "We utilize publicly available crime records, spatial coordinates, and temporal timestamps from the Karachi region."
        },
        {
            q: "What does 'Cluster ID' mean?",
            a: "The Cluster ID represents a specific geographical zone that shares similar crime patterns. Our model groups nearby locations with similar history into these clusters."
        },
        {
            q: "Why are some probabilities 0%?",
            a: "A 0% probability indicates that in our historical dataset, no incidents of this specific type were recorded within your selected location's cluster."
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="faq-page"
        >
            <h2>Frequently Asked Questions</h2>
            <div className="faq-grid">
                {faqs.map((item, idx) => (
                    <div key={idx} className="faq-card">
                        <h3>{item.q}</h3>
                        <p>{item.a}</p>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default FAQ;
