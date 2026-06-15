"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

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
      if (hasPaneer && hasSchezwan) {
        name = "Schezwan Paneer Noodles";
        price = "₹129";
      } else if (hasGarlic) {
        name = "Chilli Garlic Noodles";
        price = "₹99";
      } else if (hasSchezwan) {
        name = "Schezwan Noodles";
        price = "₹99";
      } else if (hasEgg) {
        name = "Egg Hakka Noodles";
        price = "₹109";
      } else {
        name = "Veg Hakka Noodles";
        price = "₹89";
      }
    } else if (hasRice) {
      if (hasPaneer && hasSchezwan) {
        name = "Schezwan Paneer Fried Rice";
        price = "₹129";
      } else if (hasSchezwan) {
        name = "Schezwan Fried Rice";
        price = "₹109";
      } else if (hasEgg) {
        name = "Egg Fried Rice";
        price = "₹99";
      } else {
        name = "Veg Fried Rice";
        price = "₹79";
      }
    } else {
      if (hasPaneer && hasSchezwan) {
        name = "Schezwan Chilli Paneer";
        price = "₹139";
      } else if (hasPaneer) {
        name = "Chilli Paneer";
        price = "₹129";
      } else if (hasEgg) {
        name = "Spicy Egg Manchurian";
        price = "₹119";
      } else {
        name = "Stir Fried Veg Manchurian";
        price = "₹119";
      }
    }

    setCustomDish({ name, price });
  };

  const handleTossClick = (ingredientId: string) => {
    if (!wokIngredients.includes(ingredientId)) {
      const nextIngredients = [...wokIngredients, ingredientId];
      setWokIngredients(nextIngredients);
      calculateDish(nextIngredients);

      const sounds = ["*TOSS!*", "*SIZZLE!*", "*FLAME!*", "*WOK-ROLL!*"];
      const randomSound = sounds[Math.floor(Math.random() * sounds.length)];

      if (wokRef.current && containerRef.current) {
        const wokRect = wokRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        
        // Spawn popup right over the wok
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

    const droppedInWok =
      x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;

    if (droppedInWok) {
      handleTossClick(ingredientId);
    }
  };

  const removeIngredient = (id: string) => {
    const nextIngredients = wokIngredients.filter((i) => i !== id);
    setWokIngredients(nextIngredients);
    calculateDish(nextIngredients);
  };

  const resetWok = () => {
    setWokIngredients([]);
    setCustomDish(null);
  };

  const getWhatsAppLink = () => {
    if (!customDish) return "#";
    const ingNames = wokIngredients
      .map((id) => INGREDIENTS.find((ing) => ing.id === id)?.name || id)
      .join(", ");
    const text = `Hi Dragon Wok! I just tossed a custom dish in the Wok Mixer on your website: *${customDish.name}* (Price: ${customDish.price}) with ingredients: ${ingNames}. I'd like to order this!`;
    return `https://wa.me/919999999999?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="wok-section" id="wok-mixer" ref={containerRef}>
      <h2 className="wok-title">Wok & Roll Customizer</h2>
      <p className="wok-subtitle">
        💡 <strong>Tap/Click</strong> ingredients to instantly toss them, or <strong>drag</strong> them directly into the hot sizzling wok!
      </p>

      <div className="wok-grid">
        {/* Ingredient shelf */}
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
                  onTap={() => {
                    if (!isInWok) handleTossClick(ing.id);
                  }}
                  whileDrag={{ scale: 1.1, rotate: 5, zIndex: 100 }}
                  whileHover={{ scale: isInWok ? 1 : 1.05 }}
                  style={{
                    touchAction: "none",
                    cursor: isInWok ? "default" : "grab"
                  }}
                >
                  {ing.name}
                </motion.div>
              );
            })}
          </div>

          {/* Current Recipe Breakdown inside the shelf for clarity */}
          {wokIngredients.length > 0 && (
            <div className="wok-active-ingredients-list">
              <h4>Ingredients in Wok:</h4>
              <div className="active-ingredients-flex">
                {wokIngredients.map((id) => {
                  const ing = INGREDIENTS.find((i) => i.id === id);
                  return (
                    <span key={id} className="active-ingredient-badge">
                      {ing?.name}
                      <button 
                        onClick={() => removeIngredient(id)}
                        className="badge-remove-btn"
                        title="Remove ingredient"
                      >
                        ✕
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Wok simulator */}
        <div className="wok-simulator">
          <div className="wok-wrapper">
            {/* Sizzling Flames beneath the Wok */}
            {wokIngredients.length > 0 && (
              <div className="wok-fire-container">
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
                wokIngredients.length > 0
                  ? {
                      rotate: [0, -0.8, 0.8, -0.8, 0.8, 0],
                      y: [0, -2, 2, -2, 2, 0]
                    }
                  : {}
              }
              transition={{
                repeat: Infinity,
                duration: 0.25,
                ease: "linear"
              }}
            >
              {/* Wok Rim and Handle */}
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
                      {wokIngredients.map((id) => {
                        const ing = INGREDIENTS.find((i) => i.id === id);
                        return (
                          <motion.div
                            key={id}
                            className="cooked-item"
                            initial={{ scale: 0, opacity: 0, y: -60 }}
                            animate={{
                              scale: 1,
                              opacity: 1,
                              x: Math.sin(id.charCodeAt(0)) * 40,
                              y: Math.cos(id.charCodeAt(1)) * 40
                            }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 220, damping: 14 }}
                          >
                            {ing?.name.split(" ")[0]}
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                )}
                
                {/* Steam effect */}
                {wokIngredients.length > 0 && (
                  <div className="wok-steam">
                    <div className="steam-particle s1" />
                    <div className="steam-particle s2" />
                    <div className="steam-particle s3" />
                  </div>
                )}
              </div>
            </motion.div>

            {/* Sizzle Text Popups */}
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

          {/* Results panel */}
          <div className="wok-results">
            {customDish ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="results-box"
              >
                <h4 className="wok-result-heading">Tossed Recipe Result:</h4>
                <div className="result-dish-name">{customDish.name}</div>
                <div className="result-dish-price">{customDish.price}</div>
                <div className="wok-actions">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="wok-btn order-btn"
                  >
                    💬 Order via WhatsApp
                  </a>
                  <button onClick={resetWok} className="wok-btn reset-btn">
                    🗑️ Reset Wok
                  </button>
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
