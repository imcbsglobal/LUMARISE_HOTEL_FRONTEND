// src/components/GalleryGrid.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import LazyImage from "./LazyImage";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL || "https://lumarisehotel.com";

export default function GalleryGrid({ maxItems = 10 }) {
  const [media, setMedia] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadMedia();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadMedia() {
    try {
      const res = await axios.get(`${BASE_URL}/api/media/`);
      const list = Array.isArray(res.data) ? res.data : res.data.results || [];
      // newest first
      const sorted = list.sort((a, b) => new Date(b.uploaded_at) - new Date(a.uploaded_at));
      // keep images only for this grid
      const images = sorted.filter((i) => i.media_type === "image");
      // normalize url fields for convenience
      const normalized = images.map((it) => ({
        ...it,
        url: it.image.startsWith("http") ? it.image : `${BASE_URL}${it.image}`,
      }));
      setMedia(normalized.slice(0, maxItems));
    } catch (err) {
      console.error("Gallery load error:", err);
      setMedia([]);
    }
  }

  const safeUrl = (item) => item?.url || "/fallback.jpg";

  return (
    <div className="mx-auto px-16 sm:px-14 lg:px-20">
      {/* Desktop Grid (hidden on mobile) - Masonry Style with 5 columns */}
      <div className="hidden md:grid grid-cols-5 gap-3">
        {/* Column 1 - starts at top */}
        <div className="space-y-3 mt-8">
          <div className="aspect-[4/5] overflow-hidden group rounded-sm">
            <LazyImage src={safeUrl(media[0])} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          </div>
          <div className="aspect-[4/3] overflow-hidden group rounded-sm">
            <LazyImage src={safeUrl(media[1])} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          </div>
        </div>

        {/* Column 2 - offset down slightly */}
        <div className="space-y-3">
          <div className="aspect-[3/4] overflow-hidden group rounded-sm">
            <LazyImage src={safeUrl(media[2])} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          </div>
          <div className="aspect-square overflow-hidden group rounded-sm">
            <LazyImage src={safeUrl(media[3])} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          </div>
        </div>

        {/* Column 3 - offset down more */}
        <div className="space-y-3 mt-16">
          <div className="aspect-square overflow-hidden group rounded-sm">
            <LazyImage src={safeUrl(media[4])} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          </div>
          <div className="aspect-[3/4] overflow-hidden group rounded-sm">
            <LazyImage src={safeUrl(media[5])} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          </div>
        </div>

        {/* Column 4 - offset down */}
        <div className="space-y-3">
          <div className="aspect-[3/4] overflow-hidden group rounded-sm">
            <LazyImage src={safeUrl(media[6])} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          </div>
          <div className="aspect-square overflow-hidden group rounded-sm">
            <LazyImage src={safeUrl(media[7])} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          </div>
        </div>

        {/* Column 5 - starts at top */}
        <div className="space-y-3 mt-10">
          <div className="aspect-[4/5] overflow-hidden group rounded-sm">
            <LazyImage src={safeUrl(media[8])} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          </div>
          <div className="aspect-[4/3] overflow-hidden group rounded-sm">
            <LazyImage src={safeUrl(media[9])} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          </div>
        </div>
      </div>

      {/* Mobile Grid (visible only on mobile) */}
      <div className="grid md:hidden grid-cols-2 gap-2 sm:gap-3">
        {/* First row - 2 equal squares */}
        <div className="aspect-square overflow-hidden rounded-sm">
          <LazyImage src={safeUrl(media[0])} className="w-full h-full object-cover" />
        </div>
        <div className="aspect-square overflow-hidden rounded-sm">
          <LazyImage src={safeUrl(media[1])} className="w-full h-full object-cover" />
        </div>

        {/* Second row - 1 large rectangle spanning 2 columns */}
        <div className="col-span-2 aspect-[2/1] overflow-hidden rounded-sm">
          <LazyImage src={safeUrl(media[2])} className="w-full h-full object-cover" />
        </div>

        {/* Third row - 2 equal squares */}
        <div className="aspect-square overflow-hidden rounded-sm">
          <LazyImage src={safeUrl(media[3])} className="w-full h-full object-cover" />
        </div>
        <div className="aspect-square overflow-hidden rounded-sm">
          <LazyImage src={safeUrl(media[4])} className="w-full h-full object-cover" />
        </div>

        {/* Fourth row - 1 large rectangle spanning 2 columns */}
        <div className="col-span-2 aspect-[2/1] overflow-hidden rounded-sm">
          <LazyImage src={safeUrl(media[5])} className="w-full h-full object-cover" />
        </div>

        {/* Fifth row - 2 equal squares */}
        <div className="aspect-square overflow-hidden rounded-sm">
          <LazyImage src={safeUrl(media[6])} className="w-full h-full object-cover" />
        </div>
        <div className="aspect-square overflow-hidden rounded-sm">
          <LazyImage src={safeUrl(media[7])} className="w-full h-full object-cover" />
        </div>

        {/* Sixth row - Last image spanning full width */}
        <div className="col-span-2 aspect-[2/1] overflow-hidden rounded-sm">
          <LazyImage src={safeUrl(media[8])} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* View All Button */}
      <div className="text-center mt-8 md:mt-12">
        <button 
          onClick={() => navigate("/gallery")} 
          className="inline-flex items-center text-xs sm:text-sm tracking-wide text-gray-800 hover:text-amber-700 transition-colors duration-300 group"
        >
          <span className="border-b border-gray-800 group-hover:border-amber-700 pb-1">
            View All Photos & Videos
          </span>
          <svg 
            className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M17 8l4 4m0 0l-4 4m4-4H3" 
            />
          </svg>
        </button>
      </div>
    </div>
  );
}