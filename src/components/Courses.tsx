import { useState } from "react";
import {
  ArrowRight,
  Target,
} from "lucide-react";
import coursesData from "../data/coursesData";
import { Link } from "react-router-dom";

const Courses = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "SSC", "Railway", "Police", "Others"];

  // Use central courses data for DRY structure
  const mappedCourses = coursesData;

  const filteredCourses =
    activeCategory === "All"
      ? mappedCourses
      : mappedCourses.filter((course) => {
          const t = course.title.toLowerCase();
          if (activeCategory === "SSC") return t.includes("ssc");
          if (activeCategory === "Railway") return t.includes("railway");
          if (activeCategory === "Police")
            return t.includes("police") || t.includes("mpsi");
          return true;
        });

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
              key={course.slug}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden transform hover:-translate-y-1 animate-fade-in-up min-h-[220px] flex flex-col"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {/* Header */}
              <div className="h-28 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white">
                <h3 className="text-xl font-bold">{course.title}</h3>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-gray-600 mb-3 text-sm leading-snug line-clamp-3">
                    {course.shortDescription}
                  </p>

                  {course.syllabus && course.syllabus.length > 0 && (
                    <div className="mb-3">
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm">
                        Key Topics
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {(course.syllabus[0].subjects || [])
                          .slice(0, 6)
                          .map((s, i) => (
                            <span
                              key={i}
                              className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-[11px]"
                            >
                              {s}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}

                  {course.features && (
                    <div className="mb-2">
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm">
                        Features
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {course.features.slice(0, 6).map((f, i) => (
                          <span
                            key={i}
                            className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-[11px]"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Link
                  to={`/courses/${course.slug}`}
                  className="mt-4 inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-xl font-semibold"
                >
                  View Course <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
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
