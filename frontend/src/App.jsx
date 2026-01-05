import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Analysis from './pages/Analysis';
import FAQ from './pages/FAQ';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analyze" element={<Analysis />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
