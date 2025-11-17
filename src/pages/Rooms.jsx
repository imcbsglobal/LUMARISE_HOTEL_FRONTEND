import React, { useEffect, useState, useRef, useCallback, memo } from "react";
import { FaBed, FaCalendarAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

/**
 * Small Image component that waits until element is in viewport before setting src.
 * Uses native decoding and loading hints.
 */
const LazyImage = memo(function LazyImage({ src, alt, className, placeholder }) {
  const imgRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!imgRef.current) return;
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
        { rootMargin: "200px" }
      );
      io.observe(imgRef.current);
      return () => io.disconnect();
    } else {
      // fallback: just load
      setVisible(true);
    }
  }, []);

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: "#f3f3f3" }}
    >
      {visible ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: loaded ? "none" : "scale(1.02)",
            transition: "transform 450ms ease, opacity 300ms ease",
            opacity: loaded ? 1 : 0.6,
            willChange: "transform, opacity",
          }}
        />
      ) : (
        // placeholder box (keeps layout stable)
        <div style={{ width: "100%", height: "100%" }}>
          {placeholder ? <img src={placeholder} alt="placeholder" /> : null}
        </div>
      )}
    </div>
  );
});

export default function Rooms() {
  const [roomData, setRoomData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [guests, setGuests] = useState("");
  const abortRef = useRef(null);

  // Handle WhatsApp message
  const handleCheckAvailability = () => {
    const phoneNumber = "918606033337"; // WhatsApp number with country code
    
    // Build the message
    let message = "Hi, I would like to check availability";
    
    if (selectedRoom) {
      message += `\n\nRoom Type: ${selectedRoom}`;
    }
    if (checkInDate) {
      message += `\nCheck-in Date: ${checkInDate}`;
    }
    if (guests) {
      message += `\nNumber of Guests: ${guests}`;
    }
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");
  };

  // Fetch rooms with AbortController and caching hint
  useEffect(() => {
    const controller = new AbortController();
    abortRef.current = controller;
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://127.0.0.1:8000/api/rooms/", {
          signal: controller.signal,
          // If your backend supports it, you can use cache: "force-cache" in fetch options for repeated visits
        });
        const data = await res.json();
        const roomsArray = Array.isArray(data) ? data : data.results || [];
        setRoomData(roomsArray);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching rooms:", error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
    return () => {
      controller.abort();
    };
  }, []);

  // If you expect many rooms, consider virtualization (react-window/react-virtual).
  // For moderate counts (<= 30-50) this grid with lazy-loading images is enough.

  return (
    <div className="bg-[#faf7f2]">
      {/* Hero Section */}
      <div className="relative">
        <img
          src="/rooms-hero.jpg"
          alt="Rooms Hero"
          className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh] object-cover"
          loading="eager"
          decoding="async"
          style={{ imageRendering: "auto" }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-35 flex items-center justify-center px-4">
          <h1
            className="text-white text-3xl sm:text-4xl md:text-6xl font-bold tracking-widest text-center"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our Rooms
          </h1>
        </div>
      </div>

      {/* Availability Filter */}
      <section className="relative -mt-12 sm:-mt-14 md:-mt-16 z-10 px-4">
        <div className="bg-white shadow-xl max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-5 md:py-6 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full md:w-1/3">
            <FaBed className="text-gray-600 text-lg flex-shrink-0" />
            <div className="w-full">
              <label className="block text-gray-700 text-xs sm:text-sm font-medium mb-1">
                Room Type
              </label>
              <select 
                className="w-full border-b border-gray-400 bg-transparent focus:outline-none py-1 text-sm sm:text-base"
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
              >
                <option>Choose</option>
                {roomData.map((room, i) => (
                  <option key={i}>{room.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-1/3">
            <FaCalendarAlt className="text-gray-600 text-lg flex-shrink-0" />
            <div className="w-full">
              <label className="block text-gray-700 text-xs sm:text-sm font-medium mb-1">
                When
              </label>
              <input
                type="date"
                className="w-full border-b border-gray-400 bg-transparent focus:outline-none py-1 text-sm sm:text-base"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-1/3">
            <FaUser className="text-gray-600 text-lg flex-shrink-0" />
            <div className="w-full">
              <label className="block text-gray-700 text-xs sm:text-sm font-medium mb-1">
                Guests
              </label>
              <input
                type="number"
                placeholder="0"
                className="w-full border-b border-gray-400 bg-transparent focus:outline-none py-1 text-sm sm:text-base"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full md:w-auto">
            <button 
              onClick={handleCheckAvailability}
              className="w-full md:w-auto bg-black text-white px-6 md:px-8 py-3 uppercase tracking-wider text-xs sm:text-sm font-semibold hover:bg-[#c7a86f] transition-all duration-300 min-h-[48px]"
            >
              Check Availability
            </button>
          </div>
        </div>
      </section>

      {/* Room Grid Section */}
      <section className="text-center py-10 sm:py-12 md:py-20">
        <h2
          className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 px-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Choose Your Stay
        </h2>

        <div className="w-full px-4 sm:px-6 md:px-8 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {loading ? (
            <p className="text-gray-600 text-base sm:text-lg col-span-full">Loading rooms…</p>
          ) : roomData.length === 0 ? (
            <p className="text-gray-600 text-base sm:text-lg col-span-full">
              No rooms available. Please check back later.
            </p>
          ) : (
            roomData.map((room) => {
              // pick image with fallback
              const imageSrc =
                (room.main_image && room.main_image) ||
                (room.images && room.images[0] && room.images[0].image) ||
                "/no-image.png";

              return (
                <article
                  key={room.id}
                  className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
                >
                  {/* Room Image */}
                  <div className="relative w-full h-48 sm:h-52 md:h-56 overflow-hidden">
                    <LazyImage
                      src={imageSrc}
                      alt={room.title}
                      className="w-full h-full"
                      // optional placeholder — small blurry image path if you have one
                      placeholder="/no-image.png"
                    />

                    {/* Overlay + View Button */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center">
                      <Link
                        to={`/room/${room.id}`}
                        className="bg-white text-black px-4 py-2 uppercase tracking-widest text-xs sm:text-sm font-semibold hover:bg-[#c7a86f] hover:text-white transition-all duration-300"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>

                  {/* Room Info */}
                  <div className="p-4 md:p-6 text-left">
                    <h3
                      className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-1"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {room.title}
                    </h3>
                    <p
                      className="text-xs sm:text-sm text-gray-600 italic tracking-wide"
                      style={{ fontFamily: "'Lato', sans-serif" }}
                    >
                      {room.size ? `${room.size}` : "Size N/A"}{" "}
                      {room.bed ? `· ${room.bed}` : ""}{" "}
                      {room.view ? `· ${room.view}` : ""}
                    </p>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}