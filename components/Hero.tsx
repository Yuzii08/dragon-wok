"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

const DOODLES = [
  // 1. Chinese Knot (Top Left)
  { cls: "d1", svg: `<svg viewBox="0 0 100 100" fill="none" stroke="#111" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 25 H30 V5 H45 V25 H70 V45 H45 V70 H30 V45 H5 Z"/><path d="M30 70 V90 H50"/><path d="M70 25 H90 V45"/></svg>` },
  
  // 2. Chopsticks (Left) - Thick, filled tips
  { cls: "d2", svg: `<svg viewBox="0 0 120 120" fill="none" stroke="#111" stroke-width="6" stroke-linecap="round"><path d="M20 100 L95 15"/><path d="M35 105 L110 20"/><path d="M18 90 L26 102" stroke-width="12"/><path d="M33 95 L41 107" stroke-width="12"/></svg>` },
  
  // 3. Mouth with Teeth (Top Center)
  { cls: "d3", svg: `<svg viewBox="0 0 100 80" fill="none" stroke="#111" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 40 C 30 10, 70 10, 95 40 C 70 70, 30 70, 5 40 Z"/><path d="M15 40 C 35 60, 65 60, 85 40"/><path d="M25 25 L30 45"/><path d="M45 20 L45 48"/><path d="M65 20 L60 48"/><path d="M80 28 L75 42"/></svg>` },
  
  // 4. Two Eyes with Lightning Bolts (Center Top)
  { cls: "d4", svg: `<svg viewBox="0 0 120 120" fill="none" stroke="#111" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="30" cy="30" rx="15" ry="10" stroke-width="5"/><circle cx="30" cy="30" r="5" fill="#111"/><ellipse cx="80" cy="30" rx="15" ry="10" stroke-width="5"/><circle cx="80" cy="30" r="5" fill="#111"/><path d="M25 15 L20 5 M30 13 L30 3 M35 15 L40 5 M75 15 L70 5 M80 13 L80 3 M85 15 L90 5"/><path d="M30 40 L10 70 H30 L15 100 L50 60 H30 Z" stroke-width="5" fill="#111"/><path d="M80 40 L60 70 H80 L65 100 L100 60 H80 Z" stroke-width="5" fill="#111"/></svg>` },
  
  // 5. Solid Black Leaf (Top Right)
  { cls: "d5", svg: `<svg viewBox="0 0 130 110" fill="#111" stroke="#111" stroke-width="4" stroke-linecap="round"><path d="M100 100 C 120 60, 100 10, 50 10 C 20 10, 5 40, 10 70 C 15 100, 60 110, 100 100 Z"/><path d="M100 100 C 60 80, 40 50, 30 15" stroke="#F9F8F4" stroke-width="4"/><path d="M50 65 L40 45" stroke="#F9F8F4" stroke-width="3"/><path d="M70 75 L55 50" stroke="#F9F8F4" stroke-width="3"/></svg>` },
  
  // 6. Knife (Right Edge)
  { cls: "d6", svg: `<svg viewBox="0 0 100 150" fill="none" stroke="#111" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M80 20 L20 100 C 10 110, 20 130, 40 130 C 60 130, 90 90, 95 60 Z"/><path d="M95 60 L80 20" stroke-width="8"/><circle cx="85" cy="40" r="3" fill="#111"/></svg>` },
  
  // 7. Hand-drawn Star 1
  { cls: "d7", svg: `<svg viewBox="0 0 80 80" fill="none" stroke="#111" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"><polygon points="40,5 50,30 75,35 55,55 60,80 40,65 20,80 25,55 5,35 30,30" /></svg>` },
  
  // 8. Hand-drawn Star 2
  { cls: "d8", svg: `<svg viewBox="0 0 80 80" fill="none" stroke="#111" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><polygon points="40,10 48,32 70,35 52,50 58,72 40,60 22,72 28,50 10,35 32,32" /></svg>` },
  
  // 9. Garlic Bulb (Bottom Right)
  { cls: "d9", svg: `<svg viewBox="0 0 100 100" fill="none" stroke="#111" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M50 10 C 60 40, 90 50, 85 80 C 80 100, 20 100, 15 80 C 10 50, 40 40, 50 10 Z"/><path d="M50 10 C 40 40, 40 70, 50 95"/><path d="M50 10 C 60 40, 65 70, 50 95"/><path d="M25 60 C 35 75, 40 85, 40 95"/><path d="M75 60 C 65 75, 60 85, 60 95"/></svg>` },
  
  // 10. Noodle Bowl (Bottom Center)
  { cls: "d10", svg: `<svg viewBox="0 0 130 100" fill="none" stroke="#111" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"><path d="M10 50 C 10 90, 120 90, 120 50 Z"/><path d="M5 50 H125"/><path d="M80 50 L120 10" stroke-width="7"/><path d="M95 50 L130 20" stroke-width="7"/><path d="M30 50 C 25 30, 45 20, 50 50"/><path d="M50 50 C 45 25, 75 15, 80 50"/><path d="M65 50 C 60 35, 85 25, 90 50"/></svg>` },
  
  // 11. Takeout Box (Bottom Right edge)
  { cls: "d11", svg: `<svg viewBox="0 0 110 120" fill="none" stroke="#111" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 40 L10 110 H100 L90 40 Z"/><path d="M15 40 L35 20 H75 L95 40"/><path d="M20 30 L90 30" stroke-width="3"/><path d="M40 40 V10 C 55 0, 70 10, 70 40"/><path d="M30 70 H80" stroke-width="4"/><path d="M35 85 H75" stroke-width="4"/></svg>` },
  
  // 12. Smiley Face (Bottom Left)
  { cls: "d12", svg: `<svg viewBox="0 0 70 70" fill="none" stroke="#111" stroke-width="5" stroke-linecap="round"><circle cx="35" cy="35" r="30"/><path d="M25 25 V35"/><path d="M45 25 V35"/><path d="M22 45 C 30 55, 40 55, 48 45"/></svg>` },
];

interface ParallaxDoodleProps {
  cls: string;
  svg: string;
  constraintsRef: React.RefObject<HTMLDivElement | null>;
}

function ParallaxDoodle({ cls, svg, constraintsRef }: ParallaxDoodleProps) {
  return (
    <motion.div
      className={`doodle ${cls} draggable-doodle`}
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.4}
      dragTransition={{ bounceStiffness: 400, bounceDamping: 18 }}
      whileDrag={{ scale: 1.15, zIndex: 10, rotate: [0, -5, 5, 0] }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: Math.random() * 0.5, ease: "easeOut" }}
      dangerouslySetInnerHTML={{ __html: svg }}
      style={{ cursor: "grab" }}
    />
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="hero" id="top" ref={containerRef}>
      {DOODLES.map((d, i) => (
        <ParallaxDoodle key={i} cls={d.cls} svg={d.svg} constraintsRef={containerRef} />
      ))}

      <motion.h1
        className="hero-tagline"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
      >
        Kind of Chinese<br />Also Fast Food
      </motion.h1>

      <motion.p
        className="hero-address"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
      >
        Shop 12, Main Market, [City Name] - 000000
      </motion.p>
    </section>
  );
}
