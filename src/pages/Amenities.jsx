import React from "react";
import {
  FaWifi,
  FaBolt,
  FaBath,
  FaCarSide,
  FaCar,
  FaVideo,
  FaBroom,
  FaPlaneArrival,
  FaPlaneDeparture,
  FaMapMarkedAlt,
  FaUsers,
} from "react-icons/fa";
import { Title, Meta } from "react-head";

export default function Amenities() {
  const facilities = [
    {
      icon: <FaBath className="text-2xl sm:text-3xl text-black" />,
      title: "Hot Water",
      desc: "24/7 hot water available for all rooms.",
    },
    {
      icon: <FaBolt className="text-2xl sm:text-3xl text-black" />,
      title: "Power Backup",
      desc: "Uninterrupted electricity with full power backup.",
    },
    {
      icon: <FaWifi className="text-2xl sm:text-3xl text-black" />,
      title: "Free Wi-Fi",
      desc: "High-speed Wi-Fi access throughout the property.",
    },
    {
      icon: <FaCar className="text-2xl sm:text-3xl text-black" />,
      title: "Private Parking",
      desc: "Secure private parking for all guests.",
    },
    {
      icon: <FaVideo className="text-2xl sm:text-3xl text-black" />,
      title: "CCTV Security",
      desc: "24/7 surveillance ensuring complete guest safety.",
    },
    {
      icon: <FaBroom className="text-2xl sm:text-3xl text-black" />,
      title: "Housekeeping",
      desc: "Daily housekeeping to keep your stay comfortable.",
    },
    {
      icon: <FaPlaneArrival className="text-2xl sm:text-3xl text-black" />,
      title: "Pick-up Service",
      desc: "Convenient pick-up service for guests upon request.",
    },
    {
      icon: <FaPlaneDeparture className="text-2xl sm:text-3xl text-black" />,
      title: "Drop-off Service",
      desc: "Safe and timely drop-off service available.",
    },
    {
      icon: <FaUsers className="text-2xl sm:text-3xl text-black" />,
      title: "Tourist Access",
      desc: "Easy access to nearby attractions and activities.",
    },
  ];

  const experienceImages = [
    "/restaurant.jpg",
    "/spa.jpg",
    "/golf.webp",
    "/event.webp",
  ];

  return (
    <>
      {/* ================= SEO TAGS ================= */}
      <Title>Amenities at Lumarise Residency – Sultan Bathery, Wayanad</Title>
      <Meta
        name="description"
        content="Explore amenities at Lumarise Residency including hot water, free Wi-Fi, private parking, CCTV security, housekeeping and pickup/drop services."
      />
      <Meta
        name="keywords"
        content="Lumarise amenities, hotel facilities Sultan Bathery, WiFi hotel Wayanad, parking, CCTV, pickup drop Wayanad"
      />
      <Meta property="og:title" content="Amenities – Lumarise Residency" />
      <Meta
        property="og:description"
        content="Comfortable stay with essential and premium amenities at Lumarise Residency in Sultan Bathery."
      />
      <Meta property="og:url" content="https://lumarisehotel.com/amenities" />
      <Meta property="og:type" content="website" />

      {/* ================= PAGE CONTENT ================= */}
      <div className="bg-[#faf7f2] text-gray-800">
        {/* Hero Section */}
        <section
          className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: "url('/discover3.webp')" }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 text-center text-white px-4 sm:px-6">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide mb-3 sm:mb-4 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              World-Class Amenities
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed px-2">
              Experience luxury, comfort, and personalized hospitality in every corner of Lumarise.
            </p>
          </div>
        </section>

        {/* Facilities Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-24 bg-[#fdfbf8]">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 sm:mb-10 md:mb-12 text-center md:text-left"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Facilities & Services
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            {facilities.map((item, i) => (
              <div key={i} className="text-center group">
                <div className="bg-[#f5d36c] hover:bg-[#e0c45a] active:bg-[#d3af44] w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 flex items-center justify-center rounded-full mx-auto mb-4 sm:mb-5 md:mb-6 transition-all duration-300 group-hover:scale-110 active:scale-105">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-lg sm:text-xl mb-2 leading-tight">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed px-2">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Discover Luxury Section */}
        <section
          className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-cover bg-center"
          style={{
            backgroundColor: "#fafafaff",
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                rgba(212,175,55,0.25) 0px,
                rgba(212,175,55,0.25) 2px,
                transparent 2px,
                transparent 40px
              ),
              repeating-linear-gradient(
                -45deg,
                rgba(212,175,55,0.25) 0px,
                rgba(212,175,55,0.25) 2px,
                transparent 2px,
                transparent 40px
              )
            `,
            backgroundSize: "60px 60px",
          }}
        >
          <div className="relative z-10 text-center mb-8 sm:mb-12 md:mb-16 px-4">
            <h3
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-gray-900"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              World-Class Experiences
            </h3>
          </div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 px-4 sm:px-6 md:px-12 lg:px-24">
            {experienceImages.map((img, i) => (
              <div
                key={i}
                className="rounded-lg sm:rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 aspect-[4/3] sm:aspect-auto sm:h-64 md:h-80 lg:h-96"
              >
                <img
                  src={img}
                  alt={`Experience ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
