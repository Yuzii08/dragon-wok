"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide preloader after 2.8 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="preloader-container"
        >
          <div className="preloader-content">
            <motion.div 
              className="preloader-bowl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Slurping Noodle */}
                <motion.path
                  d="M100 100 C 80 50, 120 20, 100 -50"
                  stroke="#f5a623"
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ pathLength: 1, pathOffset: 0 }}
                  animate={{ pathLength: 0.2, pathOffset: 1 }}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                />
                
                {/* Bowl */}
                <path d="M20 70 C 20 130, 180 130, 180 70 Z" fill="#111" />
                <path d="M10 70 H 190" stroke="#111" strokeWidth="8" strokeLinecap="round" />
                
                {/* Chopsticks */}
                <path d="M40 90 L 160 10" stroke="#f5a623" strokeWidth="6" strokeLinecap="round" />
                <path d="M50 100 L 170 20" stroke="#f5a623" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </motion.div>
            <motion.h1 
              className="preloader-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              GETTING READY...
            </motion.h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
