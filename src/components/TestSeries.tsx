import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const icons = ["📚", "📝", "🎯", "🚀", "🔬", "🧠", "💡", "🏆", "📖", "🧪"];

const TestSeries = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axiosInstance.get("/api/categories");
        setCategories(res.data.categories || []);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to fetch categories.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="py-12 bg-gray-50 min-h-[60vh]">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-blue-700 mb-8">
          Test Series Categories
        </h2>
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px] text-lg">
            Loading...
          </div>
        ) : error ? (
          <div className="flex justify-center items-center min-h-[200px] text-red-600">
            {error}
          </div>
        ) : categories.length === 0 ? (
          <div className="flex justify-center items-center min-h-[200px] text-gray-600">
            No categories found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, idx) => (
              <div
                key={cat._id}
                className="bg-white rounded-xl shadow p-6 flex flex-col items-center gap-2"
              >
                <div className="text-4xl mb-2">{icons[idx % icons.length]}</div>
                <h3 className="font-bold text-lg text-blue-700">{cat.name}</h3>
                <p className="text-gray-600 text-center">{cat.description}</p>
                <button
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
                  onClick={() => navigate(`/test-series/category/${cat._id}`)}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestSeries;
