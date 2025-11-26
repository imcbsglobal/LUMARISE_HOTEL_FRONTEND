import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Title, Meta } from "react-head";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleWhatsApp = () => {
    const phoneNumber = '918606033337';
    const message = encodeURIComponent('Hello, I have a question about Lumarise Residency.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const faqs = [
    { question: "What is check-in time?", answer: "Check-in time is 12:00 PM." },
    { question: "Is parking available?", answer: "Yes, we provide free parking for guests." },
    { question: "What is the check-out time?", answer: "Check-out time is 11:00 AM. Late check-out is subject to availability." },
    { question: "Do you offer complimentary breakfast?", answer: "Yes, complimentary breakfast is provided for all guests staying with us." },
    { question: "Is Wi-Fi available?", answer: "Yes, we offer free high-speed Wi-Fi throughout the property." },
    { question: "Do you have air-conditioned rooms?", answer: "Yes, all our rooms are fully air-conditioned for your comfort." },
    { question: "Are pets allowed?", answer: "Unfortunately, pets are not allowed at Lumarise Residency." },
    { question: "Does the hotel provide airport/station pickup?", answer: "Yes, pickup and drop services are available on request with additional charges." },
    { question: "Do you have hot water facility?", answer: "Yes, 24/7 hot water is available in all bathrooms." },
    { question: "Is smoking allowed inside the rooms?", answer: "No, smoking is strictly prohibited inside rooms. A designated smoking area is available." },
    { question: "How can I modify or cancel my booking?", answer: "You can contact our reception desk or WhatsApp us directly using the number on the Contact page." },
    { question: "Do you offer room service?", answer: "Yes, room service is available from 7:00 AM to 10:00 PM." },
    { question: "Are extra beds available?", answer: "Yes, extra beds can be provided upon request for an additional charge." },
    { question: "Do you have CCTV surveillance?", answer: "Yes, the entire property is secured with 24/7 CCTV monitoring for guest safety." },
    { question: "Is there a restaurant inside the hotel?", answer: "We have an in-house dining area with both veg and non-veg options available." },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* ==== SEO TAGS ==== */}
      <Title>FAQ – Lumarise Residency | Frequently Asked Questions</Title>
      <Meta name="description" content="Find answers to the most frequently asked questions about Lumarise Residency, Sultan Bathery, Wayanad. Check-in times, amenities, parking, Wi-Fi, food and more." />
      <Meta name="keywords" content="Lumarise Residency FAQ, hotel faq Wayanad, questions about hotel Sultan Bathery, booking queries Lumarise" />
      <Meta name="robots" content="index,follow" />
      <Meta property="og:title" content="FAQ – Lumarise Residency" />
      <Meta property="og:description" content="Answers to common questions about staying at Lumarise Residency in Wayanad — check-in details, parking, Wi-Fi, food, and amenities." />
      <Meta property="og:url" content="https://lumarisehotel.com/faq" />
      <Meta property="og:image" content="https://lumarisehotel.com/og-cover.jpg" />

      {/* ==== PAGE UI ==== */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-10 sm:py-12 md:py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 tracking-tight leading-tight"
              style={{ fontFamily: "'Cinzel', serif", color: '#f5d36c' }}
            >
              Frequently Asked Questions
            </h1>
            <p 
              className="text-base sm:text-lg md:text-xl tracking-tight leading-relaxed"
              style={{ fontFamily: "'Cinzel', serif", color: '#f5d36c' }}
            >
              Find answers to common questions about Lumarise Residency
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden transition-all duration-200 hover:shadow-md">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left transition-colors hover:bg-slate-50 active:bg-slate-100"
                >
                  <span
                    className="font-semibold text-slate-900 pr-3 sm:pr-4 text-sm sm:text-base leading-snug"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 flex-shrink-0" />
                  )}
                </button>

                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 sm:max-h-40' : 'max-h-0'}`}>
                  <div className="px-4 sm:px-6 pb-4 sm:pb-5 text-slate-700 leading-relaxed text-sm sm:text-base">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 sm:mt-12 bg-slate-800 text-white rounded-lg p-6 sm:p-8 text-center">
            <h2
              className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 tracking-tight"
              style={{ fontFamily: "'Cinzel', serif", color: '#f5d36c' }}
            >
              Still have questions?
            </h2>
            <p
              className="text-sm sm:text-base md:text-lg mb-4 sm:mb-5 tracking-tight leading-relaxed px-2"
              style={{ fontFamily: "'Cinzel', serif", color: '#f5d36c' }}
            >
              Our team is here to help you with any additional inquiries
            </p>

            <button
              onClick={handleWhatsApp}
              className="bg-[#f5d36c] hover:bg-[#e0c45a] active:bg-[#d3af44] text-black px-6 sm:px-8 py-3 uppercase tracking-widest text-xs sm:text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg rounded-lg"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              WhatsApp Us
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
