import React from "react";

export default function About() {
  return (
    <>
      {/* === ABOUT HERO SECTION === */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#faf7f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
          {/* Left: Image */}
          <div className="relative w-full order-1 md:order-1">
            <img
              src="/about-main.jpg"
              alt="Resort Exterior"
              loading="lazy"
              className="rounded-xl sm:rounded-2xl shadow-lg w-full h-[280px] sm:h-[320px] md:h-[400px] lg:h-[480px] object-cover"
            />
          </div>

          {/* Right: Text Content */}
          <div className="w-full order-2 md:order-2">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-5 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              A Legacy of Comfort and Warmth
            </h2>

            <p
              className="text-sm sm:text-base md:text-lg text-gray-600 mb-3 sm:mb-4 md:mb-6 leading-relaxed"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Lumarise brings you a refined stay experience that blends modern comfort with the calm beauty of Wayanad. Every corner is thoughtfully designed to offer warmth, serenity, and a sense of effortless luxury.
            </p>

            <p
              className="text-sm sm:text-base md:text-lg text-gray-600 mb-5 sm:mb-6 leading-relaxed"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Whether you're here for relaxation, exploration, or a quiet escape from routine, Lumarise ensures comfort, care, and an atmosphere that feels personal and memorable.
            </p>
          </div>
        </div>
      </section>

      {/* === HERITAGE & EXPERIENCE SECTION === */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Our Story & Philosophy
            </h2>
            <p
              className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              At Lumarise, we believe that great hospitality is built on comfort, authenticity, and attention to detail. Our philosophy is simple — create an environment where guests feel valued, relaxed, and truly at home.
            </p>
          </div>

          {/* Three Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            {[
              {
                title: "Authentic Heritage",
                desc: "Our spaces are crafted with warm lighting, natural textures, and modern aesthetics to create a calm, welcoming ambience.",
                icon: "🏡",
              },
              {
                title: "Personalized Comfort",
                desc: "From travel assistance to curated experiences, every guest receives attention that is genuine and uncompromised.",
                icon: "🌿",
              },
              {
                title: "Unforgettable Experiences",
                desc: "Explore Wayanad's landscapes, local culture, and hidden gems with ease — Lumarise ensures your journey is as memorable as your stay.",
                icon: "✨",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-[#faf7f2] hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{item.icon}</div>
                <h3
                  className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2 leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === RATINGS & RECOGNITION SECTION === */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#faf7f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ratings
          </h2>
          <p
            className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-16 px-4 leading-relaxed"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Our guests' happiness is our greatest reward. We're proud to have
            earned recognition for our dedication to hospitality and excellence.
          </p>

          {/* Ratings & Awards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-10 max-w-4xl mx-auto">
            {/* TripAdvisor */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300">
              <img
                src="/tripadvisor.png"
                alt="TripAdvisor"
                className="h-8 sm:h-10 md:h-12 mx-auto mb-3 sm:mb-4 inline-block"
                loading="lazy"
              />
              <h3
                className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                TripAdvisor Traveller's Choice
              </h3>
              <p
                className="text-xs sm:text-sm md:text-base text-gray-600 mb-2 sm:mb-3"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                Rated 4.8/5 by happy travelers
              </p>
              <div className="flex justify-center gap-0.5 sm:gap-1 text-[#f5d36c] text-lg sm:text-xl" aria-hidden>
                <span className="sr-only">5 out of 5 stars</span>
                {"★★★★★"}
              </div>
            </div>

            {/* Google Reviews */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300">
              <img
                src="/google.png"
                alt="Google Reviews"
                className="h-8 sm:h-10 md:h-12 mx-auto mb-3 sm:mb-4 inline-block"
                loading="lazy"
              />
              <h3
                className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Google Reviews
              </h3>
              <p
                className="text-xs sm:text-sm md:text-base text-gray-600 mb-2 sm:mb-3"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                Over 250+ 5-star reviews
              </p>
              <div className="flex justify-center gap-0.5 sm:gap-1 text-[#f5d36c] text-lg sm:text-xl" aria-hidden>
                <span className="sr-only">5 out of 5 stars</span>
                {"★★★★★"}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}