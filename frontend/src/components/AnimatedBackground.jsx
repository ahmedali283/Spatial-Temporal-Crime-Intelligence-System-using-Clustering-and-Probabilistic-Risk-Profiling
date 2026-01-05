import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const AnimatedBackground = () => {
    const location = useLocation();

    // Disable animation on Analysis page
    if (location.pathname === '/analyze') {
        return null;
    }

    // Floating shapes configuration
    const shapes = [
        { width: 400, height: 400, top: '-10%', left: '-10%', color: 'rgba(0, 180, 216, 0.15)', duration: 25 }, // Cyan
        { width: 500, height: 500, top: '40%', right: '-15%', color: 'rgba(0, 119, 182, 0.10)', duration: 30 }, // Blue
        { width: 300, height: 300, bottom: '-5%', left: '20%', color: 'rgba(144, 224, 239, 0.12)', duration: 20 }, // Light Blue
        { width: 200, height: 200, top: '20%', right: '30%', color: 'rgba(3, 4, 94, 0.05)', duration: 35 }, // Dark Navy
    ];

    return (
        <div className="animated-background">
            {shapes.map((shape, index) => (
                <motion.div
                    key={index}
                    style={{
                        position: 'absolute',
                        width: shape.width,
                        height: shape.height,
                        top: shape.top,
                        left: shape.left,
                        right: shape.right,
                        bottom: shape.bottom,
                        background: shape.color,
                        borderRadius: '50%',
                        filter: 'blur(60px)',
                        zIndex: 0,
                    }}
                    animate={{
                        x: [0, 50, -50, 0],
                        y: [0, -50, 50, 0],
                        scale: [1, 1.1, 0.9, 1],
                    }}
                    transition={{
                        duration: shape.duration,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                />
            ))}
            <div className="bg-overlay"></div>
        </div>
    );
};

export default AnimatedBackground;
