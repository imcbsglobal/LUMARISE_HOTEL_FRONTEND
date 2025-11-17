// src/pages/BookingForm.jsx

import React, { useState } from "react";

const ADMIN_WHATSAPP = "918606033337";

// Always ensure backend URL contains /api
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

      // Send WhatsApp with booking ID
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

          {/* NAME */}
          <div className="md:col-span-2">
            <label className="font-medium text-sm sm:text-base block mb-1.5">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              disabled={loading}
              placeholder="Enter your full name"
              className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition text-sm sm:text-base"
              required
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="font-medium text-sm sm:text-base block mb-1.5">Phone</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              disabled={loading}
              placeholder="+91 1234567890"
              className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition text-sm sm:text-base"
              required
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="font-medium text-sm sm:text-base block mb-1.5">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
              placeholder="your@email.com"
              className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition text-sm sm:text-base"
              required
            />
          </div>

          {/* CHECK-IN */}
          <div>
            <label className="font-medium text-sm sm:text-base block mb-1.5">Check-In</label>
            <input
              type="date"
              name="checkin"
              value={form.checkin}
              onChange={handleChange}
              disabled={loading}
              min={new Date().toISOString().split("T")[0]}
              className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition text-sm sm:text-base"
              required
            />
          </div>

          {/* CHECK-OUT */}
          <div>
            <label className="font-medium text-sm sm:text-base block mb-1.5">Check-Out</label>
            <input
              type="date"
              name="checkout"
              value={form.checkout}
              onChange={handleChange}
              disabled={loading}
              min={form.checkin || new Date().toISOString().split("T")[0]}
              className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition text-sm sm:text-base"
              required
            />
          </div>

          {/* GUESTS */}
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
              className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition text-sm sm:text-base"
              required
            />
          </div>

          {/* ROOM TYPE */}
          <div>
            <label className="font-medium text-sm sm:text-base block mb-1.5">Room Type</label>
            <select
              name="roomType"
              value={form.roomType}
              onChange={handleChange}
              disabled={loading}
              className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition text-sm sm:text-base appearance-none bg-white cursor-pointer"
              required
            >
              <option value="">Select Room Type</option>
              <option>DULEX ROOM</option>
              <option>EXECUTIVE ROOM</option>
              <option>SUITE ROOM</option>
              <option>DULEX ROOM (P)</option>
              <option>EXECUTIVE ROOM (P)</option>
              <option>COUPLE SUITE</option>
              <option>PREMIUM SUIT ROOM</option>
              <option>DORMITORY</option>
            </select>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="md:col-span-2 mt-2 sm:mt-3 md:mt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#f5d36c] hover:bg-[#e0c45a] active:bg-[#d3af44] disabled:bg-gray-400 disabled:cursor-not-allowed text-black px-6 sm:px-8 py-3 sm:py-3.5 uppercase tracking-widest text-xs sm:text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg active:scale-98 flex justify-center items-center gap-2 rounded-lg"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {loading ? (
                <>
                  <div className="animate-spin h-4 w-4 sm:h-5 sm:w-5 border-2 border-black border-t-transparent rounded-full"></div>
                  <span className="text-xs sm:text-sm">Processing...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                  </svg>
                  <span>Book via WhatsApp</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}