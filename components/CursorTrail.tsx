"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  rotation: number;
  color: string;
}

export default function CursorTrail() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lastMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId: number;
    let particleId = 0;

    const colors = ["#e74c3c", "#f1c40f", "#e67e22"]; // Chili and spark colors

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Create particles based on movement distance
      if (distance > 5) {
        for (let i = 0; i < Math.min(distance / 10, 5); i++) {
          particlesRef.current.push({
            id: particleId++,
            x: e.clientX + (Math.random() * 20 - 10),
            y: e.clientY + (Math.random() * 20 - 10),
            vx: (Math.random() - 0.5) * 4 + dx * 0.05,
            vy: Math.random() * -2 + dy * 0.05,
            life: 0,
            maxLife: 40 + Math.random() * 30,
            rotation: Math.random() * 360,
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }
        lastMousePos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((p) => p.life < p.maxLife);
      
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1; // gravity
        p.life++;
        p.rotation += p.vx * 2;

        const opacity = 1 - p.life / p.maxLife;
        
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = opacity;
        
        // Draw a small chili flake/spark shape
        ctx.beginPath();
        ctx.rect(-3, -3, 6, 6);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9998,
        }}
      />
      <motion.div
        className="custom-cursor"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9999,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: "rotate(-45deg)" }}>
          <path d="M2 22 L22 2" stroke="#f5a623" strokeWidth="3" strokeLinecap="round" />
          <path d="M6 22 L22 6" stroke="#f5a623" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </motion.div>
    </>
  );
}
