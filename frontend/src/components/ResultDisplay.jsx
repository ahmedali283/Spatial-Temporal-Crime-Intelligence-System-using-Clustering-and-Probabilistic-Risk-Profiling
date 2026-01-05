import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import {
    AlertTriangle, TrendingUp, MapPin, CheckCircle, ShieldAlert,
    Skull, DollarSign, Package, Users, Activity, HelpCircle, List
} from 'lucide-react';
import { motion } from 'framer-motion';

const COLORS = ['#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600'];

const getCrimeIcon = (crimeName) => {
    const lower = crimeName.toLowerCase();
    if (lower.includes('murder') || lower.includes('homicide')) return <Skull size={18} />;
    if (lower.includes('theft') || lower.includes('burglary') || lower.includes('robbery') || lower.includes('snatching')) return <DollarSign size={18} />;
    if (lower.includes('drug')) return <Package size={18} />;
    if (lower.includes('gang') || lower.includes('violence')) return <Users size={18} />;
    if (lower.includes('assault')) return <Activity size={18} />;
    return <AlertTriangle size={18} />; // Default
};

const ResultDisplay = ({ data }) => {
    const [showAll, setShowAll] = useState(false);

    if (!data) return null;

    // Use parsed data from backend if available
    const riskData = data.top_5_parsed || [];
    const safeData = data.bottom_5_parsed || [];

    // Combine and sort for "Show All" (Ascending: Low -> High)
    const allCrimes = [...riskData, ...safeData].sort((a, b) => a.probability - b.probability);

    const chartData = riskData.map((item) => ({
        name: item.name,
        value: item.probability
    }));

    // --- NEW VERDICT LOGIC (Volume + Trend) ---
    // Thresholds based on historical data analysis (Median ~8, Top 20% ~15)
    let riskLevel = "Low Risk";
    let riskColor = "#2ecc71"; // Green
    let riskIcon = <CheckCircle />;

    const volume = data.next_month_projection || 0;
    const trend = data.crime_trend_slope_per_month || 0;

    if (volume > 15) {
        riskLevel = "Critical Risk";
        riskColor = "#d9534f"; // Red
        riskIcon = <ShieldAlert />;
    } else if (volume > 8) {
        riskLevel = "Moderate Risk";
        riskColor = "#f0ad4e"; // Orange
        riskIcon = <AlertTriangle />;
    }

    // Determine Trend Description
    let trendDesc = "Stable";
    if (trend > 0.5) trendDesc = "Increasing";
    else if (trend < -0.5) trendDesc = "Decreasing";

    // Combine for Final Verdict
    const verdict = {
        text: `${riskLevel} - ${trendDesc}`,
        color: riskColor,
        icon: riskIcon
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="results-container enhanced-results"
        >
            <div className="verdict-banner" style={{ borderLeftColor: verdict.color }}>
                <div className="verdict-icon" style={{ color: verdict.color }}>{verdict.icon}</div>
                <div>
                    <h4>Overall Verdict</h4>
                    <p className="verdict-text">{verdict.text}</p>
                </div>
            </div>

            <div className="result-grid-advanced">

                {/* Location Profile */}
                <div className="result-card">
                    <div className="card-header">
                        <MapPin size={20} />
                        <h3>Location Profile</h3>
                    </div>
                    <div className="detail-row">
                        <span>District/Town:</span>
                        <strong>{data.likely_town || "Unknown"}</strong>
                    </div>
                    <div className="detail-row">
                        <span>Subdivision:</span>
                        <strong>{data.likely_subdivision || "Unknown"}</strong>
                    </div>
                    <div className="detail-row">
                        <span>Cluster ID:</span>
                        <span className="badge">{data.cluster_id}</span>
                    </div>
                </div>

                {/* Trend Analysis */}
                {data.crime_trend_slope_per_month !== undefined && (
                    <div className="result-card">
                        <div className="card-header">
                            <TrendingUp size={20} />
                            <h3>Trend Analysis</h3>
                        </div>
                        <div className="stat-box">
                            <span className="stat-label">Projected Incidents</span>
                            <span className="stat-value">{data.next_month_projection}</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-label">Monthly Trend</span>
                            <span className={`stat-value ${data.crime_trend_slope_per_month > 0 ? "text-danger" : "text-success"}`}>
                                {data.crime_trend_slope_per_month > 0 ? "+" : ""}{data.crime_trend_slope_per_month}
                            </span>
                        </div>
                        <p className="subtext">R² Reliability: {(data.trend_r2 * 100).toFixed(1)}%</p>
                    </div>
                )}

                {/* VISUALIZATION TOGGLE SECTION */}
                <div className="result-card full-width">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #f0f0f0', paddingBottom: '1rem' }}>
                        <div className="card-header" style={{ margin: 0, border: 0, padding: 0 }}>
                            {showAll ? <List size={20} /> : <AlertTriangle size={20} />}
                            <h3 style={{ margin: 0 }}>{showAll ? "All Crime Probabilities (Ascending)" : "Top Risk Contributors"}</h3>
                        </div>
                        <button
                            onClick={() => setShowAll(!showAll)}
                            style={{
                                background: '#f8f9fa',
                                border: '1px solid #ddd',
                                padding: '0.4rem 1rem',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 500
                            }}
                        >
                            {showAll ? "Show Top 5 Only" : "Show All Crimes"}
                        </button>
                    </div>

                    {showAll ? (
                        <div className="all-crimes-list">
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px', fontWeight: 'bold', borderBottom: '2px solid #eee', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                                <span>Crime Type</span>
                                <span style={{ textAlign: 'right' }}>Probability</span>
                                <span style={{ textAlign: 'right' }}>Risk Level</span>
                            </div>
                            {allCrimes.map((item, idx) => (
                                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px', padding: '0.5rem 0', borderBottom: '1px solid #f8f9fa', alignItems: 'center' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        {getCrimeIcon(item.name)} {item.name}
                                    </span>
                                    <span style={{ textAlign: 'right', fontWeight: '600' }}>{(item.probability * 100).toFixed(2)}%</span>
                                    <span style={{ textAlign: 'right' }}>
                                        <span className={`badge`} style={{
                                            background: item.probability > 0.1 ? COLORS[3] :
                                                item.probability > 0.05 ? COLORS[4] :
                                                    '#2ecc71',
                                            fontSize: '0.75rem'
                                        }}>
                                            {item.probability > 0.1 ? 'High' : item.probability > 0.05 ? 'Med' : 'Low'}
                                        </span>
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="chart-split">
                            <div className="chart-wrapper">
                                <ResponsiveContainer width="100%" height={250}>
                                    <PieChart>
                                        <Pie
                                            data={chartData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={50}
                                            outerRadius={70}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value) => `${(value * 100).toFixed(1)}%`} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="legend-list">
                                {riskData.map((item, idx) => (
                                    <div key={idx} className="legend-item">
                                        <span
                                            className="dot"
                                            style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                                        ></span>
                                        <span className="icon-wrap">{getCrimeIcon(item.name)}</span>
                                        <span className="name">{item.name}</span>
                                        <span className="sc-val">{item.percentage}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Least Likely (Safety Fallback) - Only show if NOT in "Show All" mode to avoid duplication */}
                {!showAll && (
                    <div className="result-card full-width">
                        <div className="card-header">
                            <ShieldAlert size={20} />
                            <h3>Lower Risk Categories</h3>
                        </div>
                        <div className="tags-container">
                            {safeData.length > 0 ? safeData.map((item, idx) => (
                                <span key={idx} className="safety-tag">
                                    {getCrimeIcon(item.name)} {item.name} <small>({item.percentage}%)</small>
                                </span>
                            )) : <p className="text-muted">No low risk data available</p>}
                        </div>
                    </div>
                )}

            </div>
        </motion.div>
    );
};

export default ResultDisplay;
