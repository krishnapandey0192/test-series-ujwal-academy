import { useState } from "react";
import { MessageCircle, X, Phone, Mail } from "lucide-react";

const WhatsAppButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleWhatsAppClick = () => {
    const phoneNumber = "+918878979958";
    const message = encodeURIComponent(
      "Hi! I would like to know more about the courses at Ujjwal Academy.",
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleCallClick = () => {
    window.open("tel:+918878979958", "_self");
  };

  const handleEmailClick = () => {
    window.open("mailto:ujjwalacedemymaugnaj@gmail.com", "_self");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Menu */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 mb-4 animate-fade-in-up">
          <div className="bg-white rounded-2xl shadow-2xl p-4 border border-gray-100 min-w-[200px]">
            <div className="space-y-3">
              <button
                onClick={handleWhatsAppClick}
                className="flex items-center w-full p-3 rounded-xl bg-green-50 hover:bg-green-100 text-green-700 transition-all duration-300 group"
              >
                <MessageCircle className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">WhatsApp Chat</span>
              </button>

              <button
                onClick={handleCallClick}
                className="flex items-center w-full p-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 transition-all duration-300 group"
              >
                <Phone className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">Call Now</span>
              </button>

              <button
                onClick={handleEmailClick}
                className="flex items-center w-full p-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 transition-all duration-300 group"
              >
                <Mail className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">Send Email</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform transition-all duration-300 group relative ${
          isExpanded
            ? "rotate-45 scale-110"
            : "hover:scale-110 animate-pulse-slow"
        }`}
        aria-label="Contact Options"
      >
        {isExpanded ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}

        {/* Ripple Effect */}
        <div className="absolute inset-0 rounded-full bg-green-400 opacity-30 animate-ping"></div>

        {/* Tooltip */}
        {!isExpanded && (
          <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
            Need Help? Contact Us!
          </span>
        )}
      </button>
    </div>
  );
};

export default WhatsAppButton;
