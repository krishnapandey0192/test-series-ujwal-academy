import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const icons = ["📚", "📝", "🎯", "🚀", "🔬", "🧠", "💡", "🏆", "📖", "🧪"];

const TestSeriesCategory = () => {
  const [showInactiveModal, setShowInactiveModal] = useState(false);
  const [inactiveTestTitle, setInactiveTestTitle] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [tests, setTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const fetchCategoryWithTests = async () => {
      setLoading(true);
      setError("");
      try {
        const catRes = await axiosInstance.get(`/api/categories/${id}`);
        setCategoryName(catRes.data.category?.name || "");
        setTests(catRes.data.tests || []);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to fetch tests.");
        setTests([]);
        setCategoryName("");
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryWithTests();
  }, [id]);

  console.log(tests, "tests for category");

  return (
    <section className="py-12 bg-gray-50 min-h-[60vh]">
      <div className="max-w-5xl mx-auto px-5">
        <h2 className="text-3xl font-bold text-blue-700 mb-8">
          Tests for Category: {categoryName}
        </h2>
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px] text-lg">
            Loading...
          </div>
        ) : error ? (
          <div className="flex justify-center items-center min-h-[200px] text-red-600">
            {error}
          </div>
        ) : tests.length === 0 ? (
          <div className="flex justify-center items-center min-h-[200px] text-gray-600">
            No tests found for this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {tests.map((test, idx) => (
              <div
                key={test._id || test.id}
                className="bg-white rounded-lg shadow-sm p-4 sm:p-5 flex flex-col items-start sm:items-center gap-2 hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-center w-full gap-3">
                  <div className="text-2xl sm:text-4xl">
                    {icons[idx % icons.length]}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm sm:text-base text-blue-700 line-clamp-2">
                      {test.title}
                    </h3>
                    {test.description && (
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mt-1">
                        {test.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap justify-start sm:justify-center gap-2 text-xs text-gray-500 w-full">
                  <span className="bg-blue-50 px-2 py-0.5 rounded-full">
                    <strong className="text-blue-700">Questions</strong>:{" "}
                    {test.questionCount  || "-"}
                  </span>
                  <span className="bg-green-50 px-2 py-0.5 rounded-full">
                    <strong className="text-green-700">Duration</strong>:{" "}
                    {test.duration || 30} min
                  </span>
                  <span className="bg-yellow-50 px-2 py-0.5 rounded-full">
                    <strong className="text-yellow-700">Total Marks</strong>:{" "}
                    {test.totalMarks || "-"}
                  </span>
                    {test.isActive ? (
                      <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                        <strong className="font-semibold">Active</strong>
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                        <strong className="font-semibold">Inactive</strong>
                      </span>
                    )}
                </div>

                <button
                  className="w-full py-2 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-sm hover:from-blue-700 hover:to-purple-700 transition text-sm flex items-center justify-center gap-2"
                  onClick={() => {
                    if (!test.isActive) {
                      setInactiveTestTitle(test.title);
                      setShowInactiveModal(true);
                      return;
                    }
                    const token = localStorage.getItem("token");
                    if (token) {
                      navigate(`/student/test/view/${test._id || test.id}`);
                    } else {
                      navigate("/register");
                    }
                  }}
                  disabled={loading}
                  aria-label={loading ? "Loading tests" : `Start ${test.title}`}
                >
                  <span className="text-sm">▶️</span> Start Test
                  <span className="hidden sm:inline">Start Test</span>
                </button>
              </div>
            ))}
          </div>
        )}
        {/* Inactive Test Modal */}
        {showInactiveModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 relative">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold"
                onClick={() => setShowInactiveModal(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <h3 className="text-xl font-bold mb-6 text-center text-red-700">
                Test Not Active
              </h3>
              <p className="text-center mb-8 text-gray-700">
                The test{" "}
                <span className="font-semibold">{inactiveTestTitle}</span> is
                currently not active and cannot be started.
              </p>
              <div className="flex justify-center">
                <button
                  className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                  onClick={() => setShowInactiveModal(false)}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestSeriesCategory;
