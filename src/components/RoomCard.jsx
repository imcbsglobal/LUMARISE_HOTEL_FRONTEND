import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

// ==================== Polyfills / helpers ====================
const idle = (fn) => {
  if ('requestIdleCallback' in window) return requestIdleCallback(fn);
  return setTimeout(fn, 200);
};

// ==================== Small utility components ====================
const Placeholder = ({ className = '' }) => (
  <div className={`bg-gray-200 ${className}`} />
);

// ==================== LazyImage (memoized) ====================
const LazyImage = React.memo(function LazyImage({
  src,
  alt = '',
  className = '',
  poster = '/no-image.png',
  style = {},
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              setVisible(true);
              io.unobserve(e.target);
            }
          }
        },
        { rootMargin: '300px' }
      );
      io.observe(ref.current);
      return () => io.disconnect();
    }
    setVisible(true);
  }, []);

  const imgStyle = useMemo(
    () => ({
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'opacity 300ms ease, transform 400ms ease',
      opacity: loaded ? 1 : 0.85,
      transform: loaded ? 'none' : 'scale(1.01)',
      willChange: 'opacity, transform',
      ...style,
    }),
    [loaded, style]
  );

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} style={{ backgroundColor: '#f3f3f3' }}>
      {visible ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          style={imgStyle}
        />
      ) : (
        <img src={poster} alt="placeholder" className="w-full h-full object-cover" />
      )}
    </div>
  );
});

// ==================== Icons (memoized to avoid re-creation) ====================
const Icons = Object.freeze({
  Wifi: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M2 8.6C7 4 17 4 22 8.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 11.6C8 9 16 9 19 11.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 14.6C10.5 12.6 13.5 12.6 16 14.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="18" r="1.5" fill="currentColor" /></svg>
  ),
  Ac: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M7 10h10M7 14h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
  ),
  Tv: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M8 21l4-4 4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  Bed: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 7h18v10H3z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 7v-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
  ),
  Hair: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M7 7h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M6 11h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
  ),
  Towel: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M18 7v10" stroke="currentColor" strokeWidth="1.2"/></svg>
  ),
});

