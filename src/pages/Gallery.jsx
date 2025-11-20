import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "https://lumarisehotel.com";

// ============================================================================
// PERFORMANCE UTILITIES
// ============================================================================

const preloadImage = (src, priority = 'low') => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = 'async';
    img.fetchPriority = priority;
    img.src = src;
    img.onload = () => {
      img.decode()
        .then(() => resolve(img))
        .catch(() => resolve(img));
    };
    img.onerror = reject;
  });
};

const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// ============================================================================
// OPTIMIZED IMAGE COMPONENT - GPU ACCELERATED
// ============================================================================

const GalleryImage = React.memo(({ item }) => {
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);

  const wrapperRef = useRef(null);

  // Preload image
  useEffect(() => {
    if (item.media_type === "image" && item.image) {
      preloadImage(item.image)
        .then(() => setLoaded(true))
        .catch(() => setLoaded(true));
    } else {
      setLoaded(true);
    }
  }, [item.image, item.media_type]);

  // Scroll reveal / disappear
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    if (wrapperRef.current) observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  // Scroll animation
  const scrollStyle = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(60px)",
    transition: "all 0.6s ease-out",
    willChange: "opacity, transform",
  };

  return (
    <div
      ref={wrapperRef}
      className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg bg-gray-900"
      style={{
        aspectRatio: "4 / 3",
        transform: "translateZ(0)",
        ...scrollStyle,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* IMAGE */}
      {item.media_type === "image" ? (
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.4s ease-out",
          }}
        />
      ) : (
        <video
          src={item.video}
          controls
          className="w-full h-full object-cover"
        />
      )}

      {/* HOVER OVERLAY TITLE */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          background: hover ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0)",
          opacity: hover ? 1 : 0,
          transition: "all 0.3s ease-out",
        }}
      >
        <span
          className="text-white text-lg sm:text-xl font-semibold uppercase tracking-wide px-3 text-center"
          style={{
            transform: hover ? "translateY(0)" : "translateY(10px)",
            opacity: hover ? 1 : 0,
            transition: "all 0.3s ease-out",
          }}
        >
          {item.title}
        </span>
      </div>
    </div>
  );
});

// ============================================================================
// MAIN GALLERY COMPONENT - UNLIMITED IMAGES
// ============================================================================

export default function Gallery() {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/media/`);
      const data = Array.isArray(res.data) ? res.data : res.data.results || [];
      const sorted = data.sort((a, b) => new Date(b.uploaded_at) - new Date(a.uploaded_at));
      setMediaList(sorted);
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen text-gray-800">
      <div
        className="fixed inset-0 bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/gallery-bg.jpg')",
          backgroundSize: 'cover',
          transform: 'translateZ(0)',
          willChange: 'auto',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            transform: 'translateZ(0)',
          }}
        />
      </div>

      <div className="relative z-10">
        <section
          className="flex flex-col items-center justify-center text-center h-[50vh] sm:h-[55vh] md:h-[60vh] text-white px-4 sm:px-6"
          style={{ transform: 'translateZ(0)' }}
        >
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider mb-3 sm:mb-4 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our Gallery
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl leading-relaxed px-2">
            Discover the elegance and charm of Lumarise — where every corner tells a story.
          </p>
        </section>

        <section
          className="rounded-t-2xl sm:rounded-t-3xl shadow-2xl px-4 sm:px-6 md:px-12 lg:px-24 py-12 sm:py-16 md:py-20"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            transform: 'translateZ(0)',
          }}
        >
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
              </div>
              <p className="text-white mt-4 text-base">Loading gallery...</p>
            </div>
          ) : mediaList.length === 0 ? (
            <p className="text-center text-gray-300 text-base sm:text-lg">No media uploaded yet.</p>
          ) : (
            <>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                style={{ contain: 'layout style paint' }}
              >
                {mediaList.map((item) => (
                  <GalleryImage key={item.id} item={item} />
                ))}
              </div>
            </>
          )}
        </section>

        <section
          className="relative h-[40vh] sm:h-[45vh] md:h-[50vh] bg-center bg-cover flex items-center justify-center text-white"
          style={{
            backgroundImage: "url('/gallery-bg2.jpg')",
            transform: 'translateZ(0)',
          }}
        >
          <div
            className="rounded-xl mx-4 max-w-2xl p-6 sm:px-8 md:px-10"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              transform: 'translateZ(0)',
            }}
          >
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Timeless Luxury
            </h2>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed">
              Immerse yourself in a serene experience surrounded by architecture, art, and nature.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
