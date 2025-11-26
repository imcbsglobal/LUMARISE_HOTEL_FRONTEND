import React, { useEffect, useState, useRef, memo } from "react";
import { FaBed, FaCalendarAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Title, Meta } from "react-head";

/**
 * Lazy image component
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
            transition: "transform 450ms ease, opacity 350ms ease",
            opacity: loaded ? 1 : 0.5,
          }}
        />
      ) : (
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

  const handleCheckAvailability = () => {
    const phoneNumber = "918606033337";
    let message = "Hi, I would like to check availability";

    if (selectedRoom) message += `\nRoom Type: ${selectedRoom}`;
    if (checkInDate) message += `\nCheck-in Date: ${checkInDate}`;
    if (guests) message += `\nGuests: ${guests}`;

    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  useEffect(() => {
    const controller = new AbortController();
    abortRef.current = controller;

    const fetchRooms = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://lumarisehotel.com/api/rooms/", {
          signal: controller.signal,
        });
        const data = await res.json();
        const roomsArray = Array.isArray(data) ? data : data.results || [];
        setRoomData(roomsArray);
      } catch (error) {
        if (error.name !== "AbortError") console.error("Room fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
    return () => controller.abort();
  }, []);

  return (
    <>
      {/* ===================== SEO Meta ===================== */}
      <Title>Rooms at Lumarise Residency – Luxury Stay in Sultan Bathery, Wayanad</Title>
      <Meta
        name="description"
        content="Explore premium rooms at Lumarise Residency in Sultan Bathery, Wayanad. Book deluxe, executive and suite rooms with modern facilities."
      />
      <Meta
        name="keywords"
        content="rooms in Sultan Bathery, Wayanad hotels, deluxe rooms Wayanad, suite rooms bathery, Lumarise rooms list, hotel booking Wayanad"
      />
      <Meta property="og:title" content="Rooms – Lumarise Residency | Sultan Bathery" />
      <Meta
        property="og:description"
        content="Choose the perfect room for your luxury stay at Lumarise Residency with modern comfort and easy booking."
      />
      <Meta property="og:url" content="https://lumarisehotel.com/rooms" />
      <Meta property="og:type" content="website" />

      {/* ===================== PAGE CONTENT ===================== */}
      <div className="bg-[#faf7f2]">
        {/* Hero Section */}
        <div className="relative">
          <img
            src="/rooms-hero.webp"
            alt="Rooms at Lumarise Residency Wayanad"
            className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh] object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1
              className="text-white text-3xl sm:text-4xl md:text-6xl font-bold tracking-widest"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Our Rooms
            </h1>
          </div>
        </div>

        {/* Availability Filter */}
        <section className="relative -mt-12 sm:-mt-14 md:-mt-16 z-10 px-4">
          <div className="bg-white shadow-xl max-w-6xl mx-auto px-6 py-6 rounded-lg flex flex-col md:flex-row gap-4 md:items-center justify-between">
            <div className="flex items-center gap-3 w-full md:w-1/3">
              <FaBed className="text-gray-600 text-lg" />
              <div className="w-full">
                <label className="block mb-1 text-sm font-medium text-gray-700">Room Type</label>
                <select
                  className="w-full border-b border-gray-400 bg-transparent focus:outline-none py-1"
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                >
                  <option>Choose</option>
                  {roomData.map((room) => (
                    <option key={room.id}>{room.title}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-1/3">
              <FaCalendarAlt className="text-gray-600 text-lg" />
              <div className="w-full">
                <label className="block mb-1 text-sm font-medium text-gray-700">When</label>
                <input
                  type="date"
                  className="w-full border-b border-gray-400 bg-transparent focus:outline-none py-1"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-1/3">
              <FaUser className="text-gray-600 text-lg" />
              <div className="w-full">
                <label className="block mb-1 text-sm font-medium text-gray-700">Guests</label>
                <input
                  type="number"
                  placeholder="0"
                  className="w-full border-b border-gray-400 bg-transparent focus:outline-none py-1"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={handleCheckAvailability}
              className="bg-black text-white px-6 py-3 uppercase tracking-wide font-semibold hover:bg-[#c7a86f] transition-all"
            >
              Check Availability
            </button>
          </div>
        </section>

        {/* Rooms Grid */}
        <section className="text-center py-12 md:py-20">
          <h2
            className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-8"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Choose Your Stay
          </h2>

          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading ? (
              <p className="text-gray-600">Loading rooms…</p>
            ) : roomData.length === 0 ? (
              <p className="text-gray-600">No rooms available.</p>
            ) : (
              roomData.map((room) => {
                const imageSrc =
                  room.main_image ||
                  (room.images && room.images[0] && room.images[0].image) ||
                  "/no-image.png";

                return (
                  <article
                    key={room.id}
                    className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                  >
                    <div className="w-full h-52 overflow-hidden">
                      <LazyImage src={imageSrc} alt={room.title} className="w-full h-full" placeholder="/no-image.png" />
                    </div>

                    <div className="p-5 text-left">
                      <h3 className="text-xl font-semibold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {room.title}
                      </h3>
                      <p className="text-sm text-gray-600 italic mt-1">
                        {room.size || "Size N/A"}{" "}
                        {room.bed ? `· ${room.bed}` : ""} {room.view ? `· ${room.view}` : ""}
                      </p>
                      <div className="mt-4">
                        <Link
                          to={`/room/${room.id}`}
                          className="inline-block bg-black text-white px-4 py-2 text-xs tracking-wider uppercase hover:bg-[#c7a86f] transition-all"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </section>
      </div>
    </>
  );
}
