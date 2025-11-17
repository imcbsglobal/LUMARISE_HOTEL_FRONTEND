import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export default function Gallery() {
  const [mediaList, setMediaList] = useState([]);
  const [displayedMedia, setDisplayedMedia] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(12);
  const [loading, setLoading] = useState(false);
  const observerTarget = useRef(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  useEffect(() => {
    setDisplayedMedia(mediaList.slice(0, itemsToShow));
  }, [mediaList, itemsToShow]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayedMedia.length < mediaList.length && !loading) {
          setItemsToShow(prev => prev + 12);
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [displayedMedia.length, mediaList.length, loading]);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/media/`);
      const data = Array.isArray(res.data) ? res.data : res.data.results || [];
      const sorted = data.sort((a, b) => new Date(b.uploaded_at) - new Date(a.uploaded_at));
      setMediaList(sorted);
      setDisplayedMedia(sorted.slice(0, itemsToShow));
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-full text-gray-800">
      {/* Fixed Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/gallery-bg.jpg')",
          backgroundAttachment: window.innerWidth > 768 ? "fixed" : "scroll", // Disable parallax on mobile
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center h-[50vh] sm:h-[55vh] md:h-[60vh] text-white px-4 sm:px-6">
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

        {/* Gallery Media Section */}
        <section className="backdrop-blur-sm rounded-t-2xl sm:rounded-t-3xl shadow-2xl px-4 sm:px-6 md:px-12 lg:px-24 py-12 sm:py-16 md:py-20">
          {displayedMedia.length === 0 && !loading ? (
            <p className="text-center text-gray-300 text-base sm:text-lg">No media uploaded yet.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {displayedMedia.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="overflow-hidden rounded-xl sm:rounded-2xl shadow-lg group relative aspect-[4/3] sm:aspect-auto"
                  >
                    {item.media_type === "image" ? (
                      <img
                        src={item.image ? item.image : "/no-image.png"}
                        alt={item.title || "Gallery image"}
                        loading="lazy"
                        className="w-full h-full sm:h-64 object-cover transform transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <video
                        src={item.video ? item.video : ""}
                        controls
                        preload="metadata"
                        playsInline
                        className="w-full h-full sm:h-64 object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-500 pointer-events-none">
                      <span className="text-white text-base sm:text-lg tracking-wider uppercase px-4 text-center">
                        {item.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Infinite Scroll Trigger */}
              {displayedMedia.length < mediaList.length && (
                <div ref={observerTarget} className="text-center mt-8 sm:mt-10 md:mt-12 py-6 sm:py-8">
                  <div className="inline-block">
                    <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-white"></div>
                  </div>
                  <p className="text-white mt-3 sm:mt-4 text-sm sm:text-base">Loading more...</p>
                </div>
              )}
            </>
          )}
        </section>

        {/* Parallax Divider Section */}
        <section
          className="relative h-[40vh] sm:h-[45vh] md:h-[50vh] bg-center bg-cover flex items-center justify-center text-white"
          style={{ 
            backgroundImage: "url('/gallery-bg2.jpg')",
            backgroundAttachment: window.innerWidth > 768 ? "fixed" : "scroll", // Disable parallax on mobile
          }}
        >
          <div className="bg-black/40 p-6 sm:p-8 md:p-10 rounded-xl backdrop-blur-sm mx-4 max-w-2xl">
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