"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const INGREDIENTS = [
  { id: "noodles", name: "Noodles 🍜", type: "base" },
  { id: "rice", name: "Fried Rice 🍚", type: "base" },
  { id: "paneer", name: "Soft Paneer 🧀", type: "protein" },
  { id: "egg", name: "Scrambled Egg 🍳", type: "protein" },
  { id: "veggies", name: "Crispy Veggies 🥦", type: "topping" },
  { id: "schezwan", name: "Schezwan Sauce 🌶️", type: "sauce" },
  { id: "garlic", name: "Chilli Garlic Oil 🧄", type: "sauce" },
  { id: "springonions", name: "Spring Onions 🌱", type: "topping" }
];

interface Popup {
  id: number;
  text: string;
  x: number;
  y: number;
}

export default function WokMixer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wokRef = useRef<HTMLDivElement>(null);
  const [wokIngredients, setWokIngredients] = useState<string[]>([]);
  const [popups, setPopups] = useState<Popup[]>([]);
  const [customDish, setCustomDish] = useState<{ name: string; price: string } | null>(null);
  const [spiceLevel, setSpiceLevel] = useState<number>(1);
  const [isTossing, setIsTossing] = useState<boolean>(false);

  // Sound effects logic (mocked via Audio API to prevent errors in SSR)
  const playSound = (type: "sizzle" | "toss" | "fire") => {
    if (typeof window !== "undefined") {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        if (type === "sizzle") {
          oscillator.type = "square";
          oscillator.frequency.setValueAtTime(100 + Math.random() * 500, audioCtx.currentTime);
          gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
          oscillator.start();
          oscillator.stop(audioCtx.currentTime + 0.2);
        } else if (type === "toss") {
          oscillator.type = "triangle";
          oscillator.frequency.setValueAtTime(300, audioCtx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.5);
          gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
          oscillator.start();
          oscillator.stop(audioCtx.currentTime + 0.5);
        } else if (type === "fire") {
          oscillator.type = "sawtooth";
          oscillator.frequency.setValueAtTime(50 * spiceLevel, audioCtx.currentTime);
          gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
          oscillator.start();
          oscillator.stop(audioCtx.currentTime + 0.3);
        }
      } catch(e) {
        // Fallback or ignore if Web Audio API not supported
      }
    }
  };

  const addSizzlePopup = (text: string, x: number, y: number) => {
    const newPopup = { id: Date.now(), text, x, y };
    setPopups((prev) => [...prev, newPopup]);
    setTimeout(() => {
      setPopups((prev) => prev.filter((p) => p.id !== newPopup.id));
    }, 1200);
  };

  const calculateDish = (ingredients: string[]) => {
    if (ingredients.length === 0) {
      setCustomDish(null);
      return;
    }

    const hasNoodles = ingredients.includes("noodles");
    const hasRice = ingredients.includes("rice");
    const hasPaneer = ingredients.includes("paneer");
    const hasEgg = ingredients.includes("egg");
    const hasSchezwan = ingredients.includes("schezwan");
    const hasGarlic = ingredients.includes("garlic");

    let name = "Tossed Stir Fry";
    let price = "₹99";

    if (hasNoodles) {
      if (hasPaneer && hasSchezwan) { name = "Schezwan Paneer Noodles"; price = "₹129"; }
      else if (hasGarlic) { name = "Chilli Garlic Noodles"; price = "₹99"; }
      else if (hasSchezwan) { name = "Schezwan Noodles"; price = "₹99"; }
      else if (hasEgg) { name = "Egg Hakka Noodles"; price = "₹109"; }
      else { name = "Veg Hakka Noodles"; price = "₹89"; }
    } else if (hasRice) {
      if (hasPaneer && hasSchezwan) { name = "Schezwan Paneer Fried Rice"; price = "₹129"; }
      else if (hasSchezwan) { name = "Schezwan Fried Rice"; price = "₹109"; }
      else if (hasEgg) { name = "Egg Fried Rice"; price = "₹99"; }
      else { name = "Veg Fried Rice"; price = "₹79"; }
    } else {
      if (hasPaneer && hasSchezwan) { name = "Schezwan Chilli Paneer"; price = "₹139"; }
      else if (hasPaneer) { name = "Chilli Paneer"; price = "₹129"; }
      else if (hasEgg) { name = "Spicy Egg Manchurian"; price = "₹119"; }
      else { name = "Stir Fried Veg Manchurian"; price = "₹119"; }
    }

    setCustomDish({ name, price });
  };

  const handleAddIngredient = (ingredientId: string) => {
    if (!wokIngredients.includes(ingredientId)) {
      const nextIngredients = [...wokIngredients, ingredientId];
      setWokIngredients(nextIngredients);
      calculateDish(nextIngredients);
      playSound("sizzle");

      const sounds = ["*TOSS!*", "*SIZZLE!*", "*FLAME!*", "*WOK-ROLL!*"];
      const randomSound = sounds[Math.floor(Math.random() * sounds.length)];

      if (wokRef.current && containerRef.current) {
        const wokRect = wokRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        
        const x = wokRect.left - containerRect.left + wokRect.width / 2;
        const y = wokRect.top - containerRect.top + wokRect.height / 2;
        addSizzlePopup(randomSound, x, y);
      }
    }
  };

  const handleDragEnd = (ingredientId: string, name: string, info: any) => {
    const wokEl = wokRef.current;
    if (!wokEl) return;
    const rect = wokEl.getBoundingClientRect();
    const x = info.point.x;
    const y = info.point.y;
    const droppedInWok = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;

    if (droppedInWok) {
      handleAddIngredient(ingredientId);
    }
  };

  const handleTossWok = () => {
    if (wokIngredients.length === 0 || isTossing) return;
    setIsTossing(true);
    playSound("toss");
    setTimeout(() => setIsTossing(false), 800);
  };

  const handleSpiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpiceLevel(Number(e.target.value));
    playSound("fire");
  };

  const removeIngredient = (id: string) => {
    const nextIngredients = wokIngredients.filter((i) => i !== id);
    setWokIngredients(nextIngredients);
    calculateDish(nextIngredients);
  };

  const resetWok = () => {
    setWokIngredients([]);
    setCustomDish(null);
    setSpiceLevel(1);
  };

  return (
    <section className="wok-section" id="wok-mixer" ref={containerRef}>
      <h2 className="wok-title">Physics Wok Customizer</h2>
      <p className="wok-subtitle">
        💡 <strong>Drag</strong> ingredients to the wok. Adjust the heat, and click <strong>TOSS</strong>!
      </p>

      <div className="wok-grid">
        <div className="wok-shelf">
          <h3 className="shelf-title">Ingredients Shelf</h3>
          <div className="ingredients-container">
            {INGREDIENTS.map((ing) => {
              const isInWok = wokIngredients.includes(ing.id);
              return (
                <motion.div
                  key={ing.id}
                  className={`ingredient-tag ${isInWok ? "in-wok" : ""}`}
                  drag={!isInWok}
                  dragConstraints={containerRef}
                  dragElastic={0.1}
                  onDragEnd={(e, info) => handleDragEnd(ing.id, ing.name, info)}
                  onTap={() => { if (!isInWok) handleAddIngredient(ing.id); }}
                  whileDrag={{ scale: 1.1, rotate: 5, zIndex: 100 }}
                  whileHover={{ scale: isInWok ? 1 : 1.05 }}
                  style={{ touchAction: "none", cursor: isInWok ? "default" : "grab" }}
                >
                  {ing.name}
                </motion.div>
              );
            })}
          </div>

          {wokIngredients.length > 0 && (
            <div className="wok-active-ingredients-list">
              <h4>Ingredients in Wok:</h4>
              <div className="active-ingredients-flex">
                {wokIngredients.map((id) => {
                  const ing = INGREDIENTS.find((i) => i.id === id);
                  return (
                    <span key={id} className="active-ingredient-badge">
                      {ing?.name}
                      <button onClick={() => removeIngredient(id)} className="badge-remove-btn">✕</button>
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="wok-simulator">
          {/* Spice Controls */}
          <div className="spice-controls">
            <label htmlFor="spice-slider" className="spice-label">
              🔥 Heat Level: {spiceLevel === 1 ? "Simmer" : spiceLevel === 2 ? "High Heat" : "DRAGON FIRE!"}
            </label>
            <input 
              type="range" 
              id="spice-slider" 
              min="1" max="3" 
              value={spiceLevel} 
              onChange={handleSpiceChange}
              className="spice-slider"
            />
          </div>

          <div className="wok-wrapper">
            {wokIngredients.length > 0 && (
              <div className="wok-fire-container" style={{ transform: `scale(1, ${spiceLevel * 0.8})` }}>
                <div className="flame f1" />
                <div className="flame f2" />
                <div className="flame f3" />
                <div className="flame f4" />
              </div>
            )}

            <motion.div
              ref={wokRef}
              className={`wok-bowl ${wokIngredients.length > 0 ? "sizzling" : ""}`}
              animate={
                isTossing 
                ? { y: [0, -100, 0], rotate: [0, -30, 0] }
                : wokIngredients.length > 0
                  ? {
                      rotate: [0, -0.8 * spiceLevel, 0.8 * spiceLevel, 0],
                      y: [0, -2 * spiceLevel, 2 * spiceLevel, 0]
                    }
                  : {}
              }
              transition={{
                repeat: isTossing ? 0 : Infinity,
                duration: isTossing ? 0.6 : 0.25,
                ease: isTossing ? "circOut" : "linear"
              }}
            >
              <div className="wok-handle" />
              <div className="wok-inner">
                {wokIngredients.length === 0 ? (
                  <div className="wok-placeholder-ring">
                    <span className="placeholder-arrow">⚡</span>
                    <span>DRAG OR TAP TO COOK</span>
                    <span className="placeholder-sub">HOT WOK ZONE</span>
                  </div>
                ) : (
                  <div className="wok-cooked-items">
                    <AnimatePresence>
                      {wokIngredients.map((id, index) => {
                        const ing = INGREDIENTS.find((i) => i.id === id);
                        return (
                          <motion.div
                            key={id}
                            className="cooked-item"
                            initial={{ scale: 0, opacity: 0, y: -60 }}
                            animate={isTossing ? { 
                                y: [-40, -250, -40], 
                                x: [Math.sin(index) * 40, Math.sin(index) * 80, Math.sin(index) * 40],
                                rotate: [0, 360, 720]
                              } : {
                              scale: 1,
                              opacity: 1,
                              x: Math.sin(id.charCodeAt(0)) * 40,
                              y: Math.cos(id.charCodeAt(1)) * 40
                            }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ 
                              duration: isTossing ? 0.6 : 0.3,
                              type: isTossing ? "tween" : "spring" 
                            }}
                          >
                            {ing?.name.split(" ")[0]}
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                )}
                
                {wokIngredients.length > 0 && (
                  <div className="wok-steam">
                    {Array.from({length: spiceLevel * 2}).map((_, i) => (
                      <div key={i} className={`steam-particle s${(i % 3) + 1}`} />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {popups.map((p) => (
              <motion.div
                key={p.id}
                className="sizzle-popup"
                style={{ left: p.x, top: p.y }}
                initial={{ scale: 0.3, opacity: 0, y: 0 }}
                animate={{ scale: [1, 1.3, 1], opacity: 1, y: -70, rotate: [-15, 15, 0] }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {p.text}
              </motion.div>
            ))}
          </div>

          <div className="wok-results">
            {customDish ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="results-box"
              >
                <button onClick={handleTossWok} className="toss-button" disabled={isTossing}>
                  {isTossing ? "🔥 TOSSING..." : "🥘 TOSS WOK!"}
                </button>
                <h4 className="wok-result-heading" style={{ marginTop: '16px' }}>Tossed Recipe Result:</h4>
                <div className="result-dish-name">{customDish.name}</div>
                <div className="result-dish-price">{customDish.price}</div>
                <div className="wok-actions">
                  <a href="#" className="wok-btn order-btn">💬 Order via WhatsApp</a>
                  <button onClick={resetWok} className="wok-btn reset-btn">🗑️ Reset</button>
                </div>
              </motion.div>
            ) : (
              <div className="results-placeholder">
                The wok is cold. Add noodles, rice, or paneer to see your recipe!
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
