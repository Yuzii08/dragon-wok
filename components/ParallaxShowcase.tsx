"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function ParallaxShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.8]);

  // Labels parallax
  const label1Y = useTransform(scrollYProgress, [0, 1], ["50%", "-50%"]);
  const label2Y = useTransform(scrollYProgress, [0, 1], ["-30%", "60%"]);

  return (
    <section className="parallax-showcase" ref={containerRef}>
      <div className="showcase-content">
        <h2 className="showcase-title">THE DRAGON'S SIGNATURE</h2>
        
        <div className="showcase-3d-container" style={{ perspective: "1000px" }}>
          <motion.div 
            className="showcase-image-wrapper"
            style={{ rotateX, rotateY, y, scale }}
          >
            <Image 
              src="/signature_noodles.png" 
              alt="Signature Spicy Noodles" 
              width={600} 
              height={600} 
              className="showcase-image"
            />
            
            <motion.div className="showcase-label label-1" style={{ y: label1Y }}>
              <span className="label-dot"></span>
              <span className="label-text">Hand-pulled daily</span>
            </motion.div>
            
            <motion.div className="showcase-label label-2" style={{ y: label2Y }}>
              <span className="label-dot"></span>
              <span className="label-text">Fiery house spice blend</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
