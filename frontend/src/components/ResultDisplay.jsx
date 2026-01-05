import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import {
    AlertTriangle, TrendingUp, MapPin, CheckCircle, ShieldAlert,
    Skull, DollarSign, Package, Users, Activity, HelpCircle
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
    if (!data) return null;

    // Use parsed data from backend if available
    const riskData = data.top_5_parsed || [];
    const safeData = data.bottom_5_parsed || [];

    const chartData = riskData.map((item) => ({
        name: item.name,
        value: item.probability
    }));

    let verdict = { text: "Moderate Risk", color: "#f0ad4e", icon: <CheckCircle /> };

    if (data.crime_trend_slope_per_month > 0.5) {
        verdict = { text: "High Risk - Trend Increasing", color: "#d9534f", icon: <TrendingUp /> };
    } else if (data.crime_trend_slope_per_month < -0.5) {
        verdict = { text: "Improving - Trend Decreasing", color: "#2ecc40", icon: <CheckCircle /> };
    } else {
        verdict = { text: "Stable / Low Variance", color: "#5cb85c", icon: <CheckCircle /> };
    }

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

                {/* Crime Distribution Chart */}
                <div className="result-card full-width">
                    <div className="card-header">
                        <AlertTriangle size={20} />
                        <h3>Top Risk Contributors</h3>
                    </div>
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
                </div>

                {/* Least Likely (Safety Fallback) */}
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

            </div>
        </motion.div>
    );
};

export default ResultDisplay;
