import { Facebook, Twitter, Youtube, Globe } from "lucide-react";
import lumariseLogo from "../assets/lumarise_logo.png";

export default function Footer({ isTranslucent = false }) {
  return (
    <footer className={`relative z-20 ${
      isTranslucent 
        ? 'bg-[#1a1a1a]/70 backdrop-blur-md border-t border-white/10' 
        : 'bg-[#1a1a1a]'
    } text-gray-300 pt-12 md:pt-16 pb-8 font-serif`}>
      <div className="container mx-auto px-6 md:px-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 text-left border-b border-gray-700 pb-8 md:pb-10">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center sm:items-start">
          <a
            href="/"
            className="flex items-center space-x-3 md:space-x-4 mb-4 hover:opacity-90 transition"
          >
            <img
              src={lumariseLogo}
              alt="Lumarise Logo"
              className="w-10 h-10 md:w-12 md:h-12 object-contain"
            />
            <div className="text-left">
              <h1
                className="tracking-wide text-[#d4af37] text-xl md:text-2xl"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                LUMARISE
              </h1>
              <p
                className="text-xs tracking-widest uppercase text-gray-300"
                style={{ letterSpacing: "0.15em" }}
              >
                Residency
              </p>
            </div>
          </a>
        </div>

        {/* Quick Links */}
        <div className="text-center sm:text-left">
          <h3 className="text-[#d4af37] uppercase tracking-widest text-sm mb-3 md:mb-4 font-semibold" style={{ fontFamily: "'Cinzel', serif" }}>
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-[#d4af37] transition-all duration-300 text-sm md:text-base font-sans">
                Home
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-[#d4af37] transition-all duration-300 text-sm md:text-base font-sans">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-[#d4af37] transition-all duration-300 text-sm md:text-base font-sans">
                FAQ
              </a>
            </li>
          </ul>
        </div>  

        {/* Address */}
        <div className="text-center sm:text-left">
          <h3 className="text-[#d4af37] uppercase tracking-widest text-sm mb-3 md:mb-4 font-semibold" style={{ fontFamily: "'Cinzel', serif" }}>
            Address
          </h3>

          <a
            href="https://www.google.com/maps/place/Lumarise+Hotel/@11.6620025,76.2516507,853m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3ba609bc5a285bc3:0x971dd6752cd4cb43!8m2!3d11.6620025!4d76.2542256!16s/g/11ym7cncdq"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#d4af37] transition-all duration-300 block text-sm md:text-base font-sans"
          >
            <p>Near Assumption Hospital,</p>
            <p>Sultan Bathery,</p>
            <p>Wayanad, Kerala - 673592</p>
            <p>India</p>
          </a>
        </div>

        {/* Reservations + Social */}
        <div className="text-center sm:text-left">
          <h3 className="text-[#d4af37] uppercase tracking-widest text-sm mb-3 md:mb-4 font-semibold" style={{ fontFamily: "'Cinzel', serif" }}>
            Reservations
          </h3>

          {/* WhatsApp link */}
          <a
            href="https://wa.me/918606033337"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-2 block text-gray-300 hover:text-green-500 transition-colors duration-300 text-sm md:text-base font-sans"
          >
            +91 86060 33337
          </a>

          {/* Email link */}
          <a
            href="mailto:lumarisehotels@gmail.com"
            className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm md:text-base break-all font-sans"
          >
            lumarisehotels@gmail.com
          </a>

          {/* Follow Us */}
          <div className="mt-6">
            <h3 className="text-[#d4af37] uppercase tracking-widest text-sm mb-3 font-semibold" style={{ fontFamily: "'Cinzel', serif" }}>
              Follow Us
            </h3>

            <div className="flex space-x-4 justify-center sm:justify-start">

              {/* Instagram */}
              <a
                href="https://www.instagram.com/lumarisehotels?igsh=c3NhcHhjOTl4OWxq&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#d4af37] transition-colors duration-300"
                aria-label="Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.3 2.3.5.6.2 1 .6 1.4 1.1.4.4.8.8 1.1 1.4.2.4.4 1.1.5 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.9-.5 2.3-.2.6-.6 1-1.1 1.4-.4.4-.8.8-1.4 1.1-.4.2-1.1.4-2.3.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.3-2.3-.5-.6-.2-1-.6-1.4-1.1-.4-.4-.8-.8-1.1-1.4-.2-.4-.4-1.1-.5-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.9.5-2.3.2-.6.6-1 1.1-1.4.4-.4.8-.8 1.4-1.1.4-.2 1.1-.4 2.3-.5C8.4 2.2 8.8 2.2 12 2.2m0 2.3c-3.1 0-3.5 0-4.7.1-.9.1-1.4.2-1.7.4-.4.2-.7.4-1 .8-.3.3-.5.6-.8 1-.2.3-.3.8-.4 1.7-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1.9.2 1.4.4 1.7.2.4.4.7.8 1 .3.3.6.5 1 .8.3.2.8.3 1.7.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c.9-.1 1.4-.2 1.7-.4.4-.2.7-.4 1-.8.3-.3.5-.6.8-1 .2-.3.3-.8.4-1.7.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-.9-.2-1.4-.4-1.7-.2-.4-.4-.7-.8-1-.3-.3-.6-.5-1-.8-.3-.2-.8-.3-1.7-.4-1.2-.1-1.6-.1-4.7-.1m0 3.4a6.4 6.4 0 110 12.8 6.4 6.4 0 010-12.8m0 10.5a4.1 4.1 0 100-8.2 4.1 4.1 0 000 8.2M17.3 6.2a1.5 1.5 0 110-3 1.5 1.5 0 010 3"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/17m7XUM9qq/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#d4af37] transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>

              {/* Google Review */}
              <a
                href="https://www.google.com/maps/place/Lumarise+Hotel/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#d4af37] transition-colors duration-300"
                aria-label="Google Reviews"
              >
                <Globe size={20} />
              </a>

            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-xs md:text-sm mt-6 tracking-wide px-4">
        <p>
          Copyright © {new Date().getFullYear()} LUMARISE. All Rights Reserved.
        </p>

        <p className="mt-2">
          Powered by{" "}
          <a
            href="https://imcbs.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#d4af37] hover:text-white transition-colors duration-300 font-medium"
          >
            IMCB SOLUTION LLP
          </a>
        </p>
      </div>
    </footer>
  );
}