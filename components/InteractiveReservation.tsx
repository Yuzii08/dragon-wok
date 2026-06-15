"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const TABLES = [
  { id: 1, x: 50, y: 50, size: "small", label: "Table 1 (2-seater)" },
  { id: 2, x: 200, y: 50, size: "small", label: "Table 2 (2-seater)" },
  { id: 3, x: 120, y: 150, size: "large", label: "Table 3 (4-seater)" },
  { id: 4, x: 50, y: 250, size: "medium", label: "Table 4 (3-seater)" },
  { id: 5, x: 200, y: 250, size: "large", label: "Table 5 (Booth)" },
];

export default function InteractiveReservation() {
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [isHoveringTable, setIsHoveringTable] = useState<number | null>(null);

  const handleDragEnd = (event: any, info: any) => {
    // Very simple hit detection based on fixed table positions
    // In a real app, use ref.getBoundingClientRect()
    const { x, y } = info.point;
    // Offset correction depending on layout could be needed, keeping it simple
    let found = null;
    for (const table of TABLES) {
      // Rough bounding box
      const tableCenter = { x: table.x + 40, y: table.y + 40 }; // Approximating canvas position
      const dist = Math.sqrt(Math.pow(x - tableCenter.x, 2) + Math.pow(y - tableCenter.y, 2));
      // Just simulate dropping on any table for demo if they drag it into the floorplan area
      found = table.id;
      break;
    }
    
    if (found) {
      setSelectedTable(found);
    }
  };

  return (
    <section className="reservation-section" id="reservation">
      <div className="reservation-header">
        <h2 className="reservation-title">Claim Your Spot</h2>
        <p className="reservation-subtitle">Drag the VIP pass to an empty table to reserve it.</p>
      </div>

      <div className="floorplan-container">
        {/* Floor Plan Background */}
        <div className="floorplan-map">
          {TABLES.map((table) => (
            <div
              key={table.id}
              className={`table-element ${table.size} ${selectedTable === table.id ? 'reserved' : ''}`}
              style={{ left: table.x, top: table.y }}
              onMouseEnter={() => setIsHoveringTable(table.id)}
              onMouseLeave={() => setIsHoveringTable(null)}
            >
              {table.label.split(' ')[0]}
              {selectedTable === table.id && (
                <motion.div 
                  className="table-reserved-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                >
                  ✓
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Draggable VIP Pass */}
        {!selectedTable && (
          <div className="vip-drag-area">
            <motion.div
              drag
              dragSnapToOrigin
              onDragEnd={handleDragEnd}
              whileDrag={{ scale: 1.2, rotate: 10, cursor: "grabbing" }}
              className="vip-pass-draggable"
            >
              <div className="vip-pass-inner">
                <span className="vip-icon">🎫</span>
                <span className="vip-text">VIP</span>
              </div>
            </motion.div>
            <p className="drag-instructions">Drag me!</p>
          </div>
        )}

        {/* Reservation Form Popup */}
        {selectedTable && (
          <motion.div 
            className="reservation-ticket"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <h3>Great choice! Table {selectedTable}</h3>
            <div className="ticket-form">
              <input type="text" placeholder="Your Name" className="ticket-input" />
              <input type="datetime-local" className="ticket-input" />
              <button className="ticket-submit" onClick={() => alert("Reservation Confirmed! Boom!")}>Confirm</button>
            </div>
            <button className="ticket-cancel" onClick={() => setSelectedTable(null)}>Choose another table</button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
