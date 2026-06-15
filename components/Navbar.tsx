"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <nav>
        <Link href="/" className="logo">Dragon Wok</Link>
        <div className="nav-links">
          <a href="#top">Home</a>
          <a href="#menu">Menu</a>
          <a href="#about">About</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="nav-icon" style={{ border: "none" }}>📷</a>
        </div>
        <button className="hamburger" onClick={toggle} aria-label="Toggle menu">☰</button>
      </nav>
      <div className={`mobile-overlay ${isOpen ? "open" : ""}`}>
        <button onClick={toggle} style={{ position: "absolute", top: 18, right: 20, background: "none", border: "none", fontSize: 32, cursor: "pointer", fontFamily: "'Permanent Marker', cursive" }}>✕</button>
        <a href="#top" onClick={toggle}>Home</a>
        <a href="#menu" onClick={toggle}>Menu</a>
        <a href="#about" onClick={toggle}>About</a>
        <a href="https://wa.me/919999999999">WhatsApp</a>
        <a href="tel:+919999999999">Call Us</a>
      </div>
    </>
  );
}
