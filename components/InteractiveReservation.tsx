"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TABLES = [
  { id: 1, x: 10, y: 15, size: "small", seats: 2, label: "T1" },
  { id: 2, x: 40, y: 15, size: "small", seats: 2, label: "T2" },
  { id: 3, x: 20, y: 45, size: "large", seats: 4, label: "T3" },
  { id: 4, x: 70, y: 25, size: "medium", seats: 3, label: "T4" },
  { id: 5, x: 60, y: 65, size: "large", seats: 6, label: "Booth" },
];

export default function InteractiveReservation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [hoveredTable, setHoveredTable] = useState<number | null>(null);
  const [isBooked, setIsBooked] = useState(false);

  const handleDragEnd = (event: any, info: any) => {
    // Simple proportional hit detection (percentage based on container size to be responsive)
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const dropX = ((info.point.x - rect.left) / rect.width) * 100;
    const dropY = ((info.point.y - rect.top) / rect.height) * 100;

    let found = null;
    for (const table of TABLES) {
      // Very forgiving hitbox (radius of ~15% of the container)
      const dist = Math.sqrt(Math.pow(dropX - (table.x + 8), 2) + Math.pow(dropY - (table.y + 8), 2));
      if (dist < 15) {
        found = table.id;
        break;
      }
    }
    
    if (found) {
      setSelectedTable(found);
      setIsBooked(false);
    }
  };

  const confirmBooking = () => {
    setIsBooked(true);
    // You could trigger a confetti effect or API call here
  };

  const resetSelection = () => {
    setSelectedTable(null);
    setIsBooked(false);
  };

  return (
    <section className="reservation-section" id="reservation">
      <div className="reservation-header">
        <h2 className="reservation-title">Claim Your Spot</h2>
        <p className="reservation-subtitle">Drag the VIP pass to an empty table on the blueprint.</p>
      </div>

      <div className="blueprint-container" ref={containerRef}>
        {/* Floor Plan Blueprint Layout */}
        <div className="blueprint-floor">
          <div className="blueprint-grid"></div>
          
          {/* Kitchen / Bar Area */}
          <div className="blueprint-kitchen">
            <span>OPEN KITCHEN / WOK STATION</span>
          </div>

          {TABLES.map((table) => {
            const isSelected = selectedTable === table.id;
            const isHovered = hoveredTable === table.id;
            
            return (
              <div
                key={table.id}
                className={`blueprint-table ${table.size} ${isSelected ? 'selected' : ''} ${isHovered && !selectedTable ? 'glow' : ''}`}
                style={{ left: `${table.x}%`, top: `${table.y}%` }}
              >
                {/* Draw little chairs around the table */}
                {Array.from({ length: table.seats }).map((_, i) => (
                  <div key={i} className={`blueprint-chair chair-${i + 1}`}></div>
                ))}
                
                <span className="blueprint-table-label">{table.label}</span>
                
                {isSelected && (
                  <motion.div 
                    className="table-reserved-ping"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Draggable VIP Pass */}
        <AnimatePresence>
          {!selectedTable && (
            <motion.div 
              className="vip-drag-area"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <p className="drag-instructions">DRAG PASS TO TABLE ↓</p>
              <motion.div
                drag
                dragSnapToOrigin
                onDrag={(_, info) => {
                  // Optional: Highlight table if hovering over it
                  if (!containerRef.current) return;
                  const rect = containerRef.current.getBoundingClientRect();
                  const dropX = ((info.point.x - rect.left) / rect.width) * 100;
                  const dropY = ((info.point.y - rect.top) / rect.height) * 100;
                  
                  let found = null;
                  for (const table of TABLES) {
                    const dist = Math.sqrt(Math.pow(dropX - (table.x + 8), 2) + Math.pow(dropY - (table.y + 8), 2));
                    if (dist < 15) { found = table.id; break; }
                  }
                  setHoveredTable(found);
                }}
                onDragEnd={(e, info) => {
                  setHoveredTable(null);
                  handleDragEnd(e, info);
                }}
                whileDrag={{ scale: 1.1, rotate: 5, cursor: "grabbing" }}
                className="vip-pass-draggable"
              >
                <div className="vip-pass-hologram"></div>
                <div className="vip-pass-inner">
                  <span className="vip-icon">🎫</span>
                  <span className="vip-text">VIP ACCESS</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Premium Booking Ticket Popup */}
        <AnimatePresence>
          {selectedTable && (
            <motion.div 
              className="premium-ticket-popup"
              initial={{ y: 100, opacity: 0, rotateX: 45 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <div className="ticket-cutout-top"></div>
              
              {!isBooked ? (
                <>
                  <div className="ticket-header">
                    <h3>Table {selectedTable} Selected</h3>
                    <p>Complete your reservation</p>
                  </div>
                  
                  <div className="ticket-body">
                    <div className="ticket-field">
                      <label>Guest Name</label>
                      <input type="text" placeholder="Enter name" className="premium-input" />
                    </div>
                    
                    <div className="ticket-field">
                      <label>Time</label>
                      <div className="time-grid">
                        <button className="time-btn">19:00</button>
                        <button className="time-btn active">19:30</button>
                        <button className="time-btn">20:00</button>
                        <button className="time-btn">20:30</button>
                      </div>
                    </div>
                    
                    <button className="premium-submit-btn" onClick={confirmBooking}>
                      CONFIRM BOOKING
                    </button>
                    <button className="premium-cancel-btn" onClick={resetSelection}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <motion.div 
                  className="ticket-success"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  <div className="success-stamp">APPROVED</div>
                  <h3>See you soon!</h3>
                  <p>Your table is locked in.</p>
                  <button className="premium-submit-btn outline" onClick={resetSelection}>
                    Book Another
                  </button>
                </motion.div>
              )}
              
              <div className="ticket-barcode"></div>
              <div className="ticket-cutout-bottom"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
