import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, BookOpen } from "lucide-react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const primaryNav = [
    { name: "About Us", to: "/about" },
    { name: "Courses", to: "/courses" },
    { name: "Admissions", to: "/admissions" },
    { name: "Contact", to: "/contact" },
    // { name: "Privacy Policy", to: "/privacy-policy" },
    { name: "Test Series", to: "/test-series" },
    { name: "Leaderboard", to: "/leaderboard" },
  ];

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [_userName, setUserName] = useState("");
  const [_userEmail, setUserEmail] = useState("");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("username") || "";
    const email = localStorage.getItem("email") || "";
    setIsLoggedIn(!!token);
    setUserName(name);
    setUserEmail(email);
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserName("");
    setUserEmail("");
    setShowProfileDropdown(false);
    setIsMenuOpen(false);
    navigate("/");
  };

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
          : "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavLink
            to="/"
            aria-label="Ujjwal Academy Mauganj homepage"
            className="flex items-center gap-3"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
              <BookOpen className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="flex flex-col leading-tight">
              <h1 className="text-base sm:text-lg lg:text-xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Ujjwal Academy Mauganj
              </h1>
              <p className="text-xs sm:text-sm text-gray-600">
                SSC, Railway &amp; MPSI Coaching Institute
              </p>
            </div>
          </NavLink>

          <nav aria-label="Primary Navigation" className="hidden md:block">
            <ul className="flex items-center gap-2">
              {primaryNav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `px-2 py-1 font-medium rounded-md ${
                        isActive
                          ? "text-blue-700 bg-blue-50"
                          : "text-gray-700 hover:text-blue-600"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {!isLoggedIn ? (
              <NavLink
                to="/register"
                className="ml-2 px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-md text-sm"
              >
                Register
              </NavLink>
            ) : (
              <>
                <NavLink
                  to="/my-tests"
                  className="ml-2 px-3 py-2 border border-purple-600 text-purple-600 font-semibold rounded-md text-sm"
                >
                  My Tests
                </NavLink>

                <div className="relative">
                  <button
                    onClick={() => setShowProfileDropdown((s) => !s)}
                    aria-haspopup="true"
                    aria-expanded={showProfileDropdown}
                    className="ml-2 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold flex items-center justify-center focus:outline-none"
                  >
                    {_userName && _userName.length > 0
                      ? _userName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()
                      : "UA"}
                  </button>

                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg z-50">
                      <NavLink
                        to="/profile"
                        onClick={() => setShowProfileDropdown(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Profile
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[120] md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />

          <aside className="absolute right-0 top-0 h-screen w-80 max-w-[90vw] bg-white shadow-2xl overflow-y-auto border-l border-gray-100">
            <div className="flex items-center justify-between p-4 border-b">
              <NavLink
                to="/"
                aria-label="Ujjwal Academy Mauganj homepage"
                className="flex items-center gap-3"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                  <BookOpen className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-semibold text-base">
                    Ujjwal Academy Mauganj
                  </h2>
                  <p className="text-xs text-gray-500">
                    SSC, Railway &amp; MPSI Coaching Institute
                  </p>
                </div>
              </NavLink>
              <button
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
                className="p-2"
              >
                <X className="h-6 w-6 text-gray-700" />
              </button>
            </div>

            <nav aria-label="Primary Navigation Mobile" className="p-4">
              <ul className="flex flex-col gap-3">
                {primaryNav.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) =>
                        `block w-full text-left px-4 py-3 rounded-md font-medium ${
                          isActive
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-800 hover:bg-gray-50"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                {!isLoggedIn ? (
                  <NavLink
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md"
                  >
                    Register
                  </NavLink>
                ) : (
                  <>
                    <NavLink
                      to="/my-tests"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full text-center px-4 py-3 border border-purple-600 text-purple-600 rounded-md"
                    >
                      My Tests
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="mt-3 block w-full text-center px-4 py-3 bg-gray-100 text-gray-700 rounded-md"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </nav>
          </aside>
        </div>
      )}
    </header>
  );
};

export default Header;
