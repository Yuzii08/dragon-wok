"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [revealCode, setRevealCode] = useState(false);

  const cardWidth = 320;
  const cardHeight = 180;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // High DPI canvas support
    canvas.width = cardWidth;
    canvas.height = cardHeight;

    // Fill with charcoal color texture
    ctx.fillStyle = "#222222";
    ctx.fillRect(0, 0, cardWidth, cardHeight);

    // Add some random hand-drawn chalk lines for texture
    ctx.strokeStyle = "#444444";
    ctx.lineWidth = 2;
    for (let i = 0; i < 15; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * cardWidth, Math.random() * cardHeight);
      ctx.lineTo(Math.random() * cardWidth, Math.random() * cardHeight);
      ctx.stroke();
    }

    // Write Scratch Instruction Text
    ctx.fillStyle = "#F9F8F4";
    ctx.font = "italic bold 18px 'Courier Prime', monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("SCRATCH ME WITH CURSOR", cardWidth / 2, cardHeight / 2 - 10);
    ctx.font = "13px 'Courier Prime', monospace";
    ctx.fillStyle = "#f5a623";
    ctx.fillText("⚡ REVEAL STUDENT COUPON ⚡", cardWidth / 2, cardHeight / 2 + 15);
  }, []);

  const getCoordinates = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    // Support touch and mouse events
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const draw = (e: any) => {
    if (!isDrawing || isScratched) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCoordinates(e);

    // Erase overlay
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    // Check progress
    checkScratchProgress(ctx);
  };

  const checkScratchProgress = (ctx: CanvasRenderingContext2D) => {
    // Read canvas alpha buffer every 6 frames to save CPU cycles
    const imgData = ctx.getImageData(0, 0, cardWidth, cardHeight);
    const data = imgData.data;
    let transparentPixels = 0;
    
    // Step by 16 to sample efficiently
    for (let i = 3; i < data.length; i += 16) {
      if (data[i] === 0) transparentPixels++;
    }

    const totalSamples = data.length / 16;
    const percentage = transparentPixels / totalSamples;

    if (percentage > 0.45) {
      setIsScratched(true);
      setTimeout(() => {
        setRevealCode(true);
      }, 400);
    }
  };

  return (
    <section className="scratch-section" id="scratch-deal">
      <h2 className="scratch-title">Student Discount Zone</h2>
      <p className="scratch-subtitle">
        Are you a student? Scratch the card to unlock a special 15% discount code!
      </p>

      <div className="scratch-card-container" ref={containerRef}>
        {/* Background Reveal Content */}
        <div className="scratch-card-bg">
          <div className="coupon-glow-border" />
          <div className="coupon-contents">
            <span className="coupon-tag">🎉 CONGRATS! 🎉</span>
            <h4 className="coupon-offer">15% STUDENT DISCOUNT</h4>
            <div className="coupon-code-wrapper">
              <span className="coupon-code">DRAGON15</span>
              <button 
                className="copy-btn"
                onClick={() => {
                  navigator.clipboard.writeText("DRAGON15");
                  alert("Coupon code copied to clipboard!");
                }}
              >
                📋 Copy
              </button>
            </div>
            <p className="coupon-terms">valid on orders above ₹149 on WhatsApp</p>
          </div>
        </div>

        {/* Scratch Canvas Overlay */}
        <AnimatePresence>
          {!revealCode && (
            <motion.canvas
              ref={canvasRef}
              className="scratch-canvas"
              onMouseDown={() => setIsDrawing(true)}
              onMouseEnter={() => setIsDrawing(false)}
              onMouseUp={() => setIsDrawing(false)}
              onMouseMove={draw}
              onTouchStart={() => setIsDrawing(true)}
              onTouchEnd={() => setIsDrawing(false)}
              onTouchMove={draw}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              style={{
                touchAction: "none"
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
