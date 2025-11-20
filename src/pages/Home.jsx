import React, { useEffect, useState, useRef, memo } from "react";
import HeroSection from "../components/HeroSection";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
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
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { useNavigate, Link } from "react-router-dom";
import GalleryGrid from "../components/GalleryGrid";

// ✅ Optimized LazyImage Component
const LazyImage = memo(function LazyImage({
  src,
  alt = "",
  className = "",
  poster = "/no-image.png",
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

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
        { rootMargin: "300px" }
      );
      io.observe(ref.current);
      return () => io.disconnect();
    } else {
      setVisible(true);
    }
  }, []);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: "#f7f7f7" }}
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
            transition: "opacity 300ms ease, transform 450ms ease",
            opacity: loaded ? 1 : 0.7,
            transform: loaded ? "none" : "scale(1.01)",
            willChange: "opacity, transform",
            backfaceVisibility: "hidden",
          }}
        />
      ) : (
        <img
          src={poster}
          alt="placeholder"
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
});

export default function Home() {
  const [testimonials, setTestimonials] = useState([]);
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  // ✅ Fetch testimonials
  useEffect(() => {
    const controller = new AbortController();
    axios
      .get("https://lumarisehotel.com/api/testimonials/", {
        signal: controller.signal,
      })
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.results || res.data.data || [];
        setTestimonials(data);
      })
      .catch((err) => {
        if (err.name !== "CanceledError" && err.name !== "AbortError")
          console.error("Error fetching testimonials:", err);
      });
    return () => controller.abort();
  }, []);

  // ✅ Fetch rooms
  useEffect(() => {
    const controller = new AbortController();
    const fetchRooms = async () => {
      try {
        const res = await axios.get("https://lumarisehotel.com/api/rooms/", {
          signal: controller.signal,
        });
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.results || [];
        setRooms(data);
      } catch (err) {
        if (err.name !== "CanceledError" && err.name !== "AbortError")
          console.error("Error fetching rooms:", err);
      }
    };
    fetchRooms();
    return () => controller.abort();
  }, []);

  const facilities = [
    {
      icon: <FaBath className="text-3xl text-black" />,
      title: "Hot Water",
      desc: "24/7 hot water available for all rooms.",
    },
    {
      icon: <FaBolt className="text-3xl text-black" />,
      title: "Power Backup",
      desc: "Uninterrupted electricity with full power backup.",
    },
    {
      icon: <FaWifi className="text-3xl text-black" />,
      title: "Free Wi-Fi",
      desc: "High-speed Wi-Fi access throughout the property.",
    },
    {
      icon: <FaCar className="text-3xl text-black" />,
      title: "Private Parking",
      desc: "Secure private parking for all guests.",
    },
    {
      icon: <FaVideo className="text-3xl text-black" />,
      title: "CCTV Security",
      desc: "24/7 surveillance ensuring complete guest safety.",
    },
    {
      icon: <FaBroom className="text-3xl text-black" />,
      title: "Housekeeping",
      desc: "Daily housekeeping to keep your stay comfortable.",
    },
    {
      icon: <FaPlaneArrival className="text-3xl text-black" />,
      title: "Pick-up Service",
      desc: "Convenient pick-up service for guests upon request.",
    },
    {
      icon: <FaPlaneDeparture className="text-3xl text-black" />,
      title: "Drop-off Service",
      desc: "Safe and timely drop-off service available.",
    },
    {
      icon: <FaUsers className="text-3xl text-black" />,
      title: "Tourist Access",
      desc: "Easy access to nearby attractions and activities.",
    },
  ];

  const exploreWayanad = [
    { img: "/soochipara.jpeg", title: "Soochipara Waterfalls" },
    { img: "/edakkal.jpeg", title: "Edakkal Caves" },
    { img: "/banasura.jpeg", title: "Banasura Sagar Dam" },
    { img: "/kuruvadweep.jpeg", title: "Kuruva Island" },
    { img: "/chembra.jpeg", title: "Chembra Peak" },
    { img: "/pookode.jpeg", title: "Pookode Lake" },
    { img: "/muthanga.jpeg", title: "Muthanga Wildlife Sanctuary" },
    { img: "/meenmutty.jpeg", title: "Meenmutty Waterfalls" },
  ];

  return (
    <>
      <HeroSection />

      {/* Luxury Intro Section */}

      <section className="py-16 md:py-24 bg-[#f9f9f7]">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Text */}
          <div data-aos="fade-up" className="text-center lg:text-left">
            <p
              className="text-3xl md:text-4xl tracking-[0.15em] text-[#c7a86f] mb-4"
              style={{ fontFamily: "'Cookie',cursive" }}
            >
              Welcome to Lumarise
            </p>

            <h2
              data-aos="fade-up"
              data-aos-delay="150"
              className="text-3xl md:text-5xl font-bold leading-snug text-gray-900 mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Finest Luxury Hotels <br /> & Resort
            </h2>

            <p
              data-aos="fade-up"
              data-aos-delay="250"
              className="text-gray-600 leading-relaxed mb-6"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Lumarise Hotels & Resorts is a distinguished collection of luxury escapes chosen for their rich heritage, enviable locations, and personalized guest experience. Our property in Sulthan Bathery, Wayanad, reflects this philosophy—each destination telling its own story through architecture, history, and timeless charm.
            </p>

            <p
              data-aos="fade-up"
              data-aos-delay="350"
              className="text-gray-600 leading-relaxed mb-10"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              This is the Lumarise legacy: distinctive hotels in coveted destinations, crafted by people devoted to the art of hospitality.
            </p>

            <button
              data-aos="fade-up"
              data-aos-delay="450"
              onClick={() => navigate("/about")}
              className="bg-[#f5d36c] hover:bg-[#e0c45a] text-black px-8 py-3 uppercase tracking-widest text-sm font-semibold transition-all duration-300 shadow-md"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              See More
            </button>
          </div>

          {/* Right Image - Static Amoeba Shape with Hover Zoom */}
          <div className="flex justify-center items-center">
            <div 
              className="relative w-full max-w-[650px] h-[500px] overflow-hidden shadow-2xl cursor-pointer"
            >
              <LazyImage
                src="/hero1.jpg"
                alt="Luxury Room"
                className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-110"
              />
            </div>
          </div>

          {/* Commented out original grid layout */}
          {/* <div className="grid grid-cols-2 gap-4 md:gap-5 auto-rows-[200px] md:auto-rows-[275px]"> */}
            {/* Left tall image */}
            {/* <div className="col-span-1 row-span-2 overflow-hidden shadow-lg transform transition-all duration-700 hover:scale-105">
              <LazyImage
                src="/event.jpg"
                alt="Luxury Poolside View"
                className="w-full h-full object-cover"
              />
            </div> */}

            {/* Top right */}
            {/* <div className="overflow-hidden shadow-md transform transition-all duration-700 hover:scale-105">
              <LazyImage
                src="/about2.jpg"
                alt="Resort Evening"
                className="w-full h-full object-cover"
              />
            </div> */}

            {/* Bottom right */}
            {/* <div className="overflow-hidden shadow-md transform transition-all duration-700 hover:scale-105">
              <LazyImage
                src="/hero1.jpg"
                alt="Luxury Room"
                className="w-full h-full object-cover"
              />
            </div> */}
          {/* </div> */}
        </div>
      </section>

      {/* === Room Slider === */}
      <section className="bg-white py-16 md:py-24">
        <div className="text-center mb-12 px-4">
          <p
            className="text-3xl md:text-4xl tracking-[0.15em] text-[#c7a86f] mb-4"
            style={{ fontFamily: "'Cookie',cursive" }}
          >
            Accommodation
          </p>
          <h2
            className="text-4xl md:text-5xl font-semibold tracking-wide"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            CHOOSE YOUR STAY
          </h2>
        </div>

        {rooms.length > 0 && (
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            spaceBetween={20}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop={rooms.length >= 3}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 25 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
            className="max-w-7xl mx-auto px-4"
          >
            {rooms.map((room, index) => {
              const imageSrc =
                room.main_image ||
                (room.images &&
                  room.images.length > 0 &&
                  room.images[0].image) ||
                "/no-image.png";

              return (
                <SwiperSlide key={room.id || index}>
                  <article className="relative group overflow-hidden shadow-lg cursor-pointer rounded-2xl">
                    <LazyImage
                      src={imageSrc}
                      alt={room.title || "Room"}
                      className="w-full h-[420px] md:h-[500px] object-cover"
                      poster="/no-image.png"
                    />

                    {/* Overlay with button */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none rounded-2xl">
                      <Link
                        to={`/room/${room.id}`}
                        className="pointer-events-auto bg-white text-black px-6 py-2 uppercase tracking-widest text-sm font-semibold transition-all duration-300 hover:bg-[#c7a86f] hover:text-white"
                      >
                        View Detail
                      </Link>
                    </div>

                    {/* Info Card */}
                    <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-95 p-4 md:p-6 rounded-b-2xl">
                      <h3
                        className="text-base md:text-lg font-semibold tracking-wide mb-2"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {room.title}
                      </h3>
                      <p className="text-sm text-gray-800">
                        From{" "}
                        <span className="text-[#c7a86f] font-medium">
                          {room.price}
                        </span>{" "}
                        /night
                      </p>
                    </div>
                  </article>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </section>

      {/* Facilities & Services Section */}
      <section className="py-16 md:py-24 bg-[#f9f9f7] border-t border-gray-200">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Title */}
          <div
            data-aos="fade-up"
            className="lg:col-span-1 text-center lg:text-left"
          >
            <p
              className="text-3xl md:text-4xl tracking-[0.15em] text-[#c7a86f] mb-4"
              style={{ fontFamily: "'Cookie',cursive" }}
            >
              Services
            </p>
            <h2
              className="text-3xl md:text-5xl font-bold text-gray-900  mb-8 md:mb-10"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Facilities & Service
            </h2>
            <button
              data-aos="fade-up"
              data-aos-delay="450"
              onClick={() => navigate("/amenities")}
              className="bg-[#f5d36c] hover:bg-[#e0c45a] text-black px-8 py-3 uppercase tracking-widest text-sm font-semibold transition-all duration-300 shadow-md"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              More Serivices
            </button>
          </div>

          {/* Right Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
            {facilities.map((facility, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="flex flex-col items-center text-center group"
              >
                {/* Icon */}
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-[#f5d36c] rounded-full w-14 h-14 mx-auto top-0 left-1/2 -translate-x-1/2 group-hover:scale-110 transition-transform duration-300"></div>
                  <div className="relative flex items-center justify-center w-14 h-14">
                    {facility.icon}
                  </div>
                </div>

                {/* Text */}
                <h3
                  className="text-base md:text-lg font-semibold text-gray-900 mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {facility.title}
                </h3>
                <p
                  className="text-gray-600 text-sm leading-relaxed"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  {facility.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discover Section Slider */}
      <section className="bg-[#f9f9f7] py-16 md:py-24">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="w-full h-[600px] md:h-[700px] transition-all duration-1000"
        >
          {[
            {
              image: "/discover1.jpg",
              title: "Discover A Place",
              text: "Our hotel's central location offers easy access to the city's most iconic attractions, premium shopping, fine dining, and vibrant nightlife.",
            },
            {
              image: "/discover2.jpg",
              title: "Stay in Style",
              text: "Experience world-class interiors and breathtaking views from every suite, curated for the modern traveler.",
            },
            {
              image: "/contact-bg.jpg",
              title: "Unmatched Comfort",
              text: "Relax and rejuvenate in spacious rooms designed with contemporary elegance and luxury amenities.",
            },
          ].map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full flex flex-col lg:flex-row items-stretch overflow-hidden">
                {/* Left Image */}
                <div className="relative w-full lg:w-2/3 h-[350px] md:h-[700px] overflow-hidden">
                  <LazyImage
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover transform scale-105 transition-transform duration-[4000ms] ease-out hover:scale-110"
                  />

                  {/* Floating Text Box */}
                  <div
                    className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10 lg:right-auto bg-white/90 backdrop-blur-sm shadow-2xl p-6 md:p-10 max-w-lg animate-fadeInUp"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <h3
                      className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {slide.title}
                    </h3>
                    <p
                      className="text-gray-600 leading-relaxed text-sm md:text-base"
                      style={{ fontFamily: "'Lato', sans-serif" }}
                    >
                      {slide.text}
                    </p>
                  </div>
                </div>

                {/* Right Text */}
                <div
                  className="w-full lg:w-1/3 flex flex-col justify-center px-8 py-12 md:px-12 bg-[#f9f9f7] animate-fadeInRight"
                  data-aos="fade-left"
                  data-aos-delay="300"
                >
                  <p
                    className="text-3xl md:text-4xl tracking-[0.15em] text-[#c7a86f] mb-4"
                    style={{ fontFamily: "'Cookie',cursive" }}
                  >
                    Why Choose Us
                  </p>
                  <h2
                    className="text-4xl md:text-5xl font-bold leading-snug text-gray-900 mb-8 md:mb-10"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Top Reasons <br /> To Stay
                  </h2>

                  <button
                    data-aos="fade-up"
                    data-aos-delay="450"
                    onClick={() => navigate("/amenities")}
                    className="bg-[#f5d36c] hover:bg-[#e0c45a] text-black px-8 py-3 uppercase tracking-widest text-sm font-semibold transition-all duration-300 shadow-md"
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  >
                    Discover More
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* === GALLERY SECTION === */}
      <section className="py-16 md:py-24 bg-[#f9f9f7]">
        <div className="text-center mb-12 px-4">
          <p
            className="text-3xl md:text-4xl tracking-[0.15em] text-[#c7a86f] mb-4"
            style={{ fontFamily: "'Cookie', cursive" }}
          >
            Gallery
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold text-gray-900"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Discover Our World
          </h2>
        </div>

        <GalleryGrid />
      </section>

      {/* === TESTIMONIALS SECTION === */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="max-w-5xl mx-auto text-center px-6">
          {/* Section Heading */}
          <div className="text-center mb-12">
            <p
              className="text-3xl md:text-4xl tracking-[0.15em] text-[#c7a86f] mb-4"
              style={{ fontFamily: "'Cookie', cursive" }}
            >
              Testimonials
            </p>
            <h2
              className="text-3xl md:text-5xl font-bold text-gray-900"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              What Our Guests Say
            </h2>
          </div>

          {/* Swiper Slider - Fixed Loop Warning */}
          {testimonials.length > 0 && (
            <Swiper
              modules={[Pagination, Navigation, Autoplay]}
              slidesPerView={1}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation
              loop={testimonials.length >= 3}
              className="relative"
            >
              {testimonials.map((t, index) => (
                <SwiperSlide key={index}>
                  <div className="flex flex-col items-center text-center px-4">
                    <div className="flex justify-center mb-8">
                      <LazyImage
                        src={t.avatar}
                        alt={t.name || "Guest"}
                        className="w-20 h-20 rounded-full border-4 border-white object-cover shadow-md"
                      />
                    </div>
                    <blockquote className="text-xl md:text-xl text-gray-800 leading-relaxed mb-10 font-medium">
                      "{t.comment || "No feedback provided."}"
                    </blockquote>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-[2px] bg-[#c7a86f] mb-4"></div>
                      <p className="font-semibold text-gray-900">
                        {t.name || t.client_name || "Anonymous"}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {testimonials.length === 0 && (
            <p className="text-gray-500 text-lg">No testimonials yet.</p>
          )}
        </div>

        {/* Custom Navigation Buttons */}
        {testimonials.length > 1 && (
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-6 pointer-events-none">
            <button className="swiper-button-prev text-3xl text-gray-900 hover:text-[#c7a86f] pointer-events-auto">
              &larr;
            </button>
            <button className="swiper-button-next text-3xl text-gray-900 hover:text-[#c7a86f] pointer-events-auto">
              &rarr;
            </button>
          </div>
        )}
      </section>

      {/* === Explore Wayanad SECTION === */}
      <section className="relative bg-[#f9f9f7] overflow-hidden w-full">
        {/* Banner Video */}
        {/* <div className="relative w-full h-[350px] md:h-[500px] overflow-hidden">
          <video
            src="/explore-banner.mp4"
            poster="/amenities-banner-poster.jpg"
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="absolute top-0 left-0 w-full h-full object-cover"
          ></video>

          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-4">
            <h2
              className="text-5xl md:text-8xl font-bold tracking-[0.10em] text-[#c7a86f] mb-2"
              style={{ fontFamily: "'Cookie', cursive" }}
            >
              Explore
            </h2>
            <p
              className="text-xl md:text-3xl tracking-widest uppercase"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Discover The Beauty of Wayanad
            </p>
          </div>
        </div> */}

        <div className="relative w-full h-[350px] md:h-[500px] overflow-hidden">
          <img
            src="/explore_banner.jpg"
            alt="Explore Wayanad"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-4">
            <h2
              className="text-5xl md:text-8xl font-bold tracking-[0.10em] text-[#c7a86f] mb-2"
              style={{ fontFamily: "'Cookie', cursive" }}
            >
              Explore
            </h2>
            <p
              className="text-xl md:text-3xl tracking-widest uppercase"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Discover The Beauty of Wayanad
            </p>
          </div>
        </div>

        {/* Explore Slider */}
        <div className="w-full px-4 py-16 md:py-20 bg-[#f9f9f7]">
          <h2
            className="text-3xl md:text-5xl font-bold text-gray-900 text-center mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Attractions Near Lumarise Residency
          </h2>
          <p
            className="text-gray-600 text-base md:text-lg text-center leading-relaxed max-w-3xl mx-auto mb-14"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Experience the natural charm of Wayanad — from misty mountains to
            serene lakes and hidden waterfalls.
          </p>

          {exploreWayanad.length > 0 && (
            <Swiper
              modules={[Autoplay]}
              slidesPerView={1}
              spaceBetween={15}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={exploreWayanad.length >= 4}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 15 },
                768: { slidesPerView: 3, spaceBetween: 20 },
                1024: { slidesPerView: 4, spaceBetween: 20 },
              }}
              className="w-full max-w-7xl mx-auto"
            >
              {exploreWayanad.map((place, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-white shadow-md hover:shadow-lg transition-all duration-500 overflow-hidden">
                    <div className="overflow-hidden">
                      <LazyImage
                        src={place.img}
                        alt={place.title}
                        className="w-full h-[200px] md:h-[250px] object-cover transform hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h3
                        className="text-base md:text-lg font-semibold text-gray-800"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {place.title}
                      </h3>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {/* Explore Button */}
          <div className="mt-12 md:mt-16 text-center">
            <button
              onClick={() => navigate("/explore-wayanad")}
              className="bg-[#f5d36c] hover:bg-[#e0c45a] text-black px-8 py-3 uppercase tracking-widest text-sm font-semibold transition-all duration-300 shadow-md"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Explore Wayanad
            </button>
          </div>
        </div>
      </section>

      {/* ===================== Direction Section ===================== */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        >
          <source src="/direction-banner.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* CONTENT WRAPPER */}
        <div className="relative max-w-[95%] mx-auto px-6 md:px-10 lg:px-16 grid md:grid-cols-2 gap-12 items-center">
          {/* ----- LEFT CONTENT ----- */}
          <div className="text-center md:text-left text-white drop-shadow-lg">
            <p
              className="text-3xl md:text-4xl tracking-[0.15em] text-[#c7a86f] mb-4"
              style={{ fontFamily: "'Cookie', cursive" }}
            >
              Direction
            </p>

            <h2
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Getting to Our Wayanad Homestay
            </h2>

            <p
              className="text-lg leading-relaxed mb-8"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Getting to our <strong>Lumarise Hotel, Sultan Bathery</strong> is
              easy and convenient. Well-connected by road from Kozhikode,
              Bengaluru, and Mysuru, travelers can reach us via car, taxi, or
              bus. Surrounded by scenic hills and plantations, the journey
              itself is a delightful introduction to Wayanad’s natural beauty,
              ensuring a smooth and pleasant arrival.
            </p>

            {/* GET DIRECTION BUTTON */}
            <a
              href="https://maps.app.goo.gl/7n8gK2ghuguzeZjEA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#e8c556] hover:bg-[#d3af44] text-black px-10 py-3 uppercase tracking-widest text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Get Direction
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
