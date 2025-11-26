import React, { useRef, useState } from "react";
import Footer from "../components/Footer";
import { Title, Meta } from "react-head";

export default function Contact() {
  const form = useRef();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      name: e.target.name.value,
      place: e.target.place.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      message: e.target.message.value,
    };

    try {
      const res = await fetch("https://lumarisehotel.com/api/send-enquiry/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Enquiry sent successfully!");
        e.target.reset();
      } else {
        alert("Failed to send. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ======================= SEO META ======================= */}
      <Title>Contact Lumarise Residency – Sultan Bathery, Wayanad</Title>
      <Meta
        name="description"
        content="Contact Lumarise Residency in Sultan Bathery, Wayanad for room booking, enquiries, reservation rates, location map, WhatsApp booking and customer support."
      />
      <Meta
        name="keywords"
        content="Contact Lumarise Residency, Lumarise Hotel Sultan Bathery phone number, hotel booking Wayanad, contact hotel Wayanad, enquiry Lumarise"
      />
      <Meta property="og:title" content="Contact – Lumarise Residency Sultan Bathery" />
      <Meta
        property="og:description"
        content="Reach out to Lumarise Residency for booking and enquiries. Call or WhatsApp +91 86060 33337. Email: lumarisehotels@gmail.com."
      />
      <Meta property="og:url" content="https://lumarisehotel.com/contact" />
      <Meta property="og:type" content="website" />

      {/* ======================= PAGE ======================= */}
      <div className="w-full text-gray-800 bg-[#f9f8f6]">
        {/* HERO SECTION */}
        <section
          className="relative h-[50vh] sm:h-[55vh] md:h-[60vh] flex flex-col items-center justify-center text-center text-white"
          style={{
            backgroundImage: "url('/contact-bg.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: window.innerWidth > 768 ? "fixed" : "scroll",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 px-4 sm:px-6">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider mb-3 sm:mb-4 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Contact Us
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed px-2">
              We’d love to assist you with reservations, enquiries or any feedback.
            </p>
          </div>
        </section>

        {/* CONTENT SECTION */}
        <section className="px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-12 sm:py-16 md:py-20 bg-white/95 backdrop-blur-md -mt-12 sm:-mt-14 md:-mt-16 rounded-t-[2rem] sm:rounded-t-[2.5rem] md:rounded-t-[3rem] relative z-10 shadow-lg">
          {/* LOCATION + MAP */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 mb-12 sm:mb-16 md:mb-20">
            <div className="flex flex-col justify-center order-2 md:order-1">
              <h3
                className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-[#c7a86f]"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Our Location
              </h3>
              <p className="text-gray-700 text-base sm:text-lg mb-2">Lumarise Residency, Sultan Bathery, Wayanad, Kerala 673592</p>
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                Prime location with easy access to tourist attractions, transport and city center.
              </p>
            </div>

            <div className="overflow-hidden rounded-xl sm:rounded-2xl shadow-lg cursor-pointer order-1 md:order-2 h-[250px] sm:h-[300px] md:h-[350px]">
              <a
                href="https://maps.app.goo.gl/ojv96D5AZuhvGPy39"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full"
              >
                <iframe
                  title="Google Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.9751471830733!2d76.2475!3d11.662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba60e123456789%3A0xabcdef123456789!2sLumarise%20Hotel!5e0!3m2!1sen!2sin!4v1731300000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </a>
            </div>
          </div>

          {/* CONTACT DETAILS */}
          <div className="text-center mb-12 sm:mb-14 md:mb-16">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-[#c7a86f]" style={{ fontFamily: "'Cinzel', serif" }}>
              Reach Us Anytime
            </h3>

            <p className="text-base sm:text-lg text-gray-700 mb-3">
              <strong>Phone:</strong>{" "}
              <a
                href="https://wa.me/918606033337?text=Hello%20Lumarise%20Hotel%2C%20I%20would%20like%20to%20make%20an%20enquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl sm:text-2xl font-bold text-[#25D366] hover:underline"
              >
                +91 86060 33337
              </a>
            </p>

            <p className="text-base sm:text-lg text-gray-700">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:lumarisehotels@gmail.com"
                className="text-lg sm:text-2xl font-bold text-[#0072C6] hover:underline break-all"
              >
                lumarisehotels@gmail.com
              </a>
            </p>
          </div>

          {/* FORM */}
          <div className="max-w-4xl mx-auto bg-white shadow-xl sm:shadow-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 relative z-10">
            <h3
              className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-6 sm:mb-8 md:mb-10"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Send Us an Enquiry
            </h3>

            <form ref={form} onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Full Name</label>
                <input type="text" name="name" required disabled={loading} placeholder="Your Name" className="w-full border border-gray-300 rounded-lg px-4 py-3 disabled:bg-gray-200" />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Place</label>
                <input type="text" name="place" disabled={loading} placeholder="City or Country" className="w-full border border-gray-300 rounded-lg px-4 py-3 disabled:bg-gray-200" />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Email</label>
                <input type="email" name="email" required disabled={loading} placeholder="you@example.com" className="w-full border border-gray-300 rounded-lg px-4 py-3 disabled:bg-gray-200" />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Phone Number</label>
                <input type="tel" name="phone" required disabled={loading} placeholder="+91 12345 67890" className="w-full border border-gray-300 rounded-lg px-4 py-3 disabled:bg-gray-200" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Message</label>
                <textarea name="message" required disabled={loading} rows="5" placeholder="Write your message here..." className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none disabled:bg-gray-200"></textarea>
              </div>

              <div className="md:col-span-2 text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto bg-[#f5d36c] hover:bg-[#e0c45a] active:bg-[#d3af44] text-black px-8 py-3 uppercase font-semibold shadow-md rounded-lg transition-all"
                >
                  {loading ? "Sending..." : "Submit Enquiry"}
                </button>
              </div>
            </form>
          </div>
        </section>

      </div>
    </>
  );
}
