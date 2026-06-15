"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TABLES = [
  { id: 1, x: 15, y: 20, size: "small", seats: 2, label: "T1" },
  { id: 2, x: 45, y: 20, size: "small", seats: 2, label: "T2" },
  { id: 3, x: 25, y: 60, size: "large", seats: 4, label: "T3" },
  { id: 4, x: 75, y: 30, size: "medium", seats: 3, label: "T4" },
  { id: 5, x: 65, y: 70, size: "large", seats: 6, label: "Booth" },
];

export default function InteractiveReservation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [hoveredTable, setHoveredTable] = useState<number | null>(null);
  const [isBooked, setIsBooked] = useState(false);

  const handleDrag = (_: any, info: any) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const rectTop = rect.top + window.scrollY;
    const rectLeft = rect.left + window.scrollX;
    
    const dropX = ((info.point.x - rectLeft) / rect.width) * 100;
    const dropY = ((info.point.y - rectTop) / rect.height) * 100;

    let found = null;
    for (const table of TABLES) {
      const dist = Math.sqrt(Math.pow(dropX - table.x, 2) + Math.pow(dropY - table.y, 2));
      if (dist < 20) {
        found = table.id;
        break;
      }
    }
    setHoveredTable(found);
  };

  const handleDragEnd = (_: any, info: any) => {
    if (!containerRef.current) {
      setHoveredTable(null);
      return;
    }
    const rect = containerRef.current.getBoundingClientRect();
    const rectTop = rect.top + window.scrollY;
    const rectLeft = rect.left + window.scrollX;
    
    const dropX = ((info.point.x - rectLeft) / rect.width) * 100;
    const dropY = ((info.point.y - rectTop) / rect.height) * 100;

    let found = null;
    for (const table of TABLES) {
      const dist = Math.sqrt(Math.pow(dropX - table.x, 2) + Math.pow(dropY - table.y, 2));
      if (dist < 20) {
        found = table.id;
        break;
      }
    }
    
    if (found) {
      setSelectedTable(found);
      setIsBooked(false);
    }
    setHoveredTable(null);
  };

  const confirmBooking = () => {
    setIsBooked(true);
  };

  const resetSelection = () => {
    setSelectedTable(null);
    setIsBooked(false);
  };

  return (
    <section className="reservation-section" id="reservation">
      <div className="reservation-header">
        <h2 className="reservation-title">Claim Your Spot</h2>
        <p className="reservation-subtitle">Drag the sticker to a drawn table on the napkin to book it.</p>
      </div>

      <div className="sketch-container">
        {/* Hand-drawn Napkin Map */}
        <div className="sketch-map" ref={containerRef}>
          <div className="sketch-kitchen">
            <svg viewBox="0 0 100 100" className="wok-doodle" preserveAspectRatio="none">
              <path d="M 20 80 Q 50 100 80 80 L 90 40 L 10 40 Z" fill="none" stroke="#111" strokeWidth="4" />
              <path d="M 10 40 L 0 30" stroke="#111" strokeWidth="4" />
              <path d="M 40 40 Q 50 10 60 40" stroke="#f5a623" strokeWidth="4" fill="none" />
            </svg>
            <span>WOK STATION</span>
          </div>

          {TABLES.map((table) => {
            const isSelected = selectedTable === table.id;
            const isHovered = hoveredTable === table.id;
            
            return (
              <div
                key={table.id}
                className={`sketch-table ${table.size} ${isSelected ? 'selected' : ''} ${isHovered && !selectedTable ? 'glow' : ''}`}
                style={{ left: `${table.x}%`, top: `${table.y}%`, transform: `translate(-50%, -50%) rotate(${table.id % 2 === 0 ? 3 : -2}deg)` }}
              >
                {Array.from({ length: table.seats }).map((_, i) => (
                  <div key={i} className={`sketch-chair chair-${i + 1}`}></div>
                ))}
                
                <span className="sketch-table-label">{table.label}</span>
                
                {isSelected && (
                  <motion.div 
                    className="table-scribble-ping"
                    initial={{ scale: 0.8, opacity: 1 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <svg viewBox="0 0 100 100" fill="none" stroke="#D62B2B" strokeWidth="4">
                      <circle cx="50" cy="50" r="45" strokeDasharray="10 10" />
                    </svg>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Draggable Sticker */}
        <AnimatePresence>
          {!selectedTable && (
            <motion.div 
              className="sticker-drag-area"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <p className="drag-instructions">DRAG STICKER ↓</p>
              <motion.div
                drag
                dragSnapToOrigin
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                whileDrag={{ scale: 1.1, rotate: 15, cursor: "grabbing" }}
                className="sticker-draggable"
              >
                <div className="sticker-inner">
                  <span className="sticker-text">RESERVE</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Receipt UI Popup */}
        <AnimatePresence>
          {selectedTable && (
            <motion.div 
              className="receipt-popup"
              initial={{ y: 100, opacity: 0, rotateZ: 5 }}
              animate={{ y: 0, opacity: 1, rotateZ: -2 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <div className="receipt-jagged-top"></div>
              
              {!isBooked ? (
                <div className="receipt-content">
                  <div className="receipt-header">
                    <h3>DRAGON WOK</h3>
                    <p>ORDER #00{selectedTable} - DINE IN</p>
                    <div className="receipt-divider"></div>
                  </div>
                  
                  <div className="receipt-body">
                    <div className="receipt-field">
                      <label>GUEST NAME</label>
                      <input type="text" placeholder="Enter name..." className="receipt-input" />
                    </div>
                    
                    <div className="receipt-field">
                      <label>ARRIVAL TIME</label>
                      <div className="receipt-time-grid">
                        <button className="receipt-time-btn">19:00</button>
                        <button className="receipt-time-btn active">19:30</button>
                        <button className="receipt-time-btn">20:00</button>
                        <button className="receipt-time-btn">20:30</button>
                      </div>
                    </div>
                    
                    <div className="receipt-divider"></div>
                    
                    <button className="receipt-submit-btn" onClick={confirmBooking}>
                      CONFIRM TABLE
                    </button>
                    <button className="receipt-cancel-btn" onClick={resetSelection}>
                      CANCEL
                    </button>
                  </div>
                </div>
              ) : (
                <motion.div 
                  className="receipt-success"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  <div className="receipt-header">
                    <h3>DRAGON WOK</h3>
                    <div className="receipt-divider"></div>
                  </div>
                  <h2 className="success-title">CONFIRMED!</h2>
                  <p>Table {selectedTable} is locked in for you.</p>
                  
                  <div className="receipt-divider"></div>
                  <div className="receipt-barcode">
                    || ||| | ||| || || | |
                  </div>
                  
                  <button className="receipt-submit-btn" onClick={resetSelection}>
                    BOOK ANOTHER
                  </button>
                </motion.div>
              )}
              
              <div className="receipt-jagged-bottom"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
