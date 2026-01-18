import React from "react";
import { Helmet } from "react-helmet-async";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export type Course = {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription?: string;
  canonical?: string;
  syllabus?: { phase: string; subjects: string[] }[];
  features?: string[];
  eligibility?: string[];
};

const CoursePage: React.FC<{ course: Course }> = ({ course }) => {
  const {
    title,
    shortDescription,
    longDescription,
    syllabus = [],
    features = [],
    eligibility = [],
    canonical,
  } = course;

  return (
    <>
      <Helmet>
        <title>{`${title} | Ujjwal Academy Mauganj`}</title>
        <meta name="description" content={shortDescription} />
        <meta
          name="keywords"
          content={`${title}, Ujjwal Academy, coaching, Mauganj`}
        />
        <meta name="robots" content="index, follow" />
        {canonical && <link rel="canonical" href={canonical} />}

        {/* Structured Data */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "${title}",
            "description": "${shortDescription}",
            "provider": {
              "@type": "EducationalOrganization",
              "name": "Ujjwal Academy Mauganj",
              "url": "https://ujjwalacademymauganj.in"
            }
          }
        `}</script>
      </Helmet>

      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white mb-12">
            <div className="flex items-center mb-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{title}</h1>
            </div>
            <p className="text-lg opacity-90">{shortDescription}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {longDescription && (
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    About this course
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {longDescription}
                  </p>
                </div>
              )}

              {syllabus.length > 0 && (
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Exam Pattern & Syllabus
                  </h2>
                  <div className="space-y-6">
                    {syllabus.map((tier, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-blue-600 pl-4"
                      >
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {tier.phase}
                        </h3>
                        <ul className="space-y-2">
                          {tier.subjects.map((subject, idx) => (
                            <li
                              key={idx}
                              className="flex items-start text-gray-700"
                            >
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              {subject}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {features.length > 0 && (
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    What You'll Get
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="space-y-6">
              {eligibility.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Eligibility Criteria
                  </h3>
                  <ul className="space-y-3 text-gray-700 text-sm">
                    {eligibility.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                <h3 className="text-2xl font-bold mb-3">Ready to Start?</h3>
                <p className="mb-6 opacity-90">
                  Contact us to enroll or get counseling.
                </p>
                <Link
                  to="/admissions"
                  className="block w-full bg-white text-blue-600 text-center py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Enroll Now <ArrowRight className="inline h-5 w-5 ml-2" />
                </Link>
                <Link
                  to="/contact"
                  className="block w-full mt-3 bg-transparent border-2 border-white text-white text-center py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default CoursePage;
