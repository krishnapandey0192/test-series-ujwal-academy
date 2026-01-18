import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

// const icons = ["📚", "📝", "🎯", "🚀", "🔬", "🧠", "💡", "🏆", "📖", "🧪"];

const TestSeriesCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const fetchCategoryWithSubcategories = async () => {
      setLoading(true);
      setError("");
      try {
        // Fetch category name
        const catRes = await axiosInstance.get(`/api/categories/${id}`);
        setCategoryName(catRes.data.category?.name || "");

        // Fetch subcategories for this category
        const subcatRes = await axiosInstance.get(
          `/api/subcategories?category=${id}`,
        );
        setSubcategories(subcatRes.data.subcategories || []);
      } catch (err: any) {
        setError(
          err?.response?.data?.message || "Failed to fetch subcategories.",
        );
        setSubcategories([]);
        setCategoryName("");
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryWithSubcategories();
  }, [id]);

  return (
    <section className="py-12 bg-gray-50 min-h-[60vh]">
      <div className="max-w-5xl mx-auto px-5">
        <div className="flex items-center gap-4 mb-8">
          {/* <button
            onClick={() => navigate("/test-series")}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Categories
          </button> */}
          <h2 className="text-md font-bold text-blue-700">{categoryName}</h2>
        </div>
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px] text-lg">
            Loading...
          </div>
        ) : error ? (
          <div className="flex justify-center items-center min-h-[200px] text-red-600">
            {error}
          </div>
        ) : subcategories.length === 0 ? (
          <div className="flex justify-center items-center min-h-[200px] text-gray-600">
            No subcategories found for this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subcategories.map((subcategory, _idx) => (
              <div
                key={subcategory._id}
                className="bg-gradient-to-br from-blue-400/20 to-purple-500/20 backdrop-blur-sm rounded-xl shadow p-2 flex flex-col items-center gap-2 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
              >
                {/* <div className="text-4xl mb-2">{icons[idx % icons.length]}</div> */}
                <h3 className="font-bold text-lg text-blue-700 text-center">
                  {subcategory.name}
                </h3>
                {/* <p className="text-gray-600 text-center text-sm">
                  {subcategory.description || "No description available"}
                </p> */}
                <button
                  className=" bg-blue-600 hover:bg-blue-700 text-white text-sm px-2 py-1 rounded-lg font-semibold transition"
                  onClick={() =>
                    navigate(
                      `/test-series/category/${id}/subcategory/${subcategory._id}`,
                    )
                  }
                >
                  View Tests
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
