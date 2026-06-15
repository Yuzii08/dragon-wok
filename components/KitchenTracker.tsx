"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function KitchenTracker() {
  const [woks, setWoks] = useState(342);
  const [isHeating, setIsHeating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly increment every 3 to 8 seconds
      if (Math.random() > 0.4) {
        setIsHeating(true);
        setWoks(prev => prev + Math.floor(Math.random() * 3) + 1);
        setTimeout(() => setIsHeating(false), 500);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="kitchen-tracker"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, type: "spring" }}
    >
      <div className="tracker-inner">
        <span className={`tracker-fire ${isHeating ? 'heating' : ''}`}>🔥</span>
        <span className="tracker-text">Woks Tossed Today:</span>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={woks}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="tracker-number"
          >
            {woks}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
