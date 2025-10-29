import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [form, setForm] = useState({
    loginType: "student",
    email: "",
    password: "",
    showPassword: false,
  });
  const [error, setError] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [loadingForgotPassword, setLoadingForgotPassword] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => {
    setForm({ ...form, showPassword: !form.showPassword });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (loadingLogin) return; // prevent double submit
    setError("");
    setLoadingLogin(true);
    try {
      const res = await axiosInstance.post("/api/auth/login", {
        role: form.loginType,
        email: form.email,
        password: form.password,
      });
      // Response: { message, token, user: { id, name, email, role } }
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("username", user.name);
      localStorage.setItem("email", user.email);
      localStorage.setItem("userId", user.id);
      toast.success("Login successful!");
      // Redirect based on role
      setTimeout(() => {
        if (user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      }, 300);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || "Login failed. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoadingLogin(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotPasswordEmail.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    if (loadingForgotPassword) return;
    setLoadingForgotPassword(true);

    try {
      await axiosInstance.post("/api/auth/forgot-password", {
        email: forgotPasswordEmail,
      });
      
      toast.success(`Password reset link sent to ${forgotPasswordEmail}`);
      setShowForgotPasswordModal(false);
      setForgotPasswordEmail("");
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Failed to send reset email. Please try again.";
      toast.error(msg);
    } finally {
      setLoadingForgotPassword(false);
    }
  };

  const closeModal = () => {
    setShowForgotPasswordModal(false);
    setForgotPasswordEmail("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-xl md:text-2xl font-bold text-center text-blue-700 mb-6">
          Login - Ujjawal Academy Mauganj
        </h2>

        {/* Centered Navigation Buttons */}
        <div className="flex justify-center gap-4 mb-6">
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
            to="/register"
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
            Register
          </Link>
        </div>

        <div className="flex justify-center mb-4 space-x-4">
          {["student", "admin"].map((role) => (
            <label
              key={role}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="loginType"
                value={role}
                checked={form.loginType === role}
                onChange={handleChange}
                className="accent-blue-600"
                disabled={loadingLogin}
              />
              <span className="capitalize">{role}</span>
            </label>
          ))}
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block mb-1 text-sm font-semibold text-blue-700"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loadingLogin}
          />
        </div>

        <div className="relative mb-4">
          <label
            htmlFor="password"
            className="block mb-1 text-sm font-semibold text-blue-700"
          >
            Password
          </label>
          <input
            id="password"
            type={form.showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            disabled={loadingLogin}
          />
          <div
            onClick={togglePassword}
            className="absolute right-3 top-8 text-gray-500 cursor-pointer"
          >
            {form.showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        </div>

        {error && (
          <div className="mb-3 text-red-600 text-sm text-center font-semibold">
            {error}
          </div>
        )}
        <button
          onClick={handleSubmit}
          className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2 ${
            loadingLogin ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={loadingLogin}
        >
          {loadingLogin ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              <span>Logging in...</span>
            </>
          ) : (
            "Login"
          )}
        </button>

        {/* Forgot Password Link */}
        <div className="text-center mt-4">
          <button
            onClick={() => setShowForgotPasswordModal(true)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
            disabled={loadingLogin}
          >
            Forgot Password?
          </button>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Reset Password
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition"
                disabled={loadingForgotPassword}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-gray-600 text-sm mb-6">
              Enter your email address and we'll send you a link to reset your password.
            </p>

            <div className="mb-6">
              <label
                htmlFor="forgotEmail"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                id="forgotEmail"
                type="email"
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={loadingForgotPassword}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={closeModal}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                disabled={loadingForgotPassword}
              >
                Cancel
              </button>
              <button
                onClick={handleForgotPassword}
                className={`flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center gap-2 ${
                  loadingForgotPassword ? "opacity-70 cursor-not-allowed" : ""
                }`}
                disabled={loadingForgotPassword}
              >
                {loadingForgotPassword ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
