import React from "react";
import { ArrowRight, Star, Users, Trophy, BookOpen, Play } from "lucide-react";

const Hero = () => {
  const stats = [
    {
      icon: Users,
      label: "Students Enrolled",
      value: "5,00+",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Trophy,
      label: "Success Rate",
      value: "95%",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: BookOpen,
      label: "Expert Faculty",
      value: "10+",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Star,
      label: "Years Experience",
      value: "5+",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section
      id="home"
      className="pt-16 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center">
          <div className="mb-8 animate-fade-in-up">
            <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <Star
                className="h-4 w-4 mr-2 animate-spin"
                style={{ animationDuration: "3s" }}
              />
              India's Leading Competition Coaching Academy
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-8 leading-tight animate-slide-in-left">
            Your Success is Our
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent block animate-slide-in-right">
              Mission
            </span>
          </h1>

          <p
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            Master competitive exams with expert guidance. From SSC to Railway,
            we provide comprehensive coaching that transforms your dreams into
            achievements.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <button className="btn-hover-effect bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-10 py-5 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 flex items-center justify-center group">
              Start Your Journey
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button className="btn-hover-effect border-3 border-gray-300 text-gray-700 px-10 py-5 rounded-xl font-bold text-lg hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center group">
              <Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
              Watch Demo
            </button>
          </div>

          {/* Enhanced Stats Grid */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.8s" }}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border border-white/50"
              >
                <div
                  className={`bg-gradient-to-r ${stat.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300 shadow-lg`}
                >
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-black text-gray-900 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Floating Achievement Badges */}
          <div className="absolute top-20 left-10 animate-float hidden lg:block">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              🏆 Grand Opening: Alpha Institute 2025
            </div>
          </div>

          <div
            className="absolute top-40 right-10 animate-float hidden lg:block"
            style={{ animationDelay: "1s" }}
          >
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              🚀 Join 500+ Founding Students
            </div>
          </div>

          <div
            className="absolute bottom-40 left-20 animate-float hidden lg:block"
            style={{ animationDelay: "2s" }}
          >
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              � Personalized Mentorship & Modern Campus
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
