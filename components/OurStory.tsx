"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

export default function OurStory() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="our-story-section" id="story">
      <div className="story-container">
        <motion.div 
          className="story-image-container"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <div className="story-image-bg-shape"></div>
          <Image 
            src="/wok_master.png" 
            alt="The Wok Master" 
            width={500} 
            height={500} 
            className="story-image"
          />
        </motion.div>

        <motion.div 
          className="story-text-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 className="story-title" variants={itemVariants}>
            THE LEGEND <br/>OF THE WOK
          </motion.h2>
          
          <motion.p className="story-paragraph" variants={itemVariants}>
            It all started with a single cast-iron wok and a dream. Back in the day, we realized that fast food didn't have to mean boring food. We wanted the intense heat of a street-side kitchen, but served up quick for the modern craving.
          </motion.p>
          
          <motion.div className="story-timeline" variants={itemVariants}>
            <div className="timeline-item">
              <span className="timeline-year">2018</span>
              <span className="timeline-desc">First wok fired up in a tiny garage.</span>
            </div>
            <div className="timeline-item">
              <span className="timeline-year">2021</span>
              <span className="timeline-desc">Perfected the signature Chili Garlic oil.</span>
            </div>
            <div className="timeline-item">
              <span className="timeline-year">TODAY</span>
              <span className="timeline-desc">Tossing hundreds of custom bowls daily.</span>
            </div>
          </motion.div>
          
          <motion.p className="story-paragraph" variants={itemVariants}>
            At <strong>Dragon Wok</strong>, we don't just cook food; we toss it, we scorch it, we give it that signature "Wok Hei" (Breath of the Wok). Fast, fresh, and unapologetically loud.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
