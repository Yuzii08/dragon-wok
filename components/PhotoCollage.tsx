"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

const POLAROIDS = [
  { 
    id: 1, 
    src: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600", 
    caption: "Steamed Momos 🥟", 
    defaultX: "8%", 
    defaultY: "10%", 
    rotate: -6 
  },
  { 
    id: 2, 
    src: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600", 
    caption: "Hakka Noodles 🍜", 
    defaultX: "52%", 
    defaultY: "6%", 
    rotate: 4 
  },
  { 
    id: 3, 
    src: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600", 
    caption: "Wok Fried Rice 🍚", 
    defaultX: "28%", 
    defaultY: "32%", 
    rotate: -3 
  },
  { 
    id: 4, 
    src: "https://images.unsplash.com/photo-1615361200141-f45040f367be?w=600", 
    caption: "Chilli Paneer 🌶️", 
    defaultX: "72%", 
    defaultY: "25%", 
    rotate: 8 
  },
  { 
    id: 5, 
    src: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600", 
    caption: "Veg Manchurian 🧄", 
    defaultX: "10%", 
    defaultY: "50%", 
    rotate: -5 
  },
  { 
    id: 6, 
    src: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600", 
    caption: "Spicy Schezwan 🔥", 
    defaultX: "50%", 
    defaultY: "55%", 
    rotate: 2 
  },
];

const TABLE_DOODLES = [
  { 
    cls: "td1", 
    x: "20%", 
    y: "25%", 
    svg: `<svg viewBox="0 0 100 80" fill="none" stroke="#e67e22" stroke-width="3" stroke-linecap="round"><path d="M10 40 Q25 10, 50 40 T90 40" /><path d="M30 35 Q40 50, 50 35 Q60 50, 70 35" /><path d="M40 25 V45 M60 25 V45" /></svg>`,
    label: "Hidden Noodle! 🍜"
  },
  { 
    cls: "td2", 
    x: "65%", 
    y: "15%", 
    svg: `<svg viewBox="0 0 80 80" fill="none" stroke="#27ae60" stroke-width="3" stroke-linecap="round"><circle cx="40" cy="40" r="30"/><circle cx="28" cy="32" r="3" fill="#27ae60"/><circle cx="52" cy="32" r="3" fill="#27ae60"/><path d="M 25 50 Q 40 65, 55 50" /></svg>`,
    label: "Happy Chef! 😊"
  },
  { 
    cls: "td3", 
    x: "40%", 
    y: "65%", 
    svg: `<svg viewBox="0 0 80 80" fill="none" stroke="#d35400" stroke-width="3" stroke-linecap="round"><polygon points="40,5 50,30 75,35 55,55 60,80 40,65 20,80 25,55 5,35 30,30" /></svg>`,
    label: "Spicy Star! ⭐"
  }
];

export default function PhotoCollage() {
  const tableRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [zIndices, setZIndices] = useState<{ [key: number]: number }>({
    1: 10, 2: 10, 3: 10, 4: 10, 5: 10, 6: 10
  });

  const handleDragStart = (id: number) => {
    setActiveId(id);
    setZIndices((prev) => {
      // Find maximum current z-index and increment it by 1
      const maxZ = Math.max(...Object.values(prev));
      return {
        ...prev,
        [id]: maxZ + 1
      };
    });
  };

  return (
    <section className="collage-outer" id="snapshots">
      <h2 className="collage-title">Food Snapshots</h2>
      <p className="collage-subtitle">
        Toss the polaroids around to reveal hidden doodles on the chef's table!
      </p>
      
      <div className="polaroid-table" ref={tableRef}>
        {/* Underlay Doodles */}
        {TABLE_DOODLES.map((d, idx) => (
          <div 
            key={idx} 
            className={`table-underlay-doodle ${d.cls}`}
            style={{ left: d.x, top: d.y }}
          >
            <div className="table-doodle-svg" dangerouslySetInnerHTML={{ __html: d.svg }} />
            <span className="table-doodle-label">{d.label}</span>
          </div>
        ))}

        {/* Polaroid Cards */}
        {POLAROIDS.map((p) => {
          const zIndex = zIndices[p.id];
          const isCurrentActive = activeId === p.id;

          return (
            <motion.div
              key={p.id}
              className="polaroid-card"
              drag
              dragConstraints={tableRef}
              dragElastic={0.05}
              onDragStart={() => handleDragStart(p.id)}
              onDragEnd={() => setActiveId(null)}
              initial={{ 
                opacity: 0, 
                scale: 0.1,
                left: "40%",
                top: "40%",
                rotate: (p.id % 2 === 0 ? 180 : -180) * (p.id * 0.5)
              }}
              whileInView={{ 
                opacity: 1, 
                scale: isCurrentActive ? 1.06 : 1,
                left: p.defaultX,
                top: p.defaultY,
                rotate: isCurrentActive ? 0 : p.rotate,
                zIndex
              }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ scale: isCurrentActive ? 1.06 : 1.03 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              style={{
                position: "absolute",
                cursor: "grab",
                touchAction: "none"
              }}
            >
              <div className="polaroid-img-wrapper">
                <img src={p.src} alt={p.caption} draggable="false" />
              </div>
              <div className="polaroid-caption">{p.caption}</div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
