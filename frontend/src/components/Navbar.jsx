import React from 'react';
import { NavLink } from 'react-router-dom';
import { Shield, HelpCircle, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <NavLink to="/" className="nav-logo">
                    <Shield size={28} />
                    <span>CrimeIntel</span>
                </NavLink>

                <div className="nav-links">
                    <NavLink to="/analyze" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                        <BarChart2 size={18} /> Analysis
                    </NavLink>
                    <NavLink to="/faq" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                        <HelpCircle size={18} /> FAQ
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
