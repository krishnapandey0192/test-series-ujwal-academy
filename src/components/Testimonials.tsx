import { useState, useEffect } from "react";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Medal,
  Award,
} from "lucide-react";
import shreyansh from "../assets/shreyansh.jpeg";
import neha from "../assets/neha.jpeg";
import neeraj from "../assets/neeraj.jpeg";
import kanchan from "../assets/kanchan.jpeg";
import rohit from "../assets/rohit.jpeg";
import shalini from "../assets/shalini.jpeg";

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    // {
    //   name: "Rajkamal",
    //   exam: "SSC CGL Preparation",
    //   position: "Current Student",
    //   image: Rajkumar,
    //   rating: 5,
    //   testimonial:
    //     "The teaching quality at Ujjwal Academy is exceptional. The faculty explains complex concepts in simple ways and provides individual attention to each student.",
    //   rank: "Batch Topper",
    //   gradient: "from-blue-500 to-cyan-500",
    // },
    {
      name: "Kanchan Shukla",
      exam: "MP POLICE & DELHI POLICE",
      position: "Current Student",
      image: kanchan,
      rating: 5,
      testimonial:
        "Ujjwal Academy provides excellent physical training along with written exam preparation. The instructors are very supportive and motivating.",
      rank: "PT Champion",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      name: "Shalini Jaiswal",
      exam: "MP POLICE & RAILWAY NTPC",
      position: "Current Student",
      image: shalini,
      rating: 5,
      testimonial:
        "The doubt clearing sessions and personal guidance from teachers at Ujjwal Academy has boosted my confidence. I feel well-prepared for my upcoming exam.",
      rank: "Class Monitor",
      gradient: "from-orange-500 to-red-500",
    },
    {
      name: "Neeraj Goswami",
      exam: "MP POLICE & SSC GD",
      position: "Current Student",
      image: neeraj,
      rating: 5,
      testimonial:
        "I am very satisfied with the study material and regular test series at Ujjwal Academy. The mock tests help me track my progress and improve weak areas.",
      rank: "Top 10 in Class",
      gradient: "from-emerald-500 to-teal-500",
    },

    {
      name: "Rohit Prajapati",
      exam: "DELHI POLICE & SSC GD",
      position: "Current Student",
      image: rohit,
      rating: 5,
      testimonial:
        "The atmosphere at Ujjwal Academy is very positive and competitive. Daily practice tests and regular feedback help me stay focused on my preparation.",
      rank: "Star Performer",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      name: "Shreyansh Mishra",
      exam: "SSC CHSL & MP POLICE",
      position: "Current Student",
      image: shreyansh,
      rating: 5,
      testimonial:
        "Ujjwal Academy’s structured approach, doubt-solving sessions, and disciplined study environment have boosted my confidence. The faculty guidance keeps me motivated every day.",
      rank: "Top Achiever",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      name: "Neha",
      exam: "RAILWAY NTPC & GROUP D",
      position: "Current Student",
      image: neha,
      rating: 5,
      testimonial:
        "Regular mock tests and personal attention at Ujjwal Academy helped me improve my speed and accuracy. The competitive environment always pushes me to give my best.",
      rank: "Star Performer",
      gradient: "from-pink-500 to-red-500",
    },
    // {
    //   name: "Neeraj",
    //   exam: "Railway Group D Preparation",
    //   position: "Current Student",
    //   image: neeraj,
    //   rating: 5,
    //   testimonial:
    //     "Ujjwal Academy balanced approach of theory and practical training is perfect for Railway preparation. The faculty truly cares about student success.",
    //   rank: "Best Discipline",
    //   gradient: "from-cyan-500 to-blue-500",
    // },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section
      id="testimonials"
      className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden"
    >
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-48 h-48 bg-blue-200/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 right-20 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
            Student{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Reviews
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            What our current students say about their learning experience at
            Ujjwal Academy
          </p>
        </div>

        {/* Featured Testimonial Carousel */}
        <div
          className="relative mb-16 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="relative h-96 md:h-80">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ${
                    index === currentTestimonial
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-full"
                  }`}
                >
                  <div
                    className={`h-full bg-gradient-to-r ${testimonial.gradient} p-8 md:p-12 text-white relative overflow-hidden`}
                  >
                    {/* Background Elements */}
                    <div className="absolute inset-0">
                      <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                      <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                    </div>

                    <div className="relative z-10 grid md:grid-cols-3 gap-8 items-center h-full">
                      <div className="text-center md:text-left">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-32 h-32 object-cover object-top rounded"
                        />
                        <h3 className="text-2xl font-bold mb-2">
                          {testimonial.name}
                        </h3>
                        <p className="text-lg opacity-90 mb-1">
                          {testimonial.position}
                        </p>
                        <p className="text-sm opacity-75 mb-2">
                          {testimonial.exam}
                        </p>
                        <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                          <Trophy className="h-4 w-4 mr-1" />
                          {testimonial.rank}
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <Quote className="h-12 w-12 mb-6 opacity-50" />
                        <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6">
                          "{testimonial.testimonial}"
                        </blockquote>
                        <div className="flex items-center">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-6 w-6 text-yellow-300 fill-current mr-1"
                            />
                          ))}
                          <span className="ml-2 text-lg font-semibold">
                            {testimonial.rating}.0
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
              <button
                onClick={prevTestimonial}
                className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <button
                onClick={nextTestimonial}
                className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? "bg-white scale-125"
                      : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 relative transform hover:-translate-y-2 hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute -top-3 -left-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2 shadow-lg">
                <Quote className="h-4 w-4 text-white" />
              </div>

              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-14 object-cover object-top rounded mr-3"
                />
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-blue-600 font-semibold">
                    {testimonial.position}
                  </p>
                  <p className="text-xs text-gray-500">{testimonial.exam}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <span className="text-xs bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                  {testimonial.rank}
                </span>
              </div>

              <p className="text-gray-600 leading-relaxed italic text-sm group-hover:text-gray-700 transition-colors duration-300">
                "{testimonial.testimonial}"
              </p>
            </div>
          ))}
        </div>

        {/* Enhanced Achievement Stats */}
        <div
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 md:p-16 shadow-2xl relative overflow-hidden animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          {/* Background Animation */}
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
            <div className="text-center mb-12">
              <div className="flex justify-center space-x-4 mb-6">
                <Trophy className="h-12 w-12 text-yellow-300 animate-pulse" />
                <Medal
                  className="h-12 w-12 text-silver animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                />
                <Award
                  className="h-12 w-12 text-orange-300 animate-pulse"
                  style={{ animationDelay: "1s" }}
                />
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-white mb-4">
                Ujjwal Academy Achievements
              </h3>
              <p className="text-xl text-white/90">
                Excellence in competitive exam preparation
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              <div className="group">
                <div className="text-5xl md:text-6xl font-black mb-3 group-hover:scale-110 transition-transform duration-300">
                  350+
                </div>
                <div className="text-lg text-blue-100 font-semibold">
                  Current Students
                </div>
              </div>
              <div className="group">
                <div className="text-5xl md:text-6xl font-black mb-3 group-hover:scale-110 transition-transform duration-300">
                  15+
                </div>
                <div className="text-lg text-blue-100 font-semibold">
                  Course Batches
                </div>
              </div>
              <div className="group">
                <div className="text-5xl md:text-6xl font-black mb-3 group-hover:scale-110 transition-transform duration-300">
                  25+
                </div>
                <div className="text-lg text-blue-100 font-semibold">
                  Expert Faculty
                </div>
              </div>
              <div className="group">
                <div className="text-5xl md:text-6xl font-black mb-3 group-hover:scale-110 transition-transform duration-300">
                  8+
                </div>
                <div className="text-lg text-blue-100 font-semibold">
                  Years Experience
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
