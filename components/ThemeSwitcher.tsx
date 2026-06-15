"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export default function ThemeSwitcher() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      // Add a cool sound effect here if desired
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  const handlePull = async () => {
    // Animate the pull string going down and back up
    await controls.start({ y: 50, transition: { duration: 0.2 } });
    setIsDarkMode(!isDarkMode);
    await controls.start({ y: 0, transition: { type: "spring", stiffness: 300, damping: 10 } });
  };

  return (
    <div className="theme-switcher-container">
      <motion.div 
        className="pull-string-wrapper"
        animate={controls}
        initial={{ y: 0 }}
      >
        <div className="pull-string-cord"></div>
        <button className="pull-string-handle" onClick={handlePull} aria-label="Toggle Night Market Mode">
          <div className="lightbulb-icon">
             {isDarkMode ? "🌙" : "💡"}
          </div>
        </button>
      </motion.div>
      <div className={`theme-label ${isDarkMode ? 'visible' : ''}`}>
        Midnight Craving Mode
      </div>
    </div>
  );
}
