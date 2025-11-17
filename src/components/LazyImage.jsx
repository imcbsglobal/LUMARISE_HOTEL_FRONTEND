// src/components/LazyImage.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";

export default function LazyImage({
  src,
  alt = "",
  className = "",
  poster = "/no-image.png",
  style = {},
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisible(true);
              io.unobserve(entry.target);
            }
          });
        },
        { 
          rootMargin: "300px", // Load images before they enter viewport
          threshold: 0.01 // Trigger as soon as 1% is visible
        }
      );
      io.observe(ref.current);
      return () => io.disconnect();
    }
    // Fallback for browsers without IntersectionObserver
    setVisible(true);
  }, []);

  const imgStyle = useMemo(
    () => ({
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "opacity 300ms ease, transform 400ms ease",
      opacity: loaded ? 1 : 0.85,
      transform: loaded ? "none" : "scale(1.01)",
      willChange: loaded ? "auto" : "opacity, transform", // Remove willChange after load
      ...style,
    }),
    [loaded, style]
  );

  const containerStyle = useMemo(
    () => ({
      backgroundColor: error ? "#e5e5e5" : "#f3f3f3",
      position: "relative",
    }),
    [error]
  );

  const handleLoad = () => {
    setLoaded(true);
    setError(false);
  };

  const handleError = () => {
    setError(true);
    setLoaded(true);
  };

  return (
    <div 
      ref={ref} 
      className={`relative overflow-hidden ${className}`} 
      style={containerStyle}
    >
      {visible ? (
        <>
          <img 
            src={src} 
            alt={alt} 
            loading="lazy" 
            decoding="async"
            fetchpriority="low" // Hint to browser to prioritize other content first
            onLoad={handleLoad}
            onError={handleError}
            style={imgStyle}
            // Responsive srcset for better mobile performance (optional - requires backend support)
            // srcSet={`${src}?w=400 400w, ${src}?w=800 800w, ${src}?w=1200 1200w`}
            // sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
          />
          {/* Error fallback */}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-center text-gray-400 p-4">
                <svg 
                  className="w-12 h-12 mx-auto mb-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                  />
                </svg>
                <p className="text-xs">Image unavailable</p>
              </div>
            </div>
          )}
        </>
      ) : (
        <img 
          src={poster} 
          alt={alt} 
          className="w-full h-full object-cover opacity-50"
          loading="lazy"
        />
      )}
    </div>
  );
}