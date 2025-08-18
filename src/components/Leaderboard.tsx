import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const medalColors = [
  "bg-yellow-400 text-yellow-900 border-yellow-300",
  "bg-gray-300 text-gray-800 border-gray-400",
  "bg-amber-700 text-amber-100 border-amber-400",
];

const Leaderboard: React.FC = () => {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const location = useLocation();
  useEffect(() => {
    setLeaders([]);
    setLoading(true);
    setError("");
    const fetchLeaderboard = async () => {
      try {
        const res = await axiosInstance.get("/api/performance/analytics");
        console.log("Leaderboard API response:", res.data);
        setLeaders(res.data.topPerformers || []);
      } catch (err: any) {
        console.error("Leaderboard API error:", err);
        setError(err?.response?.data?.error || "Failed to fetch leaderboard.");
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
    // eslint-disable-next-line
  }, [location.pathname]);

  // Helper to get initials from name
  const getInitials = (name: string) => {
    if (!name) return "-";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + (parts[1][0] || "")).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6">
      <h2 className="text-4xl font-extrabold text-center text-green-700 mb-10 drop-shadow-lg">
        Leaderboard
      </h2>
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px] text-lg">
          Loading...
        </div>
      ) : error ? (
        <div className="flex justify-center items-center min-h-[200px] text-red-600">
          {error}
        </div>
      ) : (
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {leaders.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-8">
              No data available.
            </div>
          )}
          {leaders.map((l, idx) => (
            <div
              key={l.student?._id || idx}
              className={`relative rounded-2xl shadow-lg bg-white p-6 flex flex-col items-center border-2 ${
                idx < 3 ? medalColors[idx] : "border-gray-100"
              } transition hover:scale-105 hover:shadow-2xl`}
            >
              {/* Rank badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span
                  className={`inline-block w-10 h-10 rounded-full border-4 ${
                    medalColors[idx] || "bg-gray-100 border-gray-200"
                  } flex items-center justify-center text-2xl font-bold shadow-md bg-white`}
                >
                  {idx === 0
                    ? "🥇"
                    : idx === 1
                    ? "🥈"
                    : idx === 2
                    ? "🥉"
                    : idx + 1}
                </span>
              </div>
              {/* Avatar with initials */}
              <div className="mt-6 mb-2 w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-blue-400 flex items-center justify-center text-3xl font-bold text-white shadow-lg border-4 border-white">
                {getInitials(l.student?.name)}
              </div>
              {/* Name */}
              <div className="text-xl font-bold text-gray-800 mb-1 text-center">
                {l.student?.name || "-"}
              </div>
              {/* Email */}
              <div className="text-sm text-gray-500 mb-2 text-center">
                {l.student?.email || "-"}
              </div>
              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-4 mt-2">
                <div className="bg-blue-50 rounded-lg px-3 py-1 text-blue-700 font-semibold text-sm">
                  Avg: {l.averageScore}
                </div>
                <div className="bg-yellow-50 rounded-lg px-3 py-1 text-yellow-700 font-semibold text-sm">
                  Top: {l.topScore}
                </div>
                <div className="bg-green-50 rounded-lg px-3 py-1 text-green-700 font-semibold text-sm">
                  Tests: {l.totalTests}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
