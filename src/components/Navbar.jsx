import React, { useState, useEffect } from "react";
import logo from "../assets/lumarise_logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobileMenuOpen && !e.target.closest('.mobile-menu') && !e.target.closest('.hamburger-btn')) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Rooms", path: "/rooms" },
    { name: "Amenities", path: "/amenities" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <style>{`
        .smooth-transition {
          transition: all 0.8s cubic-bezier(0.25, 1, 0.3, 1);
        }

        .nav-item {
          position: relative;
          transition: color 0.3s ease;
        }

        .nav-item::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background-color: #d4af37;
          transition: width 0.3s ease;
        }

        .nav-item:hover::after {
          width: 100%;
        }

        .nav-item:hover {
          color: #d4af37;
        }

        .fade-slide-in {
          opacity: 0;
          transform: translateY(-20px);
          animation: fadeSlideIn 0.8s forwards cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes fadeSlideIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Glass effect for top navbar */
        .glass-nav {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* Hamburger Menu Animation */
        .hamburger-line {
          width: 25px;
          height: 2px;
          background-color: #d4af37;
          transition: all 0.3s ease;
          display: block;
        }

        .hamburger-btn.open .hamburger-line:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .hamburger-btn.open .hamburger-line:nth-child(2) {
          opacity: 0;
        }

        .hamburger-btn.open .hamburger-line:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -7px);
        }

        /* Mobile Menu Slide Animation */
        .mobile-menu {
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .mobile-menu.open {
          transform: translateX(0);
        }

        /* Mobile nav item animation */
        .mobile-nav-item {
          opacity: 0;
          transform: translateX(20px);
          animation: slideInRight 0.4s forwards;
        }

        @keyframes slideInRight {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

      {/* 🔹 Top Info Bar (Hides on Scroll) - Hidden on Mobile */}
      <div
        className={`fixed top-0 left-0 right-0 bg-[#1b1b1b] text-gray-300 text-sm py-2 px-6 md:flex justify-between items-center z-50 smooth-transition hidden ${
          isScrolled ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        {/* Left: Reservation Number */}
        <div className="flex items-center gap-2">
          <span>Reservation number:</span>
          <span className="text-[#f5d36c] font-semibold">+91 86060 33337</span>
        </div>

        {/* Center: Address */}
        <div className="hidden md:block text-gray-400">
          Sultan Bathery, Wayanad, Kerala
        </div>

        {/* Right: Buttons */}
        <div className="flex items-center gap-3">
          {/* Book Your Stay */}
          <button
            onClick={() => window.open("/booking", "_blank")}
            className="bg-transparent text-[#f5d36c] font-semibold tracking-wide uppercase border border-[#f5d36c] px-4 py-1 hover:bg-[#f5d36c] hover:text-black transition-all text-xs"
          >
            BOOK YOUR STAY
          </button>

          {/* Admin Login */}
          <button
            className="bg-transparent text-[#f5d36c] font-semibold tracking-wide uppercase border border-[#f5d36c] px-4 py-1 hover:bg-[#f5d36c] hover:text-black transition-all text-xs"
            onClick={() => window.open("/admin-login", "_blank")}
          >
            LOGIN
          </button>
        </div>
      </div>

      {/* 🔹 Main Navbar */}
      <nav
        className={`fixed left-0 right-0 z-40 smooth-transition ${
          isScrolled ? "bg-white shadow-md top-0 py-3" : "glass-nav md:top-10 top-0 py-4 md:py-6"
        }`}
      >
        <div
          className={`flex items-center smooth-transition px-6 md:px-12 ${
            isScrolled ? "justify-between" : "md:flex-col md:gap-6 justify-between"
          }`}
        >
          {/* Logo + Name */}
          <Link
            to="/"
            className={`flex items-center gap-3 smooth-transition ${
              isScrolled ? "translate-x-0 opacity-100" : "translate-y-0"
            }`}
          >
            <img
              src={logo}
              alt="Lumarise Logo"
              className={`h-10 md:h-12 object-contain smooth-transition ${
                isScrolled ? "scale-90" : "scale-100"
              }`}
            />
            <div className="text-center md:text-left">
              <h1
                className={`tracking-wide text-[#d4af37] smooth-transition ${
                  isScrolled ? "text-lg md:text-xl" : "text-xl md:text-2xl"
                }`}
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                LUMARISE
              </h1>

              <p
                className={`text-xs tracking-widest uppercase smooth-transition text-gray-500`}
              >
                Residency
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <ul
            className={`hidden lg:flex items-center gap-8 font-medium uppercase text-sm tracking-wide smooth-transition ${
              isScrolled ? "text-black" : "text-black"
            }`}
          >
            {navItems.map((item, index) => (
              <li
                key={item.name}
                className="cursor-pointer nav-item fade-slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link to={item.path} className="block">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Hamburger Menu Button (Mobile Only) */}
          <button
            className={`lg:hidden hamburger-btn flex flex-col gap-1.5 p-2 z-50 ${
              isMobileMenuOpen ? 'open' : ''
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Mobile Menu */}
      <div
        className={`mobile-menu fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-40 lg:hidden ${
          isMobileMenuOpen ? 'open' : ''
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-8">
          {/* Mobile Nav Items */}
          <ul className="flex flex-col gap-6 mb-8">
            {navItems.map((item, index) => (
              <li
                key={item.name}
                className="mobile-nav-item"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <Link
                  to={item.path}
                  className="text-lg font-medium uppercase tracking-wide text-gray-800 hover:text-[#d4af37] transition-colors block py-2 border-b border-gray-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Buttons */}
          <div className="flex flex-col gap-4 mt-auto mb-8">
            <button
              onClick={() => {
                window.open("/booking", "_blank");
                setIsMobileMenuOpen(false);
              }}
              className="bg-transparent text-[#d4af37] font-semibold tracking-wide uppercase border-2 border-[#d4af37] px-6 py-3 hover:bg-[#d4af37] hover:text-white transition-all text-sm"
            >
              BOOK YOUR STAY
            </button>

            <button
              className="bg-[#d4af37] text-white font-semibold tracking-wide uppercase border-2 border-[#d4af37] px-6 py-3 hover:bg-transparent hover:text-[#d4af37] transition-all text-sm"
              onClick={() => {
                window.open("/admin-login", "_blank");
                setIsMobileMenuOpen(false);
              }}
            >
              LOGIN
            </button>
          </div>

          {/* Contact Info */}
          <div className="text-center pb-8 text-sm text-gray-600">
            <p className="mb-1">Reservation:</p>
            <p className="text-[#d4af37] font-semibold">+91 86060 33337</p>
          </div>
        </div>
      </div>

      {/* Spacer for layout */}
      <div
        className="smooth-transition"
        style={{ height: isScrolled ? "70px" : window.innerWidth >= 768 ? "140px" : "80px" }}
      ></div>
    </>
  );
};

export default Navbar;