import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { Title, Meta } from "react-head";

const BASE_URL = import.meta.env.VITE_API_URL || "https://lumarisehotel.com";

/* ========================================================================
   IMAGE PRELOAD HELPERS
======================================================================== */

const preloadImage = (src, priority = "low") => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.fetchPriority = priority;
    img.src = src;
    img.onload = () => {
      img.decode().then(() => resolve(img)).catch(() => resolve(img));
    };
    img.onerror = reject;
  });
};

const GalleryImage = React.memo(({ item }) => {
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);

  const wrapperRef = useRef(null);

  useEffect(() => {
    if (item.media_type === "image" && item.image) {
      preloadImage(item.image).then(() => setLoaded(true));
    } else {
      setLoaded(true);
    }
  }, [item.image, item.media_type]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    if (wrapperRef.current) observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollStyle = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(60px)",
    transition: "all 0.6s ease-out",
  };

  return (
    <div
      ref={wrapperRef}
      className="relative overflow-hidden rounded-xl shadow-lg bg-gray-900"
      style={{ aspectRatio: "4 / 3", ...scrollStyle }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {item.media_type === "image" ? (
        <img
          src={item.image}
          alt={item.title || "Lumarise Residency Gallery Image"}
          className="w-full h-full object-cover"
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.4s ease-out",
          }}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <video src={item.video} controls className="w-full h-full object-cover" />
      )}

      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          background: hover ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0)",
          opacity: hover ? 1 : 0,
          transition: "all 0.3s ease-out",
        }}
      >
        <span
          className="text-white text-lg font-semibold uppercase tracking-wide text-center"
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

/* ========================================================================
   MAIN GALLERY COMPONENT
======================================================================== */

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
    <>
      {/* ====================== SEO META TAGS ======================= */}
      <Title>Gallery – Photos & Videos of Lumarise Residency, Sultan Bathery</Title>
      <Meta
        name="description"
        content="Browse photos and videos of rooms, interior spaces, architecture and experiences at Lumarise Residency in Sultan Bathery, Wayanad."
      />
      <Meta
        name="keywords"
        content="Lumarise gallery, hotel photos Wayanad, rooms images Sultan Bathery, hotel interior photos, Wayanad travel photos"
      />
      <Meta property="og:title" content="Lumarise Residency Gallery | Sultan Bathery, Wayanad" />
      <Meta
        property="og:description"
        content="Visual walkthrough of Lumarise Residency — luxury rooms, facilities, ambiance and attractions around Wayanad."
      />
      <Meta property="og:url" content="https://lumarisehotel.com/gallery" />
      <Meta property="og:type" content="website" />

      {/* ====================== PAGE VIEW ======================= */}

      <div className="relative w-full min-h-screen text-gray-800">
        <div
          className="fixed inset-0 bg-center bg-cover"
          style={{ backgroundImage: "url('/gallery-bg.webp')" }}
        >
          <div className="absolute inset-0 bg-black/55"></div>
        </div>

        <div className="relative z-10">
          <section className="flex flex-col items-center justify-center text-center h-[55vh] text-white px-4">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-wider mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Our Gallery
            </h1>
            <p className="text-base sm:text-lg md:text-xl max-w-2xl">
              Discover the elegance and charm of Lumarise — where every corner tells a story.
            </p>
          </section>

          <section className="rounded-t-3xl shadow-2xl px-6 md:px-12 lg:px-24 py-12 bg-black/30">
            {loading ? (
              <div className="text-center py-12 text-white">Loading gallery...</div>
            ) : mediaList.length === 0 ? (
              <p className="text-center text-gray-300">No media uploaded yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {mediaList.map((item) => (
                  <GalleryImage key={item.id} item={item} />
                ))}
              </div>
            )}
          </section>

          <section
            className="relative h-[45vh] bg-center bg-cover flex items-center justify-center text-white"
            style={{ backgroundImage: "url('/gallery-bg2.webp')" }}
          >
            <div className="rounded-xl mx-4 max-w-2xl p-6 bg-black/50">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Timeless Luxury
              </h2>
              <p className="text-base sm:text-lg">
                Immerse yourself in a serene experience surrounded by architecture, art, and nature.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
