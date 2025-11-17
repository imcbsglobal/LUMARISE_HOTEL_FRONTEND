import React from "react";
import { useNavigate } from "react-router-dom";

export default function ExploreWayanad() {
  const attractions = [
    {
      title: "Soochipara Waterfalls",
      description:
        "A major tourist hotspot surrounded by dense forests, Soochipara Waterfalls offers a refreshing escape with its three-tiered cascade. Ideal for trekking and photography, it's one of the most scenic spots in Wayanad.",
      image: "/soochipara.jpeg",
    },
    {
      title: "Edakkal Caves",
      description:
        "These ancient caves feature prehistoric rock engravings dating back thousands of years. A steep climb rewards you with breathtaking valley views and a deep dive into Wayanad's ancient history.",
      image: "/edakkal.jpeg",
    },
    {
      title: "Banasura Sagar Dam",
      description:
        "India's largest earthen dam, surrounded by lush hills and ideal for speed boating. The scenic islands formed across the reservoir make it a must-visit attraction.",
      image: "/banasura.jpeg",
    },
    {
      title: "Kuruva Island",
      description:
        "A protected river delta with dense bamboo forests, rare species, and serene walking trails. Perfect for nature lovers seeking a quiet retreat.",
      image: "/kuruvadweep.jpeg",
    },
    {
      title: "Chembra Peak",
      description:
        "Wayanad's highest peak, known for its heart-shaped lake 'Hridaya Saras'. A popular trekking destination with stunning views of the Western Ghats.",
      image: "/chembra.jpeg",
    },
    {
      title: "Pookode Lake",
      description:
        "A freshwater lake nestled between forests and hills. Ideal for boating, nature walks, and enjoying Wayanad's serene ambience.",
      image: "/pookode.jpeg",
    },
    {
      title: "Muthanga Wildlife Sanctuary",
      description:
        "Part of the Nilgiri Biosphere Reserve, this sanctuary is home to elephants, tigers, deer, and numerous bird species. Jeep safaris offer close encounters with wildlife.",
      image: "/muthanga.jpeg",
    },
    {
      title: "Meenmutty Waterfalls",
      description:
        "A powerful three-tiered waterfall accessible via a thrilling trek. One of the most impressive and adventurous spots in Wayanad.",
      image: "/meenmutty.jpeg",
    },
  ];

  const navigate = useNavigate();

  return (
    <section className="bg-[#f9f9f7] py-12 sm:py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 leading-tight px-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Explore Wayanad's Top Attractions
          </h2>
          <p
            className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto px-4"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            From lush forests to ancient caves and misty mountains — every corner of Wayanad offers something unique. Discover the natural beauty and cultural heritage that make this destination unforgettable.
          </p>
        </div>

        {/* Attractions List */}
        <div className="space-y-10 sm:space-y-12 md:space-y-16 lg:space-y-20">
          {attractions.map((spot, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-center ${
                index % 2 === 1 ? "md:direction-reverse" : ""
              }`}
              style={
                index % 2 === 1 && window.innerWidth >= 768
                  ? { direction: "rtl" }
                  : {}
              }
            >
              {/* Image */}
              <div 
                className="overflow-hidden rounded-xl sm:rounded-2xl shadow-lg"
                style={
                  index % 2 === 1 && window.innerWidth >= 768
                    ? { direction: "ltr" }
                    : {}
                }
              >
                <img
                  src={spot.image}
                  alt={spot.title}
                  loading="lazy"
                  className="object-cover w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] transform transition-transform duration-700 hover:scale-110"
                />
              </div>

              {/* Content */}
              <div
                className="px-2 sm:px-0"
                style={
                  index % 2 === 1 && window.innerWidth >= 768
                    ? { direction: "ltr" }
                    : {}
                }
              >
                <h3
                  className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-[#c7a86f] leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {spot.title}
                </h3>
                <p
                  className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  {spot.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}