import React, { useState } from "react";
import {
  Clock,
  Users,
  BookOpen,
  ArrowRight,
  Star,
  Trophy,
  Target,
  Zap,
} from "lucide-react";

const Courses = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "SSC", "Railway", "Police", "Others"];

  const courses = [
    {
      title: "SSC CGL",
      category: "SSC",
      description:
        "Complete preparation for Staff Selection Commission Combined Graduate Level examination",
      duration: "12 Months",
      students: "2500+",
      subjects: [
        "Quantitative Aptitude",
        "English",
        "General Studies",
        "Reasoning",
      ],
      price: "₹4,500",
      originalPrice: "₹6,000",
      popular: true,
      rating: 4.9,
      image:
        "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: [
        "Live Classes",
        "Mock Tests",
        "Study Material",
        "Doubt Sessions",
      ],
      gradient: "from-blue-600 to-purple-600",
    },
    {
      title: "SSC CPO",
      category: "SSC",
      description:
        "Comprehensive coaching for Central Police Organization examination",
      duration: "10 Months",
      students: "1800+",
      subjects: [
        "General Studies",
        "Quantitative Aptitude",
        "English",
        "Hindi",
      ],
      price: "₹4,200",
      originalPrice: "₹5,500",
      popular: false,
      rating: 4.8,
      image:
        "https://images.pexels.com/photos/5212662/pexels-photo-5212662.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: [
        "Physical Training",
        "Written Exam Prep",
        "Interview Guidance",
        "Medical Test Prep",
      ],
      gradient: "from-emerald-600 to-teal-600",
    },
    {
      title: "Railway NTPC",
      category: "Railway",
      description: "Non-Technical Popular Categories examination preparation",
      duration: "12 Months",
      students: "2200+",
      subjects: [
        "General Awareness",
        "Mathematics",
        "General Intelligence",
        "General Science",
      ],
      price: "₹4,800",
      originalPrice: "₹6,200",
      popular: true,
      rating: 4.9,
      image:
        "https://images.pexels.com/photos/5212700/pexels-photo-5212700.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: [
        "CBT Preparation",
        "Skill Test",
        "Document Verification",
        "Medical Exam",
      ],
      gradient: "from-orange-600 to-red-600",
    },
    {
      title: "MPSI & MP Police",
      category: "Police",
      description:
        "Madhya Pradesh Police Sub Inspector and Constable preparation",
      duration: "9 Months",
      students: "1500+",
      subjects: [
        "General Knowledge",
        "General Hindi",
        "Mathematics",
        "General Science",
      ],
      price: "₹3,800",
      originalPrice: "₹5,000",
      popular: false,
      rating: 4.7,
      image:
        "https://images.pexels.com/photos/5212649/pexels-photo-5212649.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: [
        "Physical Training",
        "Written Test",
        "Interview Prep",
        "Medical Test",
      ],
      gradient: "from-purple-600 to-pink-600",
    },
    {
      title: "Railway Group D",
      category: "Railway",
      description: "Railway Recruitment Board Group D examination coaching",
      duration: "8 Months",
      students: "2800+",
      subjects: [
        "Mathematics",
        "General Intelligence",
        "General Science",
        "General Awareness",
      ],
      price: "₹3,500",
      originalPrice: "₹4,500",
      popular: true,
      rating: 4.8,
      image:
        "https://images.pexels.com/photos/5212710/pexels-photo-5212710.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: [
        "CBT Coaching",
        "PET Training",
        "Document Verification",
        "Medical Exam",
      ],
      gradient: "from-cyan-600 to-blue-600",
    },
    {
      title: "SSC GD",
      category: "SSC",
      description: "Specialized training for General Duty Constable positions",
      duration: "8 Months",
      students: "3200+",
      subjects: [
        "General Intelligence",
        "General Knowledge",
        "Elementary Mathematics",
        "English/Hindi",
      ],
      price: "₹3,200",
      originalPrice: "₹4,200",
      popular: false,
      rating: 4.6,
      image:
        "https://images.pexels.com/photos/5212680/pexels-photo-5212680.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: [
        "Written Exam",
        "Physical Test",
        "Medical Test",
        "Document Verification",
      ],
      gradient: "from-indigo-600 to-purple-600",
    },
  ];

  const filteredCourses =
    activeCategory === "All"
      ? courses
      : courses.filter((course) => course.category === activeCategory);

  return (
    <section
      id="courses"
      className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-40 left-20 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-40 right-20 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Courses
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Comprehensive coaching programs designed to help you excel in
            competitive examinations
          </p>
        </div>

        {/* Category Filter */}
        <div
          className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredCourses.map((course, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden transform hover:-translate-y-1 hover:scale-101 animate-fade-in-up min-h-[220px] flex flex-col"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Course Image */}
              <div className="relative h-20 sm:h-24 md:h-28 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${course.gradient} opacity-60`}
                ></div>
                {/* Badges */}
                <div className="absolute top-1 left-1 flex flex-col gap-0.5">
                  {course.popular && (
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow animate-pulse">
                      🔥 Most Popular
                    </span>
                  )}
                  <div className="flex items-center bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full text-xs font-semibold">
                    <Star className="h-3 w-3 mr-1 fill-current text-yellow-400" />
                    {course.rating}
                  </div>
                </div>
                {/* Price Badge */}
                <div className="absolute top-1 right-1 text-right">
                  <div className="text-white text-base font-extrabold">
                    {course.price}
                  </div>
                  <div className="text-white/80 text-xs line-through">
                    {course.originalPrice}
                  </div>
                </div>
              </div>
              <div className="p-2 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-[17px] font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1">
                      {course.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-2 text-sm leading-snug line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1 text-blue-500" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-3 w-3 mr-1 text-emerald-500" />
                      {course.students}
                    </div>
                  </div>
                  {/* Features */}
                  <div className="mb-1">
                    <h4 className="font-semibold text-gray-900 mb-0.5 flex items-center text-xs">
                      <Zap className="h-3 w-3 mr-1 text-yellow-500" />
                      Key Features
                    </h4>
                    <div className="grid grid-cols-2 gap-0.5">
                      {course.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 px-2 py-0.5 rounded-full text-[11px] font-medium line-clamp-1"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Subjects */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-0.5 flex items-center text-xs">
                      <BookOpen className="h-3 w-3 mr-1 text-purple-500" />
                      Subjects
                    </h4>
                    <div className="flex flex-wrap gap-0.5">
                      {course.subjects.map((subject, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-[11px] line-clamp-1"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  className={`btn-hover-effect w-full bg-gradient-to-r ${course.gradient} text-white py-1.5 mt-2 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group-hover:scale-105`}
                >
                  Enroll Now{" "}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in-up">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
            <Target className="h-16 w-16 mx-auto mb-6 animate-pulse" />
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Can't find the course you're looking for?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              We offer specialized coaching for many more competitive exams
            </p>
            <button className="btn-hover-effect bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              View All Courses
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses;
