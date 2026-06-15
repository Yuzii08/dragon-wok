"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    const h = new Date().getHours();
    setIsOpen(h >= 11 && h < 22);
  }, []);

  return (
    <section className="info-section" id="about" ref={ref}>
      <motion.div
        className="info-text"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <div className="info-status" style={{ color: isOpen ? "#25D366" : "#D62B2B" }}>
          {isOpen ? "OPEN NOW" : "CLOSED"}
        </div>
        <p>Shop 12, Main Market, [City Name] - 000000</p>
        <p><a href="tel:+919999999999">+91-XXXXXXXXXX</a></p>
        <p><a href="mailto:dragonwok@gmail.com">dragonwok@gmail.com</a></p>
        <p style={{ marginTop: 12 }}><strong>Hours</strong></p>
        <p>Mon–Sun: 11:00 AM – 10:30 PM</p>
        <p style={{ marginTop: 12 }}><a href="https://wa.me/919999999999" className="wa-link">WhatsApp Order ↗</a></p>
        <p><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram ↗</a></p>
        <p style={{ fontStyle: "italic", color: "#555", marginTop: 8 }}>(no reservations · delivery within 5km)</p>
      </motion.div>

      <motion.div
        className="info-map"
        initial={{ opacity: 0, x: 60 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.0!2d77.2!3d28.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM2JzAwLjAiTiA3N8KwMTInMDAuMCJF!5e0!3m2!1sen!2sin!4v1600000000000"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Dragon Wok location"
        />
      </motion.div>
    </section>
  );
}
