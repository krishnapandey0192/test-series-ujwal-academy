import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import axiosInstance from "../utils/axiosInstance";

const kpiColors = [
  "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700",
  "bg-purple-100 text-purple-700",
  "bg-yellow-100 text-yellow-700",
];

const AdminDashboard = () => {
  const barRef = useRef<HTMLCanvasElement>(null);
  const pieRef = useRef<HTMLCanvasElement>(null);
  const [kpis, setKpis] = React.useState<any[]>([]);
  const [barData, setBarData] = React.useState<{
    labels: string[];
    data: number[];
  }>({ labels: [], data: [] });
  const [pieData, setPieData] = React.useState<{
    labels: string[];
    data: number[];
    colors: string[];
  }>({ labels: [], data: [], colors: ["#34d399", "#f87171", "#fbbf24"] });
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  // Student analytics state
  const [studentId, setStudentId] = React.useState("");
  const [studentList, setStudentList] = React.useState<any[]>([]);
  const [studentLoading, setStudentLoading] = React.useState(false);
  const [studentError, setStudentError] = React.useState("");
  const [studentPerf, setStudentPerf] = React.useState<any>(null);
  const [studentBarData, setStudentBarData] = React.useState<{
    labels: string[];
    data: number[];
  }>({ labels: [], data: [] });
  const [studentPieData, setStudentPieData] = React.useState<{
    labels: string[];
    data: number[];
    colors: string[];
  }>({
    labels: [],
    data: [],
    colors: [
      "#60a5fa",
      "#fbbf24",
      "#a78bfa",
      "#f472b6",
      "#facc15",
      "#38bdf8",
      "#818cf8",
      "#f59e42",
    ],
  });
  const studentBarRef = useRef<HTMLCanvasElement>(null);
  const studentPieRef = useRef<HTMLCanvasElement>(null);

  // Fetch all students for dropdown
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // You may need to adjust the endpoint to match your API
        const res = await axiosInstance.get("/api/auth/users");
        setStudentList(res.data.users || []);
      } catch (err) {
        setStudentList([]);
      }
    };
    fetchStudents();
  }, []);

  React.useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axiosInstance.get("/api/performance/analytics");
        // KPIs
        const overview = res.data.overview || {};
        setKpis([
          {
            label: "Total Students",
            value: overview.totalStudents,
            color: kpiColors[0],
          },
          {
            label: "Total Tests",
            value: overview.totalTests,
            color: kpiColors[1],
          },
          {
            label: "Total Attempts",
            value: overview.totalAttempts,
            color: kpiColors[2],
          },
        ]);
        // Bar chart: test popularity (top 5)
        const popularTests = res.data.popularTests || [];
        setBarData({
          labels: popularTests.map((t: any) => t.test?.title || "Unknown"),
          data: popularTests.map((t: any) => t.attemptCount),
        });
        // Pie chart: top performers (top 5)
        const topPerformers = res.data.topPerformers || [];
        setPieData({
          labels: topPerformers.map((p: any) => p.student?.name || "Unknown"),
          data: topPerformers.map((p: any) => p.averageScore),
          colors: [
            "#34d399",
            "#60a5fa",
            "#fbbf24",
            "#f87171",
            "#a78bfa",
            "#f472b6",
            "#facc15",
            "#38bdf8",
            "#818cf8",
            "#f59e42",
          ],
        });
      } catch (err: any) {
        setError(err?.response?.data?.error || "Failed to fetch analytics.");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  // Fetch student analytics
  const fetchStudentAnalytics = async (id: string) => {
    setStudentLoading(true);
    setStudentError("");
    setStudentPerf(null);
    setStudentBarData({ labels: [], data: [] });
    setStudentPieData({ labels: [], data: [], colors: studentPieData.colors });
    try {
      const res = await axiosInstance.get(`/api/performance/student/${id}`);
      setStudentPerf(res.data);
      // Bar: monthly progress
      const months = (res.data.insights.monthlyProgress || []).map(
        (m: any) => m.month
      );
      const avgScores = (res.data.insights.monthlyProgress || []).map(
        (m: any) => parseFloat(m.averageScore)
      );
      setStudentBarData({ labels: months, data: avgScores });
      // Pie: attempts by exam type
      const examTypes = Object.keys(res.data.insights.attemptsByExamType || {});
      const examCounts = examTypes.map(
        (type) => res.data.insights.attemptsByExamType[type].length
      );
      setStudentPieData({
        labels: examTypes,
        data: examCounts,
        colors: studentPieData.colors,
      });
    } catch (err: any) {
      setStudentError(
        err?.response?.data?.error || "Failed to fetch student analytics."
      );
    } finally {
      setStudentLoading(false);
    }
  };

  useEffect(() => {
    let barChart: Chart | null = null;
    let pieChart: Chart | null = null;
    if (barRef.current && barData.labels.length) {
      barChart = new Chart(barRef.current, {
        type: "bar",
        data: {
          labels: barData.labels,
          datasets: [
            {
              label: "Test Popularity",
              data: barData.data,
              backgroundColor: "#6366f1",
              borderRadius: 8,
            },
          ],
        },
        options: {
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true } },
        },
      });
    }
    if (pieRef.current && pieData.labels.length) {
      pieChart = new Chart(pieRef.current, {
        type: "doughnut",
        data: {
          labels: pieData.labels,
          datasets: [
            {
              data: pieData.data,
              backgroundColor: pieData.colors,
              borderWidth: 2,
            },
          ],
        },
        options: {
          plugins: { legend: { position: "bottom" } },
          cutout: "70%",
        },
      });
    }
    return () => {
      if (barChart) barChart.destroy();
      if (pieChart) pieChart.destroy();
    };
  }, [barData, pieData]);

  // Student charts
  useEffect(() => {
    let sBarChart: Chart | null = null;
    let sPieChart: Chart | null = null;
    if (studentBarRef.current && studentBarData.labels.length) {
      sBarChart = new Chart(studentBarRef.current, {
        type: "bar",
        data: {
          labels: studentBarData.labels,
          datasets: [
            {
              label: "Monthly Avg. Score",
              data: studentBarData.data,
              backgroundColor: "#34d399",
              borderRadius: 8,
            },
          ],
        },
        options: {
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true } },
        },
      });
    }
    if (studentPieRef.current && studentPieData.labels.length) {
      sPieChart = new Chart(studentPieRef.current, {
        type: "doughnut",
        data: {
          labels: studentPieData.labels,
          datasets: [
            {
              data: studentPieData.data,
              backgroundColor: studentPieData.colors,
              borderWidth: 2,
            },
          ],
        },
        options: {
          plugins: { legend: { position: "bottom" } },
          cutout: "70%",
        },
      });
    }
    return () => {
      if (sBarChart) sBarChart.destroy();
      if (sPieChart) sPieChart.destroy();
    };
  }, [studentBarData, studentPieData]);

  return (
    <div className="p-6 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-green-700 text-center">
        Admin Dashboard
      </h2>
      {/* Main analytics */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px] text-lg">
          Loading...
        </div>
      ) : error ? (
        <div className="flex justify-center items-center min-h-[200px] text-red-600">
          {error}
        </div>
      ) : (
        <>
          {/* KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {kpis.map((kpi: any) => (
              <div
                key={kpi.label}
                className={`rounded-xl shadow p-6 flex flex-col items-center ${kpi.color}`}
              >
                <div className="text-3xl font-bold mb-1">{kpi.value}</div>
                <div className="text-sm font-medium">{kpi.label}</div>
              </div>
            ))}
          </div>
          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold mb-4 text-blue-700">
                Test Popularity
              </h3>
              <canvas ref={barRef} height={220}></canvas>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold mb-4 text-purple-700">
                Top Performers (Avg. Score)
              </h3>
              <canvas ref={pieRef} height={220}></canvas>
            </div>
          </div>
        </>
      )}

      {/* Student analytics section */}
      <div className="mt-12 bg-white rounded-xl shadow p-6 max-w-3xl mx-auto">
        <h3 className="text-xl font-bold mb-4 text-green-700">
          Student Performance Analytics
        </h3>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <select
            className="border rounded px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={studentId}
            onChange={(e) => {
              setStudentId(e.target.value);
              if (e.target.value) fetchStudentAnalytics(e.target.value);
            }}
            disabled={studentLoading || studentList.length === 0}
          >
            <option value="">Select Student</option>
            {studentList.map((s: any) => (
              <option key={s._id} value={s._id}>
                {s.name} ({s.email})
              </option>
            ))}
          </select>
        </div>
        {studentLoading && (
          <div className="text-green-700 mb-4">Loading...</div>
        )}
        {studentError && (
          <div className="text-red-600 mb-4">{studentError}</div>
        )}
        {studentPerf && (
          <div>
            {/* KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 rounded p-4 text-center">
                <div className="text-2xl font-bold">
                  {studentPerf.performance.totalTests}
                </div>
                <div className="text-xs text-gray-600">Total Tests</div>
              </div>
              <div className="bg-green-50 rounded p-4 text-center">
                <div className="text-2xl font-bold">
                  {studentPerf.performance.averageScore}
                </div>
                <div className="text-xs text-gray-600">Avg. Score</div>
              </div>
              <div className="bg-yellow-50 rounded p-4 text-center">
                <div className="text-2xl font-bold">
                  {studentPerf.performance.topScore}
                </div>
                <div className="text-xs text-gray-600">Top Score</div>
              </div>
            </div>
            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-md font-semibold mb-2 text-blue-700">
                  Monthly Progress (Avg. Score)
                </h4>
                <canvas ref={studentBarRef} height={180}></canvas>
              </div>
              <div>
                <h4 className="text-md font-semibold mb-2 text-purple-700">
                  Attempts by Exam Type
                </h4>
                <canvas ref={studentPieRef} height={180}></canvas>
              </div>
            </div>
            {/* Recent Attempts Table */}
            <div>
              <h4 className="text-md font-semibold mb-2 text-green-700">
                Recent Attempts
              </h4>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm border">
                  <thead>
                    <tr className="bg-green-50">
                      <th className="px-3 py-2 border">Test</th>
                      <th className="px-3 py-2 border">Score</th>
                      <th className="px-3 py-2 border">Percentage</th>
                      <th className="px-3 py-2 border">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentPerf.insights.recentAttempts.map(
                      (a: any, idx: number) => (
                        <tr key={idx} className="even:bg-gray-50">
                          <td className="px-3 py-2 border">
                            {a.testId?.title || "-"}
                          </td>
                          <td className="px-3 py-2 border">{a.score}</td>
                          <td className="px-3 py-2 border">{a.percentage}%</td>
                          <td className="px-3 py-2 border">
                            {new Date(a.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
