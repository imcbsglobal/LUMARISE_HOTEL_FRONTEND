import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const images = ["/banner3.webp", "/banner2.webp", "/banner1.webp"];

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    // SEO Title & Description update
    document.title = "Lumarise Residency – Luxury Hotel in Sultan Bathery, Wayanad";
    const desc = document.querySelector("meta[name='description']");
    if (desc) {
      desc.setAttribute(
        "content",
        "Experience luxury at Lumarise Residency, Sultan Bathery – premium rooms, free Wi-Fi, private parking, and access to Wayanad attractions."
      );
    }

    // Background slideshow
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `
            {
              "@context": "https://schema.org",
              "@type": "Hotel",
              "name": "Lumarise Residency",
              "image": "https://lumarisehotel.com/og-image.jpg",
              "url": "https://lumarisehotel.com/",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Near Assumption Hospital",
                "addressLocality": "Sultan Bathery",
                "addressRegion": "Wayanad",
                "addressCountry": "IN"
              },
              "telephone": "+918606033337",
              "priceRange": "₹₹"
            }
          `,
        }}
      />

      <section className="relative h-[90vh] sm:h-[95vh] md:h-[100vh] w-full overflow-hidden font-serif">
        {images.map((img, index) => (
          <motion.div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${img})` }}
            animate={{ scale: index === currentImage ? 1.08 : 1 }}
            transition={{ duration: 6, ease: "easeInOut" }}
          />
        ))}

        <div className="absolute inset-0 bg-black/40"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4"
        >
          <motion.h2
            className="text-[#f5d36c] mb-[-0.5rem] sm:mb-[-1rem] md:mb-[-1.5rem] lg:mb-[-2rem]"
            style={{
              fontFamily: "'WindSong', cursive",
              fontSize: "3.5rem",
              lineHeight: "2.8",
              fontWeight: 500,
            }}
          >
            <span className="sm:text-[5rem] md:text-[7rem] font-normal leading-none">luxury</span>
          </motion.h2>

          <motion.h1
            className="text-lg sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl tracking-[0.12em] sm:tracking-[0.18em] md:tracking-[0.25em] mb-4 sm:mb-6 md:mb-8 px-3 leading-relaxed"
            style={{ fontFamily: "'Cinzel', serif", fontWeight: 700 }}
          >
            Memories that will last forever
          </motion.h1>

          <Link to="/rooms">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#f5d36c] text-black px-7 py-3 sm:px-10 sm:py-4 text-xs sm:text-sm md:text-base font-medium tracking-widest uppercase hover:bg-[#e0c45a] transition-all duration-300 shadow-lg"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              View Our Rooms
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </>
  );
}
