import { Shield, Lock, FileText, UserCheck, Info } from 'lucide-react';
import { Title, Meta } from "react-head";

export default function Terms() {

  const handleWhatsApp = () => {
    const phoneNumber = '918606033337';
    const message = encodeURIComponent('Hello, I have a question about Terms & Conditions.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const sections = [
    {
      icon: Info,
      title: "Introduction",
      content: "These Terms & Conditions govern all reservations, stays, interactions, and usage of services offered by Lumarise Residency. By making a booking or accessing our website, you acknowledge and agree to the following terms."
    },
    {
      icon: FileText,
      title: "Information We Collect",
      content: "We collect information directly from users such as name, contact details and booking details. We also collect automatic data like IP address, device details, requested URLs, and cookies."
    },
    {
      icon: Shield,
      title: "Use of Information Collected",
      content: "Data collected is used to improve services, contact guests, verify identities and ensure seamless interaction. Only authorized personnel may access this information."
    },
    {
      icon: UserCheck,
      title: "Transparency",
      content: "Users may request modifications or removal of stored data unless required for operations or compliance."
    },
    {
      icon: Lock,
      title: "Information Shared by Us",
      content: "We do not sell personal data. We only share data with your consent or when legally required."
    }
  ];

  const policies = [
    { title: "Reservation & Confirmation", content: "All bookings are subject to availability and confirmed through email or WhatsApp." },
    { title: "Check-in & Check-out", content: "Check-in is 12:00 PM and check-out is 11:00 AM. Early or late check-out depends on availability and may incur charges." },
    { title: "Payment Terms", content: "Payments are required during check-in or check-out. UPI, digital payments, and cash accepted." },
    { title: "Cancellation & No-show Policy", content: "Cancellations within 24 hours may be considered. Late cancellations or no-shows may incur charges." },
    { title: "Guest Conduct", content: "Misconduct or disruptive behavior may lead to cancellation without refund." },
    { title: "Damage to Property", content: "Guests are responsible for property damage and charges may apply." },
    { title: "Smoking Policy", content: "Smoking is prohibited inside rooms. Use designated smoking spaces only." },
    { title: "Visitors & Additional Guests", content: "Visitors allowed during designated hours. Overnight unregistered guests are not permitted." },
    { title: "Safety & Security", content: "CCTV is active in common areas. Guests must secure personal belongings." },
    { title: "Pet Policy", content: "Pets are not allowed unless explicitly approved." },
    { title: "Use of Facilities", content: "Amenities must be used responsibly. Misuse may result in restrictions." },
    { title: "Right to Admission", content: "The hotel reserves the right to refuse service for violations of terms." }
  ];

  return (
    <>
      {/* ===== SEO TAGS ===== */}
      <Title>Terms & Conditions – Lumarise Residency Wayanad</Title>
      <Meta name="description" content="Read the Terms & Conditions for staying and booking at Lumarise Residency, Sultan Bathery, Wayanad. Policies about reservations, payments, cancellation, data usage and privacy." />
      <Meta name="keywords" content="Lumarise Residency terms, hotel policies Wayanad, booking rules Sultan Bathery, privacy policy Wayanad hotels" />
      <Meta name="robots" content="index,follow" />
      <Meta property="og:title" content="Terms & Conditions – Lumarise Residency" />
      <Meta property="og:description" content="Hotel policies, guest rules, reservations, cancellation policy and data privacy information for Lumarise Residency, Wayanad." />
      <Meta property="og:url" content="https://lumarisehotel.com/terms" />
      <Meta property="og:image" content="https://lumarisehotel.com/og-cover.jpg" />

      {/* ===== PAGE UI ===== */}
      <div className="min-h-screen bg-slate-50">
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-10 sm:py-12 md:py-16 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 tracking-tight"
              style={{ fontFamily: "'Cinzel', serif", color: '#f5d36c' }}>
              Terms & Conditions
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-4 tracking-tight"
              style={{ fontFamily: "'Cinzel', serif", color: '#f5d36c' }}>
              Please read these terms carefully before using our services
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">

          <div className="mb-12 sm:mb-14 md:mb-16">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3"
              style={{ fontFamily: "'Cinzel', serif" }}>
              <Lock className="w-6 h-6 sm:w-7 sm:h-7 text-slate-700" />
              <span>Privacy & Data Protection</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <div key={index} className="bg-white rounded-lg p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="bg-slate-100 p-3 rounded-lg">
                        <Icon className="w-6 h-6 text-slate-700" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 mb-2 text-lg"
                          style={{ fontFamily: "'Cinzel', serif" }}>
                          {section.title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{section.content}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3"
              style={{ fontFamily: "'Cinzel', serif" }}>
              <FileText className="w-7 h-7 text-slate-700" />
              <span>Hotel Policies</span>
            </h2>

            <div className="space-y-4">
              {policies.map((policy, index) => (
                <div key={index} className="bg-white rounded-lg p-5 shadow-sm border border-slate-200 hover:border-slate-300">
                  <h3 className="font-bold text-slate-900 mb-2 text-lg" style={{ fontFamily: "'Cinzel', serif" }}>
                    {policy.title}
                  </h3>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed">{policy.content}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-slate-600 mb-4 text-sm sm:text-base">Have questions about our terms?</p>
            <button
              onClick={handleWhatsApp}
              className="bg-[#f5d36c] hover:bg-[#e0c45a] text-black px-8 py-3 rounded-lg uppercase tracking-widest font-semibold transition-all duration-300 shadow-md"
              style={{ fontFamily: "'Lato', sans-serif" }}>
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
