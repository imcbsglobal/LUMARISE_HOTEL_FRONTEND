import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden font-serif">
      {/* 🎥 Background Video - Optimized for performance */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/lumarise_hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/hero-poster.jpg" 
        style={{
          willChange: 'transform', 
          transform: 'translateZ(0)', 
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 md:px-6"
      >
        {/* Elegant Script Text */}
        <motion.h2
          className="text-[#f5d36c] mb-[-0.5rem] sm:mb-[-1rem] md:mb-[-1.5rem] lg:mb-[-2rem]"
          style={{
            fontFamily: "'WindSong', cursive",
            fontSize: isMobile ? "3.5rem" : "7rem",
            lineHeight: "1.5",
            fontWeight: 500,
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          luxury
        </motion.h2>

        {/* Main Title */}
        <motion.h1
          className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.25em] mb-6 md:mb-8 px-2 leading-relaxed"
          style={{
            fontFamily: "'Cinzel', serif",
            fontWeight: 700,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Memories that will last forever
        </motion.h1>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/rooms")}
          className="bg-[#f5d36c] text-black px-6 sm:px-8 md:px-10 py-3 md:py-4 text-xs sm:text-sm md:text-base font-medium tracking-widest uppercase
                    hover:bg-[#e0c45a] transition-all duration-300 shadow-lg active:shadow-xl"
          style={{
            fontFamily: "'Cinzel', serif",
            touchAction: 'manipulation', // Prevents 300ms delay on mobile
          }}
        >
          View Our Rooms
        </motion.button>
      </motion.div>
    </section>
  );
}