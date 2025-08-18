import { useEffect, useState, useRef } from "react";
import axiosInstance from "../utils/axiosInstance";

const StudentAnalysis = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [testTitle, settestTitle] = useState("");
  const [studentName, setStudentName] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const params: any = {};
      if (testTitle) params.testTitle = testTitle;
      if (studentName) params.studentName = studentName;
      const res = await axiosInstance.get(
        "/api/performance/all-students-tests",
        { params }
      );
      setData(res?.data?.data || []);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  // Debounce filter API calls
  const debounceRef = useRef<number | null>(null);
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      fetchData();
    }, 500);
    // eslint-disable-next-line
  }, [testTitle, studentName]);

  // Remove handleFilter, not needed with debounce

  return (
    <div className="max-w-[60rem]  py-10">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">
        Student Test Analysis
      </h2>
      <form
        className="flex flex-wrap gap-4 mb-8 items-end bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-2xl shadow-md border border-blue-100"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col">
          <label className="block text-xs font-bold mb-1 text-blue-700 uppercase tracking-wide">
            Test Name
          </label>
          <input
            type="text"
            value={testTitle}
            onChange={(e) => settestTitle(e.target.value)}
            placeholder="Filter by test name"
            className="px-4 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-sm font-medium shadow-sm"
          />
        </div>
        <div className="flex flex-col">
          <label className="block text-xs font-bold mb-1 text-blue-700 uppercase tracking-wide">
            Student Name
          </label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Filter by student name"
            className="px-4 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-sm font-medium shadow-sm"
          />
        </div>
        {/* Filter button removed, API calls are debounced on input */}
      </form>
      {loading ? (
        <div className="text-center py-10 text-lg">Loading...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-600">{error}</div>
      ) : (
        <div className="overflow-x-auto rounded-2xl shadow-lg border border-blue-100">
          <table className="min-w-full bg-white text-sm">
            <thead className="sticky top-0 z-10">
              <tr className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800">
                <th className="py-4 px-4 text-left font-bold uppercase tracking-wider whitespace-nowrap overflow-ellipsis">
                  Student Name
                </th>
                <th className="py-4 px-4 text-left font-bold uppercase tracking-wider whitespace-nowrap overflow-ellipsis">
                  Email
                </th>
                <th className="py-4 px-4 text-left font-bold uppercase tracking-wider whitespace-nowrap overflow-ellipsis">
                  Test Title
                </th>
                <th className="py-4 px-4 text-left font-bold uppercase tracking-wider whitespace-nowrap overflow-ellipsis">
                  Exam Type
                </th>
                <th className="py-4 px-4 text-left font-bold uppercase tracking-wider whitespace-nowrap overflow-ellipsis">
                  Duration (min)
                </th>
                <th className="py-4 px-4 text-left font-bold uppercase tracking-wider whitespace-nowrap overflow-ellipsis">
                  Total Marks
                </th>
                <th className="py-4 px-4 text-left font-bold uppercase tracking-wider whitespace-nowrap overflow-ellipsis">
                  Questions
                </th>
                <th className="py-4 px-4 text-left font-bold uppercase tracking-wider whitespace-nowrap overflow-ellipsis">
                  Correct
                </th>
                <th className="py-4 px-4 text-left font-bold uppercase tracking-wider whitespace-nowrap overflow-ellipsis">
                  Wrong
                </th>
                <th className="py-4 px-4 text-left font-bold uppercase tracking-wider whitespace-nowrap overflow-ellipsis">
                  Unanswered
                </th>
                <th className="py-4 px-4 text-left font-bold uppercase tracking-wider whitespace-nowrap overflow-ellipsis">
                  Score
                </th>
                <th className="py-4 px-4 text-left font-bold uppercase tracking-wider whitespace-nowrap overflow-ellipsis">
                  Time Taken (min)
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={12}
                    className="text-center py-10 text-gray-400 font-semibold text-lg bg-gray-50"
                  >
                    No results found.
                  </td>
                </tr>
              ) : (
                data.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`border-b transition-all duration-200 ${
                      idx % 2 === 0
                        ? "bg-white hover:bg-blue-50"
                        : "bg-blue-50 hover:bg-blue-100"
                    }`}
                  >
                    <td className="py-3 px-4 font-semibold text-gray-800">
                      {row.studentName || "-"}
                    </td>
                    <td className="py-3 px-4 text-blue-700">
                      {row.email || "-"}
                    </td>
                    <td className="py-3 px-4">{row.testTitle || "-"}</td>
                    <td className="py-3 px-4">{row.examType || "-"}</td>
                    <td className="py-3 px-4">{row.duration ?? "-"}</td>
                    <td className="py-3 px-4">{row.totalMarks ?? "-"}</td>
                    <td className="py-3 px-4">{row.questionCount ?? "-"}</td>
                    <td className="py-3 px-4 text-green-700 font-bold">
                      {row.correctAnswers ?? "-"}
                    </td>
                    <td className="py-3 px-4 text-red-600 font-bold">
                      {row.wrongAnswers ?? "-"}
                    </td>
                    <td className="py-3 px-4 text-yellow-600 font-bold">
                      {row.unanswered ?? "-"}
                    </td>
                    <td className="py-3 px-4 text-blue-900 font-bold">
                      {row.score ?? "-"}
                    </td>
                    <td className="py-3 px-4">
                      {row.timeTaken ? (row.timeTaken / 60).toFixed(1) : "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentAnalysis;
