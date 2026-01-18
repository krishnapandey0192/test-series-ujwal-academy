// import React from 'react';
import {
  Video,
  FileText,
  Users,
  Award,
  Clock,
  Smartphone,
  Headphones,
  TrendingUp,
  Zap,
  Shield,
  Heart,
  Target,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Video,
      title: "Live Online Classes",
      description:
        "Interactive live sessions with expert faculty members for real-time doubt resolution",
      color: "from-blue-500 to-cyan-500",
      delay: "0s",
    },
    {
      icon: FileText,
      title: "Study Materials",
      description:
        "Comprehensive study materials and practice papers designed by subject experts",
      color: "from-emerald-500 to-teal-500",
      delay: "0.1s",
    },
    {
      icon: Users,
      title: "Small Batch Size",
      description:
        "Limited students per batch to ensure personalized attention and better learning",
      color: "from-purple-500 to-pink-500",
      delay: "0.2s",
    },
    {
      icon: Award,
      title: "Mock Tests",
      description:
        "Regular mock tests with detailed analysis to track your progress and performance",
      color: "from-orange-500 to-red-500",
      delay: "0.3s",
    },
    {
      icon: Clock,
      title: "Flexible Timings",
      description:
        "Multiple batch timings to accommodate working professionals and students",
      color: "from-indigo-500 to-purple-500",
      delay: "0.4s",
    },
    {
      icon: Smartphone,
      title: "Mobile App",
      description:
        "Learn on-the-go with our mobile app featuring lectures, tests, and study materials",
      color: "from-pink-500 to-rose-500",
      delay: "0.5s",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description:
        "Round-the-clock academic and technical support for all your queries",
      color: "from-cyan-500 to-blue-500",
      delay: "0.6s",
    },
    {
      icon: TrendingUp,
      title: "Performance Analytics",
      description:
        "Detailed performance analytics to help you identify strengths and weaknesses",
      color: "from-green-500 to-emerald-500",
      delay: "0.7s",
    },
  ];

  return (
    <section
      id="features"
      className="py-20 bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-300/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-56 h-56 bg-purple-300/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-300/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Ujjwal Academy
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We provide comprehensive features and services to ensure your
            success in competitive examinations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-white/50 hover:shadow-2xl hover:border-blue-200 transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: feature.delay }}
            >
              <div
                className={`bg-gradient-to-r ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-xl`}
              >
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <div
          className="relative animate-fade-in-up"
          style={{ animationDelay: "0.8s" }}
        >
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 md:p-16 text-center text-white shadow-2xl overflow-hidden relative">
            {/* Background Animation Elements */}
            <div className="absolute inset-0">
              <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
              <div
                className="absolute top-20 right-20 w-16 h-16 bg-white/10 rounded-full animate-float"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute bottom-10 left-20 w-24 h-24 bg-white/10 rounded-full animate-float"
                style={{ animationDelay: "2s" }}
              ></div>
              <div
                className="absolute bottom-20 right-10 w-12 h-12 bg-white/10 rounded-full animate-float"
                style={{ animationDelay: "0.5s" }}
              ></div>
            </div>

            <div className="relative z-10">
              <div className="flex justify-center mb-8">
                <div className="flex space-x-4">
                  <Zap className="h-12 w-12 text-yellow-300 animate-pulse" />
                  <Target
                    className="h-12 w-12 text-green-300 animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  />
                  <Heart
                    className="h-12 w-12 text-pink-300 animate-pulse"
                    style={{ animationDelay: "1s" }}
                  />
                </div>
              </div>

              <h3 className="text-4xl md:text-5xl font-black mb-6">
                Ready to Start Your Journey?
              </h3>
              <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
                Join thousands of successful students who achieved their dreams
                with Ujjwal Academy
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="btn-hover-effect bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 flex items-center justify-center group">
                  <FileText className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                  Download Brochure
                </button>
                <button className="btn-hover-effect border-3 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center group">
                  <Video className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                  Book Free Demo
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-white/20">
                <div className="text-center">
                  <Shield className="h-8 w-8 mx-auto mb-2 text-green-300" />
                  <div className="text-sm opacity-90">100% Safe</div>
                </div>
                <div className="text-center">
                  <Award className="h-8 w-8 mx-auto mb-2 text-yellow-300" />
                  <div className="text-sm opacity-90">Certified</div>
                </div>
                <div className="text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-blue-300" />
                  <div className="text-sm opacity-90">15K+ Students</div>
                </div>
                <div className="text-center">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 text-emerald-300" />
                  <div className="text-sm opacity-90">95% Success</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
