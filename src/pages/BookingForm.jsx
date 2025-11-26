// src/pages/BookingForm.jsx
import React, { useState } from "react";
import { Title, Meta } from "react-head";

const ADMIN_WHATSAPP = "918606033337";
const API_BASE = (import.meta.env.VITE_API_URL || "https://lumarisehotel.com/api").replace(/\/$/, "");

export default function BookingForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    checkin: "",
    checkout: "",
    guests: "",
    roomType: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const { name, phone, email, checkin, checkout, guests, roomType } = form;

    if (!name || !phone || !email || !checkin || !checkout || !guests || !roomType) {
      alert("All fields are required.");
      return false;
    }

    const ci = new Date(checkin);
    const co = new Date(checkout);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (ci < today) {
      alert("Check-in date cannot be in the past.");
      return false;
    }

    if (co <= ci) {
      alert("Check-out must be after Check-in.");
      return false;
    }

    if (guests < 1) {
      alert("Guests must be at least 1.");
      return false;
    }

    return true;
  };

  const sendWhatsApp = (data, bookingID = null) => {
    const message = `
*New Booking Request*

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}

Check-in: ${data.checkin}
Check-out: ${data.checkout}

Guests: ${data.guests}
Room Type: ${data.roomType}

${bookingID ? `Booking ID: ${bookingID}\n` : ""}
Please confirm this booking.
`;

    const url = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const payload = {
      guest_name: form.name,
      name: form.name,
      phone: form.phone,
      email: form.email,
      checkin: form.checkin,
      checkout: form.checkout,
      check_in: form.checkin,
      check_out: form.checkout,
      guests: parseInt(form.guests),
      room_type: form.roomType,
      status: "Pending",
    };

    try {
      const res = await fetch(`${API_BASE}/bookings/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Booking failed");

      const result = await res.json();
      sendWhatsApp(form, result.id);
      alert("Booking saved and sent to WhatsApp!");

      setForm({
        name: "",
        phone: "",
        email: "",
        checkin: "",
        checkout: "",
        guests: "",
        roomType: "",
      });

    } catch (err) {
      console.error(err);
      alert("Backend unavailable. Sending details via WhatsApp only.");
      sendWhatsApp(form);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ===== SEO META TAGS ===== */}
      <Title>Book Your Stay – Lumarise Residency | Sultan Bathery Wayanad</Title>
      <Meta
        name="description"
        content="Book your room at Lumarise Residency in Sultan Bathery, Wayanad. Enjoy luxury rooms, peaceful ambience, free parking, high-speed Wi-Fi, and exceptional hospitality."
      />
      <Meta
        name="keywords"
        content="hotel booking Sultan Bathery, book hotel Wayanad, Lumarise Residency booking, room reservation Wayanad"
      />
      <Meta name="robots" content="index, follow" />
      <Meta property="og:title" content="Book Your Stay – Lumarise Residency" />
      <Meta
        property="og:description"
        content="Secure your stay at Lumarise Residency in Sultan Bathery, Wayanad. Book rooms online with flexible options."
      />
      <Meta property="og:type" content="website" />
      <Meta property="og:url" content="https://lumarisehotel.com/book" />
      <Meta property="og:image" content="https://lumarisehotel.com/og-cover.jpg" />
      <Meta rel="canonical" href="https://lumarisehotel.com/book" />

      {/* ===== UI SECTION (UNCHANGED) ===== */}
      <div
        className="min-h-screen flex justify-center items-center bg-cover bg-center relative py-8 sm:py-12 md:py-0"
        style={{
          backgroundImage: "url('/about-main.jpg')",
          fontFamily: "'Cinzel', serif",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>

        <div className="relative z-10 bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 w-full max-w-3xl mx-4 sm:mx-6 my-4">

          <p className="text-center text-gray-500 italic mb-2 text-xs sm:text-sm md:text-base px-2">
            "Your next unforgettable memory begins here."
          </p>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-5 md:mb-6 text-gray-900 leading-tight px-2">
            Book Your Stay at <span className="text-yellow-600">Lumarise</span>
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">

            {/* === FORM FIELDS === */}
            <div className="md:col-span-2">
              <label className="font-medium text-sm sm:text-base block mb-1.5">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                disabled={loading}
                placeholder="Enter your full name"
                className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            <div>
              <label className="font-medium text-sm sm:text-base block mb-1.5">Phone</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                disabled={loading}
                placeholder="+91 1234567890"
                className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            <div>
              <label className="font-medium text-sm sm:text-base block mb-1.5">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                disabled={loading}
                placeholder="your@email.com"
                className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            <div>
              <label className="font-medium text-sm sm:text-base block mb-1.5">Check-In</label>
              <input
                type="date"
                name="checkin"
                value={form.checkin}
                onChange={handleChange}
                disabled={loading}
                min={new Date().toISOString().split("T")[0]}
                className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            <div>
              <label className="font-medium text-sm sm:text-base block mb-1.5">Check-Out</label>
              <input
                type="date"
                name="checkout"
                value={form.checkout}
                onChange={handleChange}
                disabled={loading}
                min={form.checkin || new Date().toISOString().split("T")[0]}
                className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            <div>
              <label className="font-medium text-sm sm:text-base block mb-1.5">Guests</label>
              <input
                type="number"
                name="guests"
                value={form.guests}
                onChange={handleChange}
                disabled={loading}
                min="1"
                placeholder="Number of guests"
                className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            <div>
              <label className="font-medium text-sm sm:text-base block mb-1.5">Room Type</label>
              <select
                name="roomType"
                value={form.roomType}
                onChange={handleChange}
                disabled={loading}
                className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-lg bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              >
                <option value="">Select Room Type</option>
                <option>DULEX ROOM</option>
                <option>EXECUTIVE ROOM</option>
                <option>SUITE ROOM</option>
                <option>PREMIUM DULEX ROOM</option>
                <option>PREMIUM EXECUTIVE ROOM</option>
                <option>COUPLE SUITE</option>
                <option>PREMIUM SUIT ROOM</option>
                <option>DORMITORY</option>
              </select>
            </div>

            <div className="md:col-span-2 mt-2 sm:mt-3 md:mt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#f5d36c] hover:bg-[#e0c45a] active:bg-[#d3af44] disabled:bg-gray-400 disabled:cursor-not-allowed text-black px-6 py-3 uppercase tracking-widest text-xs sm:text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg rounded-lg flex justify-center items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-black border-t-transparent rounded-full"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Book via WhatsApp</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