// ==================== Thumb component (mobile optimized) ====================
const Thumb = React.memo(function Thumb({ src, index, onSelect, selected, label }) {
  const handleClick = useCallback(() => onSelect(index), [onSelect, index]);
  return (
    <button
      onClick={handleClick}
      type="button"
      className={`relative flex-shrink-0 rounded overflow-hidden border transition transform-gpu focus:outline-none ${selected ? 'ring-2 ring-[#c7a86f] border-[#c7a86f]' : 'border-gray-200'}`}
      style={{ height: 56, width: 84, minWidth: 84 }} // Slightly smaller on mobile
      aria-label={`View image ${index + 1}`}
    >
      <img src={src} alt={`thumb-${index}`} className="w-full h-full object-cover" loading="lazy" decoding="async" />
      {label && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs font-semibold">{label}</div>}
    </button>
  );
});

// ==================== ThumbnailList: mobile optimized scroll ====================
const ThumbnailList = React.memo(function ThumbnailList({ images = [], current, onSelect }) {
  const listRef = useRef(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const child = el.children[current];
    if (!child) return;
    const handle = idle(() => {
      try {
        child.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      } catch (e) {
        /* ignore scroll errors */
      }
    });
    return () => {
      if ('cancelIdleCallback' in window) cancelIdleCallback(handle);
      else clearTimeout(handle);
    };
  }, [current, images.length]);

  const visible = images && images.length > 0;

  return (
    <div className="py-2 px-2">
      <div
        ref={listRef}
        className="flex gap-2 sm:gap-3 items-center overflow-x-auto no-scrollbar py-1"
        style={{ 
          scrollSnapType: 'x mandatory', 
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {!visible ? (
          <div className="w-20 h-14 rounded overflow-hidden bg-gray-200 flex items-center justify-center text-xs text-gray-500">No images</div>
        ) : (
          images.slice(0, 20).map((src, i) => {
            const extra = i === 7 && images.length > 8;
            const label = extra ? `+${images.length - 8}` : null;
            return (
              <div key={i} style={{ scrollSnapAlign: 'center' }}>
                <Thumb src={src} index={i} onSelect={onSelect} selected={i === current} label={label} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
});

// ==================== MainSlider component (mobile touch optimized) ====================
const MainSlider = React.memo(function MainSlider({ images, current, setCurrent, title }) {
  const length = images.length;
  const touchStart = useRef(null);
  const touchEnd = useRef(null);

  const prev = useCallback(() => {
    setCurrent((p) => (length ? (p === 0 ? length - 1 : p - 1) : p));
  }, [length, setCurrent]);

  const next = useCallback(() => {
    setCurrent((p) => (length ? (p === length - 1 ? 0 : p + 1) : p));
  }, [length, setCurrent]);

  // Touch swipe handlers for mobile
  const handleTouchStart = (e) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) next();
    if (isRightSwipe) prev();
  };

  // Preload adjacent images on idle
  useEffect(() => {
    if (!images || images.length <= 1) return;
    const nextIdx = (current + 1) % images.length;
    const prevIdx = (current - 1 + images.length) % images.length;
    const handle = idle(() => {
      const n = new Image(); n.src = images[nextIdx];
      const p = new Image(); p.src = images[prevIdx];
    });
    return () => {
      if ('cancelIdleCallback' in window) cancelIdleCallback(handle);
      else clearTimeout(handle);
    };
  }, [current, images]);

  const main = images[current] || '/no-image.png';

  return (
    <div 
      className="relative h-[40vh] sm:h-[45vh] md:h-[56vh] lg:h-[60vh] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <LazyImage src={main} alt={title} className="w-full h-full" poster="/no-image.png" />

      {images.length > 1 && (
        <>
          <button 
            onClick={prev} 
            aria-label="previous" 
            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 sm:p-3 rounded-full hover:bg-black transition active:scale-95" 
            type="button"
          >
            <FaChevronLeft className="text-sm sm:text-base" />
          </button>
          <button 
            onClick={next} 
            aria-label="next" 
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 sm:p-3 rounded-full hover:bg-black transition active:scale-95" 
            type="button"
          >
            <FaChevronRight className="text-sm sm:text-base" />
          </button>
          
          {/* Image counter for mobile */}
          <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
            {current + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
});

// ==================== AmenityList (mobile grid optimized) ====================
const AmenityList = React.memo(function AmenityList({ amenities = [] }) {
  const mapping = useMemo(() => ({
    wifi: { label: 'High speed WiFi', Icon: Icons.Wifi },
    ac: { label: 'Air conditioner', Icon: Icons.Ac },
    tv: { label: 'Cable TV', Icon: Icons.Tv },
    bed: { label: 'King size bed', Icon: Icons.Bed },
    hairdryer: { label: 'Hair Dryer', Icon: Icons.Hair },
    towels: { label: 'Towels', Icon: Icons.Towel },
  }), []);

  return (
    <div className="mt-6 md:mt-0">
      <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Amenities</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-gray-600">
        {amenities.map((a, i) => {
          const meta = mapping[a] || { label: a, Icon: () => <svg width="16" height="16"><circle cx="8" cy="8" r="7" stroke="currentColor"/></svg> };
          const Icon = meta.Icon;
          return (
            <div key={i} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm p-2 sm:p-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-gray-100 rounded flex-shrink-0">
                <Icon />
              </div>
              <div className="leading-tight">{meta.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

// ==================== BookingSidebar (mobile sticky bottom) ====================
const BookingSidebar = React.memo(function BookingSidebar({ price, roomTitle }) {
  const navigate = useNavigate();

  const goToBooking = () => {
    navigate(`/booking?room=${encodeURIComponent(roomTitle)}`);
  };

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:block bg-[#fafafa] border border-gray-100 rounded-lg p-4 shadow-sm mb-6">
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <div className="text-sm text-gray-600">From</div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900">
              {price ? `₹${price}` : "₹0.00"}
              <span className="text-sm font-normal text-gray-600"> / night</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <button
            onClick={() => window.open("/booking", "_blank")}
            className="w-full sm:flex-1 bg-[#c7a86f] text-white py-2 rounded text-sm font-semibold hover:opacity-95 transition"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Mobile sticky bottom bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-xs text-gray-600">From</div>
            <div className="text-lg font-bold text-gray-900">
              {price ? `₹${price}` : "₹0.00"}
              <span className="text-xs font-normal text-gray-600"> / night</span>
            </div>
          </div>
          <button
            onClick={() => window.open("/booking", "_blank")}
            className="bg-[#c7a86f] text-white px-8 py-3 rounded-lg text-sm font-semibold hover:opacity-95 transition active:scale-95 whitespace-nowrap"
          >
            Book Now
          </button>
        </div>
      </div>
    </>
  );
}); 

// ==================== RoomCard page (main - mobile optimized) ====================
export default function RoomCard() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const fetchRoom = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://lumarisehotel.com/api/rooms/${id}/`, { signal: controller.signal });
        if (!mountedRef.current) return;
        setRoom(res.data);
        setCurrentImage(0);
      } catch (err) {
        if (err.name !== 'CanceledError' && err.name !== 'AbortError') console.error('Error fetching room details:', err);
      } finally {
        if (mountedRef.current) setLoading(false);
      }
    };
    fetchRoom();
    return () => controller.abort();
  }, [id]);

  const images = useMemo(() => {
    if (!room?.images) return [];
    return room.images
      .map(i => (i?.image ? (i.image.startsWith('http') ? i.image : `https://lumarisehotel.com${i.image}`) : null))
      .filter(Boolean);
  }, [room?.images]);

  const amenities = useMemo(() => room?.amenities || ['ac', 'tv', 'wifi', 'bed', 'hairdryer', 'towels'], [room?.amenities]);

  const setImageIfChanged = useCallback((index) => {
    setCurrentImage((prev) => {
      const safeIndex = Math.max(0, Math.min(images.length - 1, index));
      return prev === safeIndex ? prev : safeIndex;
    });
  }, [images.length]);

  if (loading) return <div className="text-center py-10 text-sm sm:text-base">Loading...</div>;
  if (!room) return <div className="text-center py-10 text-sm sm:text-base">Room not found.</div>;

  const mainImage = images[currentImage] || room?.main_image || '/no-image.png';

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white shadow-none md:shadow-xl overflow-hidden md:mt-8">
          <div className="relative bg-gray-100">
            <MainSlider images={images.length ? images : [mainImage]} current={currentImage} setCurrent={setCurrentImage} title={room.title} />

            <div className="px-2 sm:px-4 md:px-6 pb-3 sm:pb-4 -mt-10 sm:-mt-10">
              <div className="bg-white shadow-lg px-1 sm:px-3 py-1 sm:py-2 overflow-hidden rounded-lg" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                <ThumbnailList images={images.length ? images : [mainImage]} current={currentImage} onSelect={setImageIfChanged} />
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 bg-white">
            <div className="md:col-span-2">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 mb-2 sm:mb-3 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                {room.title}
              </h1>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 mb-4 sm:mb-5">
                <div className="inline-flex items-center gap-1">
                  <span className="font-medium text-gray-800">Size:</span> 
                  <span>{room.size || 'N/A'}</span>
                </div>
                <span className="text-gray-400">•</span>
                <div className="inline-flex items-center gap-1">
                  <span className="font-medium text-gray-800">Bed:</span> 
                  <span>{room.bed || 'N/A'}</span>
                </div>
                <span className="text-gray-400">•</span>
                <div className="inline-flex items-center gap-1">
                  <span className="font-medium text-gray-800">Guests:</span> 
                  <span>{room.guests || 'N/A'}</span>
                </div>
              </div>

              <div className="prose max-w-none text-gray-700 mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Description
                </h3>
                <p className="leading-relaxed text-sm sm:text-base">
                  {room.desc || 'No description provided for this room.'}
                </p>
              </div>

              {/* Amenities on mobile (moved here) */}
              <div className="md:hidden border-t border-gray-100 pt-4">
                <AmenityList amenities={amenities} />
              </div>
            </div>

            <aside className="md:col-span-1">
              <BookingSidebar price={room.price} roomTitle={room.title} />

              {/* Amenities on desktop (kept in sidebar) */}
              <div className="hidden md:block">
                <AmenityList amenities={amenities} />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}