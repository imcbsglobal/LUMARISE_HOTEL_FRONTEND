import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "https://lumarisehotel.com";

// ============================================================================
// PERFORMANCE UTILITIES
// ============================================================================

// Aggressive image preloading with priority hints
const preloadImage = (src, priority = 'low') => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = 'async';
    img.fetchPriority = priority; // Modern browsers only
    img.src = src;
    img.onload = () => {
      img.decode()
        .then(() => resolve(img))
        .catch(() => resolve(img)); // Fallback on decode failure
    };
    img.onerror = reject;
  });
};

// Debounce utility for performance
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
  const [isHovered, setIsHovered] = useState(false);
  const imgRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (item.media_type === "image" && item.image) {
      preloadImage(item.image, 'low')
        .then(() => setLoaded(true))
        .catch(() => setLoaded(true));
    } else if (item.media_type === "video") {
      setLoaded(true);
    }
  }, [item.image, item.media_type]);

  // GPU-accelerated hover with RAF
  const handleMouseEnter = useCallback(() => {
    requestAnimationFrame(() => setIsHovered(true));
  }, []);

  const handleMouseLeave = useCallback(() => {
    requestAnimationFrame(() => setIsHovered(false));
  }, []);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden rounded-xl sm:rounded-2xl shadow-md relative bg-gray-800"
      style={{ 
        aspectRatio: '4/3',
        // Force GPU layer - CRITICAL for performance
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        perspective: 1000,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {item.media_type === "image" ? (
        <>
          {/* Placeholder */}
          {!loaded && (
            <div 
              className="absolute inset-0 bg-gray-700 flex items-center justify-center"
              style={{ transform: 'translateZ(0)' }}
            >
              <svg className="w-10 h-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          
          {/* Image - GPU accelerated */}
          <img
            ref={imgRef}
            src={item.image || "/no-image.png"}
            alt={item.title || "Gallery image"}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
            style={{
              opacity: loaded ? 1 : 0,
              transition: 'opacity 0.3s ease-out',
              // GPU layer promotion
              transform: 'translate3d(0, 0, 0)',
              willChange: loaded ? 'auto' : 'opacity', // Only when needed
            }}
            onLoad={() => setLoaded(true)}
            onError={() => setLoaded(true)}
          />
          
          {/* Hover overlay - Optimized with transform instead of background */}
          <div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              backgroundColor: isHovered ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)',
              transition: 'background-color 0.3s ease-out',
              transform: 'translateZ(1px)', // Separate layer
            }}
          >
            <span 
              className="text-white text-base sm:text-lg tracking-wider uppercase px-4 text-center"
              style={{
                opacity: isHovered ? 1 : 0,
                transform: `translateY(${isHovered ? '0' : '10px'})`,
                transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
              }}
            >
              {item.title}
            </span>
          </div>
        </>
      ) : (
        <video
          src={item.video || ""}
          controls
          preload="none"
          playsInline
          className="w-full h-full object-cover"
          style={{ transform: 'translateZ(0)' }}
        />
      )}
    </div>
  );
}, (prevProps, nextProps) => {
  // Deep comparison to prevent unnecessary re-renders
  return (
    prevProps.item.id === nextProps.item.id &&
    prevProps.item.image === nextProps.item.image &&
    prevProps.item.video === nextProps.item.video &&
    prevProps.item.title === nextProps.item.title
  );
});

GalleryImage.displayName = 'GalleryImage';

// ============================================================================
// MAIN GALLERY COMPONENT - HYPER-OPTIMIZED
// ============================================================================

