import { Shield, Lock, FileText, UserCheck, AlertCircle, Info } from 'lucide-react';

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
      content: "To enhance your browsing experience, we require you to submit certain information. Information is collected in two ways: information provided directly by you such as name, address, and contact details, and information collected automatically by our servers such as device details, IP address, browser type, requested URL, and cookies. Payment information is stored securely and not shared with any external party."
    },
    {
      icon: Shield,
      title: "Use of Information Collected",
      content: "The information collected is used solely to improve and personalize services, verify identity, send updates, and ensure smooth future interactions. Only authorized employees may access your data and only on a need-to-know basis."
    },
    {
      icon: UserCheck,
      title: "Transparency",
      content: "All information stored with us is visible and editable by you. Any data you want removed will be deleted, provided it does not interfere with essential processing systems."
    },
    {
      icon: Lock,
      title: "Information Shared by Us",
      content: "We do not sell or rent your personal information. Information is shared only with your consent, under legal requirements, or with trusted vendors when necessary to deliver better services."
    }
  ];

  const policies = [
    {
      title: "Reservation & Confirmation",
      content: "All bookings are subject to availability. Confirmations are sent through official channels including email or WhatsApp."
    },
    {
      title: "Check-in & Check-out",
      content: "Standard check-in is 12:00 PM and check-out is 11:00 AM. Early or late adjustments depend on availability and may incur extra charges."
    },
    {
      title: "Payment Terms",
      content: "Guests must settle dues during check-in or check-out. Digital payments, UPI, and cash are accepted. Advance payments may be required during peak seasons."
    },
    {
      title: "Cancellation & No-show Policy",
      content: "Cancellations made at least 24 hours in advance may be reconsidered. Late cancellations or no-shows may result in charges."
    },
    {
      title: "Guest Conduct",
      content: "Guests must maintain responsible behavior. Misconduct may lead to termination of stay without refund."
    },
    {
      title: "Damage to Property",
      content: "Any damages caused by guests will be charged accordingly."
    },
    {
      title: "Smoking Policy",
      content: "Smoking inside rooms is prohibited. Designated areas must be used."
    },
    {
      title: "Visitors & Additional Guests",
      content: "Visitors are allowed only during designated hours. Overnight stays by unregistered guests are not permitted."
    },
    {
      title: "Safety & Security",
      content: "CCTV is used in common areas. Guests are responsible for their personal belongings."
    },
    {
      title: "Pet Policy",
      content: "Pets are not allowed unless special approval is granted."
    },
    {
      title: "Use of Facilities",
      content: "All amenities must be used responsibly. Misuse may lead to restrictions."
    },
    {
      title: "Right to Admission",
      content: "Lumarise Residency reserves the right to refuse service to anyone violating these terms."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-10 sm:py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 tracking-tight" style={{ fontFamily: "'Cinzel', serif", color: '#f5d36c' }}>
            Terms & Conditions
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-4 tracking-tight" style={{ fontFamily: "'Cinzel', serif", color: '#f5d36c' }}>
            Please read these terms carefully before using our services
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
        {/* Privacy & Data Section */}
        <div className="mb-12 sm:mb-14 md:mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3" style={{ fontFamily: "'Cinzel', serif" }}>
            <Lock className="w-6 h-6 sm:w-7 sm:h-7 text-slate-700 flex-shrink-0" />
            <span>Privacy & Data Protection</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 sm:p-5 md:p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="bg-slate-100 p-2 sm:p-3 rounded-lg flex-shrink-0">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-2 text-base sm:text-lg" style={{ fontFamily: "'Cinzel', serif" }}>
                        {section.title}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Additional Privacy Sections */}
            <div className="bg-white rounded-lg p-4 sm:p-5 md:p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="bg-slate-100 p-2 sm:p-3 rounded-lg flex-shrink-0">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 text-base sm:text-lg" style={{ fontFamily: "'Cinzel', serif" }}>
                    Management & Control of Information
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    You may modify or remove your information at any time. Updating cookies or deleting temporary files may affect website performance.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 sm:p-5 md:p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="bg-slate-100 p-2 sm:p-3 rounded-lg flex-shrink-0">
                  <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 text-base sm:text-lg" style={{ fontFamily: "'Cinzel', serif" }}>
                    Information Security
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    We use advanced data protection systems to safeguard your information. However, no system is entirely foolproof. Users are advised to use strong passwords and avoid sharing personal information with unverified sources.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hotel Policies Section */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3" style={{ fontFamily: "'Cinzel', serif" }}>
            <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-slate-700 flex-shrink-0" />
            <span>Hotel Policies</span>
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {policies.map((policy, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 sm:p-5 md:p-6 shadow-sm border border-slate-200 hover:border-slate-300 transition-colors"
              >
                <h3 className="font-bold text-slate-900 mb-2 text-base sm:text-lg" style={{ fontFamily: "'Cinzel', serif" }}>
                  {policy.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
                  {policy.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-8 sm:mt-10 md:mt-12 text-center px-4">
          <p className="text-slate-600 mb-4 text-sm sm:text-base">
            Have questions about our terms and conditions?
          </p>
          <button 
            onClick={handleWhatsApp}
            className="w-full sm:w-auto bg-[#f5d36c] hover:bg-[#e0c45a] text-black px-6 sm:px-8 py-3 uppercase tracking-widest text-xs sm:text-sm font-semibold transition-all duration-300 shadow-md min-h-[48px]"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}