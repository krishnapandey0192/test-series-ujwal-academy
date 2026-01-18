import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, FilePlus, FileText } from "lucide-react";

const adminMenuItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { label: "All Tests", icon: FileText, path: "/admin/tests" },
  { label: "Categories", icon: FileText, path: "/admin/categories" },
  { label: "Add Test", icon: FilePlus, path: "/admin/add-test" },
  {
    label: "Student Analysis",
    icon: FilePlus,
    path: "/admin/student-analysis",
  },
];

const studentMenuItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/student/dashboard" },
  // Add more student-specific items here if needed
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  // Get role from localStorage (default to 'student' if not set)
  const role = localStorage.getItem("role") || "student";

  // Optionally, get user info from localStorage
  const username = localStorage.getItem("username");

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <aside className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col shadow-xl rounded-tr-3xl rounded-br-3xl overflow-hidden z-[60]">
      {/* Logo/Brand */}
      <div className="flex items-center gap-3 p-6 border-b border-gray-100">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-xl shadow-md">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="6" fill="url(#paint0_linear)" />
            <path d="M7 17V7h10v10H7z" fill="#fff" />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="0"
                y1="0"
                x2="24"
                y2="24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#6366F1" />
                <stop offset="1" stopColor="#A21CAF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span className="font-black text-md tracking-tight text-gray-800 select-none">
          Ujjwal Academy
        </span>
      </div>
      <ul className="flex-1 mt-8 space-y-1 px-3">
        {(role === "admin" ? adminMenuItems : studentMenuItems).map(
          ({ label, icon: Icon, path }) => {
            const isActive = location.pathname === path;
            return (
              <li key={path}>
                <Link
                  to={path}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg font-semibold transition-all duration-200 group
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-700 shadow border border-blue-200"
                      : "hover:bg-gray-100 text-gray-600 hover:text-blue-700"
                  }
                `}
                >
                  <Icon
                    size={22}
                    className={`transition-transform ${
                      isActive
                        ? "text-blue-600"
                        : "text-blue-400 group-hover:text-blue-600"
                    }`}
                  />
                  <span className="text-base tracking-wide">{label}</span>
                </Link>
              </li>
            );
          },
        )}
      </ul>
      {/* User info and logout */}
      <div className="px-4 pb-2 flex flex-col gap-2">
        {username && (
          <div className="text-xs text-gray-500 mb-1">
            Logged in as <span className="font-semibold">{username}</span> (
            {role})
          </div>
        )}
        <button
          onClick={handleLogout}
          className="w-full py-2 text-sm font-semibold rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 transition"
        >
          Logout
        </button>
      </div>
      <div className="p-4 text-xs text-gray-400 border-t border-gray-100 bg-gray-50">
        <span className="font-bold">© {new Date().getFullYear()} TestPanel</span>
      </div>
    </aside>
  );
}