export default function Gallery() {
  const [mediaList, setMediaList] = useState([]);
  const [displayedCount, setDisplayedCount] = useState(20);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const showMoreRef = useRef(null);
  const requestIdleCallbackRef = useRef(null);

  const ITEMS_PER_LOAD = 20;

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

  // MEMOIZE expensive computations
  const displayedMedia = useMemo(() => {
    return mediaList.slice(0, displayedCount);
  }, [mediaList, displayedCount]);

  const hasMore = useMemo(() => {
    return displayedCount < mediaList.length;
  }, [displayedCount, mediaList.length]);

  const remainingCount = useMemo(() => {
    return mediaList.length - displayedCount;
  }, [mediaList.length, displayedCount]);

  // DEBOUNCED load more to prevent rapid clicks
  const handleShowMore = useCallback(
    debounce(() => {
      if (loadingMore || !hasMore) return;

      setLoadingMore(true);

      // Use requestIdleCallback with proper cleanup
      if (requestIdleCallbackRef.current) {
        cancelIdleCallback(requestIdleCallbackRef.current);
      }

      requestIdleCallbackRef.current = requestIdleCallback(
        () => {
          setDisplayedCount((prev) => Math.min(prev + ITEMS_PER_LOAD, mediaList.length));
          setLoadingMore(false);
        },
        { timeout: 150 }
      );
    }, 300),
    [loadingMore, hasMore, mediaList.length]
  );

  // Cleanup idle callback on unmount
  useEffect(() => {
    return () => {
      if (requestIdleCallbackRef.current) {
        cancelIdleCallback(requestIdleCallbackRef.current);
      }
    };
  }, []);

  // OPTIMIZED preloading with throttling
  useEffect(() => {
    if (!hasMore || loadingMore) return;

    const nextBatch = mediaList.slice(displayedCount, displayedCount + ITEMS_PER_LOAD);

    // Throttle preloading
    const timeoutId = setTimeout(() => {
      requestIdleCallback(() => {
        nextBatch.forEach((item) => {
          if (item.media_type === "image" && item.image) {
            const img = new Image();
            img.src = item.image;
          }
        });
      });
    }, 500); // Wait 500ms before preloading

    return () => clearTimeout(timeoutId);
  }, [displayedCount, hasMore, loadingMore, mediaList]);

  return (
    <div className="relative w-full min-h-screen text-gray-800">
      {/* OPTIMIZED: Static background with contain */}
      <div
        className="fixed inset-0 bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/gallery-bg.jpg')",
          backgroundSize: 'cover',
          // Force GPU layer for fixed background
          transform: 'translateZ(0)',
          willChange: 'auto', // Remove willChange from static elements
        }}
      >
        <div 
          className="absolute inset-0"
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            transform: 'translateZ(0)'
          }}
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10">
        {/* Hero Section - Optimized */}
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

        {/* Gallery Media Section */}
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
          ) : displayedMedia.length === 0 ? (
            <p className="text-center text-gray-300 text-base sm:text-lg">No media uploaded yet.</p>
          ) : (
            <>
              {/* Gallery Grid - Optimized with CSS containment */}
              <div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                style={{
                  // CSS Containment for performance
                  contain: 'layout style paint',
                }}
              >
                {displayedMedia.map((item) => (
                  <GalleryImage key={item.id} item={item} />
                ))}
              </div>

              {/* Show More Button */}
              {mediaList.length > ITEMS_PER_LOAD && (
                <div ref={showMoreRef} className="mt-12 sm:mt-16 flex flex-col items-center gap-4">
                  {/* Item Counter */}
                  <div className="text-white text-sm sm:text-base font-medium">
                    Showing {displayedMedia.length} of {mediaList.length} items
                  </div>

                  {/* Show More Button or End Message */}
                  {hasMore ? (
                    <button
                      onClick={handleShowMore}
                      disabled={loadingMore}
                      className={`group relative px-8 py-3 sm:px-10 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 ${
                        loadingMore
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-900 hover:bg-gray-100 hover:shadow-2xl active:scale-95'
                      }`}
                      style={{
                        transform: 'translateZ(0)',
                        willChange: loadingMore ? 'auto' : 'transform',
                      }}
                    >
                      {loadingMore ? (
                        <span className="flex items-center gap-3">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Loading...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Show More
                          <span className="text-sm font-normal opacity-75">
                            ({Math.min(ITEMS_PER_LOAD, remainingCount)} more)
                          </span>
                          <svg
                            className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </span>
                      )}
                    </button>
                  ) : (
                    <div className="text-center py-6">
                      <div className="inline-flex items-center gap-2 text-white/80 text-sm sm:text-base">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        You've reached the end
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </section>

        {/* Bottom Section - Optimized */}
        <section
          className="relative h-[40vh] sm:h-[45vh] md:h-[50vh] bg-center bg-cover flex items-center justify-center text-white"
          style={{
            backgroundImage: "url('/gallery-bg2.jpg')",
            transform: 'translateZ(0)',
          }}
        >
          <div 
            className="rounded-xl mx-4 max-w-2xl p-6 sm:p-8 md:p-10"
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