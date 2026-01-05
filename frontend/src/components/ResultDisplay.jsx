import React from 'react';
import { AlertTriangle, TrendingUp, MapPin, Calendar } from 'lucide-react';

const ResultDisplay = ({ data }) => {
    if (!data) return null;

    return (
        <div className="results-container">
            <h2>Analysis Results</h2>

            <div className="result-grid">
                <div className="result-card high-priority">
                    <div className="card-header">
                        <MapPin size={20} />
                        <h3>Location Profile</h3>
                    </div>
                    <p><strong>Cluster ID:</strong> {data.cluster_id}</p>
                    <p><strong>Town:</strong> {data.likely_town}</p>
                    <p><strong>Subdivision:</strong> {data.likely_subdivision}</p>
                </div>

                {data.crime_trend_slope_per_month && (
                    <div className="result-card">
                        <div className="card-header">
                            <TrendingUp size={20} />
                            <h3>Trend Analysis</h3>
                        </div>
                        <p><strong>Slope:</strong> {data.crime_trend_slope_per_month} / month</p>
                        <p><strong>Next Month Projection:</strong> {data.next_month_projection} incidents</p>
                        <p><strong>Trend Reliability (R²):</strong> {data.trend_r2}</p>
                    </div>
                )}

                <div className="result-card">
                    <div className="card-header">
                        <AlertTriangle size={20} />
                        <h3>Risk Probabilities</h3>
                    </div>
                    <div className="risk-list">
                        <h4>Most Likely Crimes:</h4>
                        <ul>
                            {data.top_5_most_likely_crimes?.map((crime, idx) => (
                                <li key={idx} className="risk-high">{crime}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultDisplay;
