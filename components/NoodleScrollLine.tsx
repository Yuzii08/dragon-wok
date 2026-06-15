"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function NoodleScrollLine() {
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="noodle-scroll-container">
      {/* Noodle Bowl at top */}
      <div className="noodle-bowl-top">
        <svg viewBox="0 0 100 80" fill="none" stroke="#111" strokeWidth="4">
          <path d="M 10 30 C 10 70, 90 70, 90 30 Z" />
          <path d="M 5 30 L 95 30" />
          <path d="M 30 30 Q 30 15, 35 15" />
          <path d="M 50 30 Q 45 10, 52 10" />
          <path d="M 70 30 Q 65 15, 68 15" />
        </svg>
      </div>

      {/* Growing Noodle Path */}
      <svg className="noodle-svg" viewBox="0 0 100 1000" preserveAspectRatio="none" fill="none" stroke="#111" strokeWidth="4" strokeLinecap="round">
        <motion.path
          d="M 50 0 
             C 70 80, 30 160, 50 240 
             C 70 320, 35 400, 50 480 
             S 75 560, 50 640 
             C 25 720, 65 800, 50 880
             Q 20 940, 50 1000"
          style={{ pathLength }}
          strokeDasharray="0 1"
        />
        {/* Shadow noodle for hand-drawn chalky texture look */}
        <motion.path
          d="M 50 0 
             C 70 80, 30 160, 50 240 
             C 70 320, 35 400, 50 480 
             S 75 560, 50 640 
             C 25 720, 65 800, 50 880
             Q 20 940, 50 1000"
          style={{ pathLength }}
          stroke="#f5a623"
          strokeWidth="2"
          strokeDasharray="0 1"
          dx="2"
          dy="1"
          opacity="0.6"
        />
      </svg>

      {/* Floating Chopsticks at bottom */}
      <div className="noodle-chopsticks-bottom">
        <svg viewBox="0 0 100 100" fill="none" stroke="#111" strokeWidth="4">
          <path d="M 20 80 L 80 20" />
          <path d="M 30 90 L 90 30" />
          <circle cx="20" cy="80" r="3" fill="#111" />
          <circle cx="30" cy="90" r="3" fill="#111" />
        </svg>
      </div>
    </div>
  );
}
