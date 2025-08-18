import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const icons = ["📚", "📝", "🎯", "🚀", "🔬", "🧠", "💡", "🏆", "📖", "🧪"];

const TestSeriesCategory = () => {
  const { id } = useParams();
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

  return (
    <section className="py-12 bg-gray-50 min-h-[60vh]">
      <div className="max-w-5xl mx-auto px-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tests.map((test, idx) => (
              <div
                key={test._id || test.id}
                className="bg-white rounded-xl shadow p-6 flex flex-col items-center gap-2"
              >
                <div className="text-4xl mb-2">{icons[idx % icons.length]}</div>
                <h3 className="font-bold text-lg text-blue-700">
                  {test.title}
                </h3>
                <p className="text-gray-600 text-center">{test.description}</p>
                <div className="flex flex-wrap justify-center gap-2 mb-4 text-xs text-gray-500">
                  <span className="bg-blue-50 px-2 py-1 rounded">
                    Questions:{" "}
                    {test.totalQuestions || test.questions?.length || "-"}
                  </span>
                  <span className="bg-green-50 px-2 py-1 rounded">
                    Duration: {test.duration || 30} min
                  </span>
                  <span className="bg-yellow-50 px-2 py-1 rounded">
                    Level: {test.difficulty || "-"}
                  </span>
                </div>
                <button className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow hover:from-blue-700 hover:to-purple-700 transition text-lg">
                  <span className="mr-2">▶️</span> Start Test
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestSeriesCategory;
