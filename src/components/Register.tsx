import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Helmet } from "react-helmet-async";
import axiosInstance from "../utils/axiosInstance";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
    role: "student", // Add role property with default value
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [registering, setRegistering] = useState(false);
  const [registerError, setRegisterError] = useState("");

  const handleSubmit = async () => {
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    setRegistering(true);
    setRegisterError("");
    try {
      const { confirmPassword, mobileNumber, ...rest } = form;
      const payload = { ...rest, mobile: mobileNumber };
      await axiosInstance.post("/api/auth/register", payload);
      toast.success("Registration successful! Please login.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1200);
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Registration failed.";
      setRegisterError(msg);
      toast.error(msg);
    } finally {
      setRegistering(false);
    }
  };

  return (
    <>
      {/* ================= SEO ================= */}
      <Helmet>
        <title>
          Register at Ujjwal Academy Mauganj | SSC, Railway & MP Exam Coaching
        </title>

        <meta
          name="description"
          content="Register now at Ujjwal Academy Mauganj to join SSC, Railway, MPSI and government exam test series. Trusted coaching institute in Mauganj."
        />

        <meta
          name="keywords"
          content="Ujjwal Academy Mauganj Register, SSC Coaching Mauganj Registration, Railway Exam Coaching Mauganj, Government Exam Test Series Mauganj"
        />

        <meta name="robots" content="index, follow" />

        <link rel="canonical" href="https://ujjwalacademymauganj.in/register" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Ujjwal Academy Mauganj",
            "url": "https://ujjwalacademymauganj.in",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Mauganj",
              "addressRegion": "Madhya Pradesh",
              "addressCountry": "IN"
            }
          }
        `}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 flex items-center justify-center px-2 sm:px-4 md:px-8 py-6">
        <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-md md:max-w-xl relative">
          {/* Navigation Links */}

          <h2 className="text-xl sm:text-2xl font-bold text-center text-green-700 mb-6 mt-2">
            Register - Ujjwal Academy Mauganj
          </h2>

          {/* Centered Navigation Buttons */}
          <div className="flex xs:flex-row justify-center gap-3 xs:gap-4 mb-6 items-center">
            <Link
              to="/"
              className="flex items-center gap-1 px-4 py-2 rounded-lg text-green-700 font-semibold bg-green-100 hover:bg-green-200 transition text-base shadow-sm border border-green-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l9-9 9 9M4.5 10.5V21h15V10.5"
                />
              </svg>
              Home
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-1 px-4 py-2 rounded-lg text-blue-700 font-semibold bg-blue-100 hover:bg-blue-200 transition text-base shadow-sm border border-blue-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25V9m7.5 0v-.75A2.25 2.25 0 0013.5 6h-3A2.25 2.25 0 008.25 8.25V9m7.5 0a2.25 2.25 0 01-2.25 2.25h-3A2.25 2.25 0 018.25 9m7.5 0v6.75A2.25 2.25 0 0113.5 18h-3A2.25 2.25 0 018.25 15.75V9"
                />
              </svg>
              Login
            </Link>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
            <div>
              <label
                htmlFor="name"
                className="block mb-1 text-sm font-semibold text-green-700"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-semibold text-green-700"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label
                htmlFor="mobileNumber"
                className="block mb-1 text-sm font-semibold text-green-700"
              >
                Mobile Number
              </label>
              <input
                id="mobileNumber"
                type="text"
                name="mobileNumber"
                value={form.mobileNumber}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="block mb-1 text-sm font-semibold text-green-700"
              >
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
              />
              <div
                className="absolute right-3 top-8 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
            <div className="md:col-span-2 relative">
              <label
                htmlFor="confirmPassword"
                className="block mb-1 text-sm font-semibold text-green-700"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
              />
              <div
                className="absolute right-3 top-8 text-gray-500 cursor-pointer"
                onClick={() => setShowConfirmPassword((v) => !v)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
          </form>

          {registerError && (
            <div className="text-red-600 text-center mb-2">{registerError}</div>
          )}
          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-semibold text-base sm:text-lg mt-2"
            disabled={registering}
          >
            {registering ? "Registering..." : "Register"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Register;
