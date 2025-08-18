import { useState, useEffect } from "react";
import banner from "../assets/banner.jpeg";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Trophy,
  Users,
  BookOpen,
} from "lucide-react";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      id: 1,
      title: "Welcome to Alpha Coaching Institute",
      subtitle: "Your Gateway to Success in Competitive Exams",
      description:
        "State-of-the-art facilities, expert mentorship, and personalized guidance for your success",
      image: banner,
      cta: "Join Now",
      badge: "Grand Opening",
      gradient: "from-blue-600 via-purple-600 to-indigo-700",
    },
    {
      id: 2,
      title: "Welcome to Ujjawal Academy Mauganj",
      subtitle: "Your Gateway to Success in Competitive Exams",
      description:
        "State-of-the-art facilities, expert mentorship, and personalized guidance for your success",
      image: "/path/to/your/coaching-banner.jpg", // Replace with your actual banner image path
      cta: "Join Now",
      badge: "Grand Opening",
      gradient: "from-blue-600 via-purple-600 to-indigo-700",
    },
    {
      id: 3,
      title: "Railway Exam Success",
      subtitle: "Master Railway NTPC, Group D & ALP",
      description: "Comprehensive coaching with 95% success rate",
      image:
        "https://images.pexels.com/photos/5212700/pexels-photo-5212700.jpeg?auto=compress&cs=tinysrgb&w=1200",
      cta: "Start Learning",
      badge: "New Batch",
      gradient: "from-emerald-600 via-teal-600 to-cyan-700",
    },
    {
      id: 4,
      title: "SSC CGL Preparation",
      subtitle: "Master SSC CGL & CHSL Exams",
      description:
        "Complete preparation with expert faculty and proven results",
      image:
        "https://images.pexels.com/photos/5212329/pexels-photo-5212329.jpeg?auto=compress&cs=tinysrgb&w=1200",
      cta: "Start Learning",
      badge: "Popular Course",
      gradient: "from-purple-600 via-indigo-600 to-blue-700",
    },
    {
      id: 5,
      title: "MPSI & Police Preparation",
      subtitle: "Become a Police Officer with Expert Guidance",
      description:
        "Physical training, written exam prep, and interview guidance",
      image:
        "https://images.pexels.com/photos/5212662/pexels-photo-5212662.jpeg?auto=compress&cs=tinysrgb&w=1200",
      cta: "Join Today",
      badge: "Best Results",
      gradient: "from-orange-600 via-red-600 to-pink-700",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="relative h-[600px] overflow-hidden rounded-2xl mx-4 sm:mx-6 lg:mx-8 mt-8 shadow-2xl">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
            index === currentSlide
              ? "translate-x-0"
              : index < currentSlide
              ? "-translate-x-full"
              : "translate-x-full"
          }`}
        >
          <div
            className={`relative h-full ${
              index === 0
                ? "overflow-hidden"
                : `bg-gradient-to-r ${banner.gradient} overflow-hidden`
            }`}
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <img
                src={banner.image}
                alt={banner.title}
                className={`w-full h-full object-cover ${
                  index === 0 ? "" : "opacity-20"
                }`}
              />
              {index !== 0 && (
                <div className="absolute inset-0 bg-black/30"></div>
              )}
            </div>

            {/* Animated Background Elements - only for non-first banners */}
            {index !== 0 && (
              <div className="absolute inset-0">
                <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
                <div
                  className="absolute top-32 right-20 w-16 h-16 bg-white/10 rounded-full animate-float"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className="absolute bottom-20 left-32 w-12 h-12 bg-white/10 rounded-full animate-float"
                  style={{ animationDelay: "2s" }}
                ></div>
                <div
                  className="absolute bottom-32 right-10 w-24 h-24 bg-white/10 rounded-full animate-float"
                  style={{ animationDelay: "0.5s" }}
                ></div>
              </div>
            )}

            {/* Content - Hidden only for first banner */}
            <div
              className={`relative z-10 h-full flex items-center ${
                index === 0 ? "hidden" : ""
              }`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="text-white">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-6 animate-fade-in-up">
                      <Star className="h-4 w-4 mr-2" />
                      {banner.badge}
                    </div>

                    <h1 className="text-5xl lg:text-6xl font-bold mb-4 animate-slide-in-left">
                      {banner.title}
                    </h1>

                    <h2
                      className="text-2xl lg:text-3xl font-semibold mb-6 text-white/90 animate-slide-in-left"
                      style={{ animationDelay: "0.2s" }}
                    >
                      {banner.subtitle}
                    </h2>

                    <p
                      className="text-xl mb-8 text-white/80 leading-relaxed animate-slide-in-left"
                      style={{ animationDelay: "0.4s" }}
                    >
                      {banner.description}
                    </p>

                    <div
                      className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
                      style={{ animationDelay: "0.6s" }}
                    >
                      <button className="btn-hover-effect bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                        {banner.cta}
                      </button>
                      <button className="btn-hover-effect border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300">
                        Learn More
                      </button>
                    </div>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 gap-4 animate-slide-in-right">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-white text-center hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                      <Users className="h-8 w-8 mx-auto mb-3" />
                      <div className="text-2xl font-bold">15K+</div>
                      <div className="text-sm opacity-90">Students</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-white text-center hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                      <Trophy className="h-8 w-8 mx-auto mb-3" />
                      <div className="text-2xl font-bold">95%</div>
                      <div className="text-sm opacity-90">Success Rate</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-white text-center hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                      <BookOpen className="h-8 w-8 mx-auto mb-3" />
                      <div className="text-2xl font-bold">50+</div>
                      <div className="text-sm opacity-90">Expert Faculty</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-white text-center hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                      <Star className="h-8 w-8 mx-auto mb-3" />
                      <div className="text-2xl font-bold">10+</div>
                      <div className="text-sm opacity-90">Years Exp</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 z-20"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 z-20"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
