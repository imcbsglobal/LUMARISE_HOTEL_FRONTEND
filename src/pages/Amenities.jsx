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
      title: "Hot Water & Clean Facilities",
      desc: "24/7 hot water, premium towels, hair-dryer, and spotless bathrooms in all 33 rooms.",
    },
    {
      icon: <FaBolt className="text-2xl sm:text-3xl text-black" />,
      title: "AC & Power Backup",
      desc: "Air-conditioned rooms with uninterrupted power supply ensuring comfort throughout your stay.",
    },
    {
      icon: <FaWifi className="text-2xl sm:text-3xl text-black" />,
      title: "High-Speed Wi-Fi",
      desc: "Complimentary high-speed Wi-Fi throughout the property for seamless connectivity.",
    },
    {
      icon: <FaCar className="text-2xl sm:text-3xl text-black" />,
      title: "Private Parking",
      desc: "Spacious, secure private parking available for all guests at no extra charge.",
    },
    {
      icon: <FaVideo className="text-2xl sm:text-3xl text-black" />,
      title: "CCTV Security",
      desc: "24/7 CCTV surveillance ensuring complete safety and peace of mind for families and groups.",
    },
    {
      icon: <FaBroom className="text-2xl sm:text-3xl text-black" />,
      title: "Daily Housekeeping",
      desc: "Professional daily housekeeping service maintaining cleanliness and comfort in every room.",
    },
    {
      icon: <FaPlaneArrival className="text-2xl sm:text-3xl text-black" />,
      title: "Pick-up Service",
      desc: "Convenient airport and station pick-up service available on request for hassle-free arrival.",
    },
    {
      icon: <FaPlaneDeparture className="text-2xl sm:text-3xl text-black" />,
      title: "Drop-off Service",
      desc: "Reliable drop-off service to railway station, airport, or tourist destinations across Wayanad.",
    },
    {
      icon: <FaUsers className="text-2xl sm:text-3xl text-black" />,
      title: "Tourist Assistance",
      desc: "Easy access to Wayanad's top attractions with travel guidance and tour support from our team.",
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
      <Title>Premium Room Amenities – Lumarise Residency Sulthan Bathery</Title>
      <Meta
        name="description"
        content="rooms with AC, high-speed Wi-Fi, king-size beds, cable TV, towels, hair-dryer, hot water, parking, CCTV security at Lumarise Residency, Sulthan Bathery, Wayanad."
      />
      <Meta
        name="keywords"
        content="AC rooms Wayanad, king-size beds Sulthan Bathery, WiFi accommodation Wayanad, cable TV rooms, premium facilities, parking Wayanad, room amenities Sulthan Bathery"
      />
      <Meta property="og:title" content="Premium Room Amenities – Lumarise Residency" />
      <Meta
        property="og:description"
        content="Modern rooms with AC, Wi-Fi, king-size beds, and premium facilities. Experience comfort and convenience at Lumarise Residency."
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
