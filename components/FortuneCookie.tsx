"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FORTUNES = [
  "A great bowl of noodles is in your future.",
  "Your hunger will soon be cured.",
  "Warning: Our chili sauce takes no prisoners.",
  "Use code WOW20 for 20% off!",
  "A wok a day keeps the sadness away."
];

export default function FortuneCookie() {
  const [isOpen, setIsOpen] = useState(false);
  const [fortune, setFortune] = useState("");

  const crackCookie = () => {
    if (isOpen) return;
    const randomFortune = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
    setFortune(randomFortune);
    setIsOpen(true);
    // Optional: Add crack sound effect here
  };

  return (
    <div className="fortune-cookie-container">
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="cookie-unopened"
            onClick={crackCookie}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0, filter: "blur(10px)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            🥠
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="cookie-opened-paper"
            initial={{ width: 0, opacity: 0, scale: 0.5 }}
            animate={{ width: "auto", opacity: 1, scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            <span className="fortune-text">{fortune}</span>
            <button className="close-fortune" onClick={() => setIsOpen(false)}>×</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
