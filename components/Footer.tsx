"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      <p className="footer-name">DRAGON WOK</p>
      <p>Shop 12, Main Market, [City Name] - 000000</p>
      <p><a href="tel:+919999999999">+91-XXXXXXXXXX</a></p>
      <p>(no reservations)</p>
      <p><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram ↗</a></p>
      <p>Mon–Sun: 11:00 AM – 10:30 PM</p>
      <p>dragonwok@gmail.com</p>
      <p className="copyright">© 2025 Dragon Wok</p>
    </motion.footer>
  );
}
