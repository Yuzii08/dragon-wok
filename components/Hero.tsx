"use client";

import { motion, useMotionValue, useSpring, useTransform, Variants } from "framer-motion";
import { useEffect, useRef } from "react";

const DOODLES = [
  { cls: "d1", svg: `<svg viewBox="0 0 100 100" fill="none" stroke="#111" stroke-width="3"><path d="M 10 50 Q 25 10, 50 50 T 90 50" /><circle cx="50" cy="50" r="5" fill="#f5a623"/></svg>` },
  { cls: "d2", svg: `<svg viewBox="0 0 100 100" fill="none" stroke="#f5a623" stroke-width="4"><rect x="20" y="20" width="60" height="60" rx="10" transform="rotate(15 50 50)"/><line x1="30" y1="30" x2="70" y2="70" /><line x1="70" y1="30" x2="30" y2="70" /></svg>` },
  { cls: "d3", svg: `<svg viewBox="0 0 100 100" fill="none" stroke="#111" stroke-width="3"><circle cx="50" cy="50" r="40" stroke-dasharray="10 10"/><path d="M 50 20 L 50 80 M 20 50 L 80 50" /></svg>` },
  { cls: "d4", svg: `<svg viewBox="0 0 100 100" fill="none" stroke="#111" stroke-width="4"><path d="M 20 80 C 20 20, 80 20, 80 80" /><line x1="30" y1="80" x2="30" y2="60"/><line x1="50" y1="80" x2="50" y2="40"/><line x1="70" y1="80" x2="70" y2="60"/></svg>` },
  { cls: "d5", svg: `<svg viewBox="0 0 100 100" fill="none" stroke="#f5a623" stroke-width="3"><path d="M 10 90 L 50 10 L 90 90 Z" stroke-linejoin="round"/><circle cx="50" cy="60" r="10" fill="#111"/></svg>` },
  { cls: "d6", svg: `<svg viewBox="0 0 100 100" fill="none" stroke="#111" stroke-width="4"><path d="M 10 30 Q 50 80, 90 30" /><path d="M 30 10 Q 50 60, 70 10" /></svg>` },
  { cls: "d7", svg: `<svg viewBox="0 0 100 100" fill="none" stroke="#111" stroke-width="3"><rect x="10" y="40" width="80" height="20" rx="10"/><rect x="40" y="10" width="20" height="80" rx="10"/></svg>` },
  { cls: "d8", svg: `<svg viewBox="0 0 100 100" fill="none" stroke="#f5a623" stroke-width="4"><path d="M 20 50 Q 50 20, 80 50 T 20 50" fill="none"/></svg>` },
  { cls: "d9", svg: `<svg viewBox="0 0 100 100" fill="none" stroke="#111" stroke-width="3"><circle cx="50" cy="50" r="30"/><circle cx="50" cy="50" r="15" fill="#111"/></svg>` },
  { cls: "d10", svg: `<svg viewBox="0 0 100 100" fill="none" stroke="#111" stroke-width="4"><path d="M 10 10 L 90 90 M 10 90 L 90 10" /></svg>` },
  { cls: "d11", svg: `<svg viewBox="0 0 100 100" fill="none" stroke="#f5a623" stroke-width="3"><path d="M 20 20 C 50 0, 50 100, 80 80" /></svg>` },
  { cls: "d12", svg: `<svg viewBox="0 0 100 100" fill="none" stroke="#111" stroke-width="4"><polygon points="50,10 90,90 10,90" stroke-linejoin="round"/><circle cx="50" cy="65" r="5" fill="#111"/></svg>` },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Add spring physics to make the movement incredibly smooth and premium
  const smoothX = useSpring(mouseX, { stiffness: 75, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 75, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to center of screen, normalized between -1 and 1
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Tagline animation variants
  const taglineText = "The Art of Chinese Cuisine, Perfected";
  const words = taglineText.split(" ");
  
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 50, rotateZ: -10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateZ: 0, 
      transition: { 
        type: "spring", 
        damping: 12, 
        stiffness: 100 
      } 
    }
  };

  return (
    <section className="hero" id="top" ref={containerRef}>
      {/* Background doodles with parallax effect */}
      {DOODLES.map((d, i) => {
        // Give each doodle a different multiplier so they move at different speeds (depth effect)
        const depth = (i % 4) + 1; 
        const translateX = useTransform(smoothX, [-1, 1], [-20 * depth, 20 * depth]);
        const translateY = useTransform(smoothY, [-1, 1], [-20 * depth, 20 * depth]);

        return (
          <motion.div 
            key={i} 
            className={`doodle ${d.cls}`}
            style={{ x: translateX, y: translateY }}
          >
            <div dangerouslySetInnerHTML={{ __html: d.svg }} />
          </motion.div>
        );
      })}

      <motion.h1
        className="hero-tagline"
        style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {words.map((word, idx) => (
          <motion.span 
            key={idx} 
            variants={wordVariants}
            style={{ display: "inline-block", marginRight: "10px" }}
          >
            {word}
          </motion.span>
        ))}
        <br />
        <motion.span 
          style={{ fontSize: '0.6em', opacity: 0.9, display: "inline-block", marginTop: "20px" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
        >
          Indulge in the Extraordinary.
        </motion.span>
      </motion.h1>

      <motion.p
        className="hero-address"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        7th Street, Downtown — (Opens 11:00 AM)
      </motion.p>
    </section>
  );
}
