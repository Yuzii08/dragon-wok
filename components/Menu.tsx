"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const MENU_CATEGORIES = [
  {
    cat: "Momos 🥟",
    doodle: `<svg viewBox="0 0 100 80" fill="none" stroke="#111" stroke-width="4"><path d="M 10 50 C 20 20, 80 20, 90 50 Z" /><path d="M 5 50 H 95" /><circle cx="35" cy="40" r="2" fill="#111"/><circle cx="65" cy="40" r="2" fill="#111"/></svg>`,
    items: [
      { name: "Steamed Veg Momos", desc: "Classic steamed dumplings, veggie filling, red chutney", price: "₹79" },
      { name: "Paneer Momos", desc: "Soft paneer and herb filling, steamed to perfection", price: "₹99" },
      { name: "Fried Momos", desc: "Crispy golden exterior with savory vegetable filling", price: "₹109" },
      { name: "Schezwan Momos", desc: "Tossed in fiery homemade schezwan sauce", price: "₹119" },
    ]
  },
  {
    cat: "Noodles 🍜",
    doodle: `<svg viewBox="0 0 120 120" fill="none" stroke="#111" stroke-width="4"><path d="M20 100 L95 15"/><path d="M35 105 L110 20"/><path d="M10 50 C 10 90, 110 90, 110 50 Z" /></svg>`,
    items: [
      { name: "Veg Hakka Noodles", desc: "Wok-tossed noodles with shredded cabbage, carrots, soy", price: "₹89" },
      { name: "Schezwan Noodles", desc: "Spicy noodles tossed in our signature schezwan paste", price: "₹99" },
      { name: "Chilli Garlic Noodles", desc: "Punchy garlic and red chilli oil stir-fried noodles", price: "₹99" },
      { name: "Egg Noodles", desc: "Hakka noodles wok-tossed with scrambled eggs", price: "₹109" },
    ]
  },
  {
    cat: "Fried Rice 🍚",
    doodle: `<svg viewBox="0 0 120 100" fill="none" stroke="#111" stroke-width="4"><path d="M 15 50 C 15 85, 105 85, 105 50 Z" /><path d="M 10 50 H 110" /><path d="M 40 40 Q 50 20, 60 40 Q 70 20, 80 40" /></svg>`,
    items: [
      { name: "Veg Fried Rice", desc: "Classic comfort wok-tossed rice with mixed vegetables", price: "₹79" },
      { name: "Egg Fried Rice", desc: "Rice stir-fried with eggs, soy sauce, spring onions", price: "₹99" },
      { name: "Schezwan Fried Rice", desc: "Spicy wok-tossed rice with vegetables and schezwan", price: "₹109" },
    ]
  },
  {
    cat: "Starters 🌶️",
    doodle: `<svg viewBox="0 0 100 100" fill="none" stroke="#111" stroke-width="4"><path d="M 50 10 Q 75 40, 50 90 Q 25 40, 50 10 Z" fill="#111" /></svg>`,
    items: [
      { name: "Spring Rolls", desc: "Crispy fried rolls stuffed with seasoned vegetables", price: "₹69" },
      { name: "Chilli Paneer", desc: "Paneer cubes tossed with bell peppers, spicy soy glaze", price: "₹129" },
      { name: "Veg Manchurian", desc: "Vegetable dumplings in tangy, dark soy and garlic gravy", price: "₹119" },
      { name: "Hot & Sour Soup", desc: "Thick, spicy and tangy soup with finely chopped veggies", price: "₹69" },
    ]
  },
  {
    cat: "Combos 🍱",
    doodle: `<svg viewBox="0 0 100 100" fill="none" stroke="#111" stroke-width="4"><rect x="15" y="15" width="70" height="70" rx="5" /><line x1="15" y1="50" x2="85" y2="50" /><line x1="50" y1="15" x2="50" y2="85" /></svg>`,
    items: [
      { name: "Student Combo", desc: "Noodles OR Rice + Manchurian + Soft Drink", price: "₹149" },
      { name: "Family Combo", desc: "2 Noodles + 1 Rice + Chilli Paneer + 4 Drinks", price: "₹299" },
      { name: "Party Pack", desc: "3 Noodles + 2 Rice + 2 Starters + 2 Momos + Cola", price: "₹499" },
    ]
  },
  {
    cat: "Drinks 🥤",
    doodle: `<svg viewBox="0 0 80 100" fill="none" stroke="#111" stroke-width="4"><path d="M 20 30 L 25 90 H 55 L 60 30 Z" /><path d="M 15 30 H 65" /><path d="M 40 30 L 48 5" /></svg>`,
    items: [
      { name: "Cold Coffee", desc: "Thick & creamy rich coffee served chilled", price: "₹49" },
      { name: "Mango Lassi", desc: "Traditional sweet yogurt blended with mango pulp", price: "₹49" },
      { name: "Soft Drinks", desc: "Coke, Sprite, Thums Up (300ml)", price: "₹35" },
      { name: "Nimbu Pani", desc: "Refreshing sweet and salty lemon water", price: "₹29" },
    ]
  }
];

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 840);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    // Check shop opening hours (11am - 10pm)
    const h = new Date().getHours();
    setIsOpen(h >= 11 && h < 22);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Slide desktop menu horizontally as page scrolls vertically
  // Decreased slightly to -75% to prevent overshooting on larger screens
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section className="menu-outer-section" id="menu">
      <div className="menu-header">
        <h2 className="menu-title">The Wok Menu</h2>
        <div className="menu-status" style={{ color: isOpen ? "#25D366" : "#D62B2B" }}>
          {isOpen ? "🔥 OPEN NOW (FAST DELIVERY) 🔥" : "💤 CLOSED NOW (OPENS 11 AM) 💤"}
        </div>
      </div>

      {isMobile ? (
        // Mobile Layout: Swipable horizontal cards or clean rows
        <div className="menu-mobile-container">
          {MENU_CATEGORIES.map((category, idx) => (
            <div key={idx} className="menu-card-mobile">
              <div className="menu-card-header">
                <h3>{category.cat}</h3>
                <div 
                  className="card-icon" 
                  dangerouslySetInnerHTML={{ __html: category.doodle }} 
                />
              </div>
              <div className="menu-card-items">
                {category.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="menu-item-row">
                    <div className="item-details">
                      <div className="item-name">{item.name}</div>
                      {item.desc && <div className="item-desc">{item.desc}</div>}
                    </div>
                    <div className="item-price">{item.price}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Desktop Layout: Sticky horizontal scroll panels (360vh scroll track)
        <div ref={targetRef} className="menu-scroll-track" style={{ height: "360vh" }}>
          <div className="menu-sticky-wrapper">
            <motion.div style={{ x }} className="menu-horizontal-slides">
              {MENU_CATEGORIES.map((category, idx) => (
                <div key={idx} className="menu-panel">
                  <div className="menu-panel-inner">
                    <div className="panel-bg-doodle" dangerouslySetInnerHTML={{ __html: category.doodle }} />
                    <h3 className="panel-category-title">{category.cat}</h3>
                    <div className="panel-items-grid">
                      {category.items.map((item, itemIdx) => (
                        <motion.div 
                          key={itemIdx} 
                          className="panel-item-card"
                          initial={{ opacity: 0, x: 100, scale: 0.8 }}
                          whileInView={{ opacity: 1, x: 0, scale: 1 }}
                          viewport={{ once: true, amount: 0.1 }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 200, 
                            damping: 15,
                            delay: itemIdx * 0.1 
                          }}
                        >
                          <div className="panel-item-header">
                            <span className="panel-item-name">{item.name}</span>
                            <span className="panel-item-price">{item.price}</span>
                          </div>
                          {item.desc && <p className="panel-item-desc">{item.desc}</p>}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      )}
    </section>
  );
}
