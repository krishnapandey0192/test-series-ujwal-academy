import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, BookOpen, Phone, Mail } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navItems = [
    { name: "Home", to: "/" },
    { name: "Test Series", to: "/test-series" },
    { name: "Leaderboard", to: "/leaderboard", icon: "🏆" },
  ];

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("username") || "";
    const email = localStorage.getItem("email") || "";
    setIsLoggedIn(!!token);
    setUserName(name);
    setUserEmail(email);
  }, [location]);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
          : "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16 min-h-[4rem]">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 p-2 lg:p-3 rounded-2xl shadow-xl group-hover:scale-110 transition-all duration-300">
                <BookOpen className="h-6 w-6 lg:h-7 lg:w-7 text-white drop-shadow-sm" />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-base sm:text-lg lg:text-xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-800 bg-clip-text text-transparent">
                  Ujjawal Academy
                </span>
              </h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs lg:text-sm font-bold text-gray-600 tracking-wide">
                  MAUGANJ
                </span>
                <div className="h-1 w-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </div>
              <p className="text-[10px] lg:text-xs text-gray-500 font-medium mt-0.5 tracking-wide">
                Excellence in Education
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-2 items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={`px-3 py-2 font-semibold rounded-lg transition-all duration-300 ${
                  location.pathname === item.to
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:text-blue-600"
                } ${
                  item.name === "Leaderboard"
                    ? "bg-gradient-to-r from-green-400 to-blue-500 text-white shadow hover:from-green-500 hover:to-blue-600"
                    : ""
                }`}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.name}
              </Link>
            ))}
            {!isLoggedIn ? (
              <>
                {/* <Link
                  to="/login"
                  className="ml-2 px-4 py-2 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                >
                  Login
                </Link> */}
                <Link
                  to="/register"
                  className="ml-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/my-tests"
                  className="ml-2 px-4 py-2 border border-purple-600 text-purple-600 font-semibold rounded-lg hover:bg-purple-600 hover:text-white transition-all"
                >
                  My Tests
                </Link>
                {/* <button
                  onClick={() => setIsLoggedIn(false)}
                  className="ml-2 px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-all"
                >
                  Logout
                </button> */}
              </>
            )}
          </nav>

          {/* Contact info and Profile (right side) */}
          <div className="hidden lg:flex text-sm text-gray-600 gap-2 pl-4 items-center">
            <span>
              +91 8878979958 <br /> ujjwalacedemymaugnaj@gmail.com
            </span>
            {isLoggedIn && (
              <div className="relative flex items-center ml-4">
                <button
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg flex items-center justify-center shadow-lg focus:outline-none border-2 border-white hover:scale-105 transition"
                  onClick={() => setShowProfileDropdown((prev) => !prev)}
                  aria-label="Open profile menu"
                >
                  {userName
                    ? userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                    : "UA"}
                </button>
                {showProfileDropdown && (
                  <div className="absolute right-0 top-10 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 z-50 animate-fade-in">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="font-semibold text-gray-800">
                        {userName || "Ujjawal Academy"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {userEmail || "user@email.com"}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        // Optionally navigate to profile page
                      }}
                      className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 transition"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        localStorage.clear();
                        setIsLoggedIn(false);
                        setShowProfileDropdown(false);
                        setUserName("");
                        setUserEmail("");
                        window.location.href = "/";
                      }}
                      className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-b-xl transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-all"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen Drawer Modal */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] sm:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          ></div>

          {/* Drawer */}
          <div className="absolute right-0 top-0 w-80 max-w-[85vw] h-screen bg-white shadow-2xl overflow-y-auto">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">Menu</h2>
                    <p className="text-xs text-gray-500">Ujjawal Academy</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <X className="h-6 w-6 text-gray-600" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-6 space-y-3">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      setIsMenuOpen(false);
                      window.location.href = item.to;
                    }}
                    className={`flex items-center gap-3 p-4 rounded-xl font-semibold transition-all duration-300 w-full ${
                      item.name === "Leaderboard"
                        ? "bg-gradient-to-r from-amber-400 to-red-500 text-white shadow-lg"
                        : location.pathname === item.to
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                    }`}
                  >
                    {item.icon && (
                      <span className="mr-2 text-lg">{item.icon}</span>
                    )}
                    <span>{item.name}</span>
                    {item.name === "Leaderboard" && (
                      <div className="ml-auto h-2 w-2 bg-red-600 rounded-full animate-pulse"></div>
                    )}
                  </button>
                ))}

                {/* Auth Buttons - Right after navigation items */}
                <div className="space-y-3 pt-4">
                  {!isLoggedIn ? (
                    <>
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          window.location.href = "/login";
                        }}
                        className="block w-full px-4 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl text-center hover:bg-blue-600 hover:text-white transition-all duration-300"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          window.location.href = "/register";
                        }}
                        className="block w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl text-center hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                      >
                        Register
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          window.location.href = "/my-tests";
                        }}
                        className="block w-full px-4 py-3 border-2 border-purple-600 text-purple-600 font-semibold rounded-xl text-center hover:bg-purple-600 hover:text-white transition-all duration-300"
                      >
                        My Tests
                      </button>
                      <button
                        onClick={() => {
                          localStorage.clear();
                          setIsLoggedIn(false);
                          setIsMenuOpen(false);
                          setUserName("");
                          setUserEmail("");
                          window.location.href = "/";
                        }}
                        className="block w-full px-4 py-3 bg-gray-600 text-white font-semibold rounded-xl text-center hover:bg-gray-700 transition-all duration-300"
                      >
                        Logout
                      </button>
                    </>
                  )}
                </div>
              </nav>

              {/* Contact Info - Moved to bottom */}
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <h3 className="font-semibold text-gray-800 mb-3">Contact Us</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span>+91 8878979958</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span className="text-xs">
                      ujjwalacedemymaugnaj@gmail.com
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
