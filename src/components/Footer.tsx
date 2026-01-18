import {
  BookOpen,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

import { Link } from "react-router-dom";

const Footer = () => {
  const quickLinks = [
    { name: "About Us", to: "/about" },
    { name: "Courses", to: "/courses" },
    { name: "Features", to: "/features" },
    { name: "Success Stories", to: "/success-stories" },
    { name: "Contact", to: "/contact" },
    { name: "Admissions", to: "/admissions" },
  ];

  const courses = [
    { name: "SSC CGL", to: "/courses/ssc-cgl" },
    { name: "SSC CHSL", to: "/courses/ssc-chsl" },
    { name: "SSC GD", to: "/courses/ssc-gd" },
    { name: "Railway NTPC", to: "/courses/railway-ntpc" },
    { name: "MP Police", to: "/courses/mp-police" },
    { name: "Patwari", to: "/courses/patwari" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Academy Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Ujjwal Academy</h3>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering students to achieve their dreams through quality
              education and expert guidance in competitive exam preparation.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="bg-gray-800 p-2 rounded-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Courses */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Popular Courses</h4>
            <ul className="space-y-3">
              {courses.map((course) => (
                <li key={course.name}>
                  <Link
                    to={course.to}
                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {course.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-1 shrink-0" />
                <div>
                  <p className="text-gray-300">Behind SKNPG College,</p>
                  <p className="text-gray-300">
                    Guru Vashisht ITI Building 1st Floor, Mauganj | Rewa
                  </p>
                  <p className="text-gray-300">Madhya Pradesh - 486331</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400 shrink-0" />
                <a
                  href="tel:+918878979958"
                  className="text-gray-300 hover:text-white"
                >
                  +91 8878979958
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400 shrink-0" />
                <a
                  href="mailto:ujjwalacedemymauganj@gmail.com"
                  className="text-gray-300 hover:text-white"
                >
                  ujjwalacedemymauganj@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Ujjwal Academy. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/privacy-policy"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-service"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                to="/refund-policy"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
