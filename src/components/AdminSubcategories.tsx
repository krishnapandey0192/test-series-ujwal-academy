import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

interface Subcategory {
  _id: string;
  name: string;
  description?: string;
  categoryId: string;
}

const AdminSubcategories = () => {
  const { categoryId } = useParams();
  console.log("categoryId", categoryId);
  const navigate = useNavigate();
  const location = useLocation();
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    categoryId: categoryId || "",
  });
  const [errors, setErrors] = useState({
    name: "",
    description: "",
  });
  const [apiError, setApiError] = useState("");

  // Fetch subcategories and category name
  useEffect(() => {
    const fetchSubcategories = async () => {
      if (!categoryId) {
        console.log("No categoryId available, skipping fetch");
        return;
      }

      setLoading(true);
      try {
        console.log("Fetching subcategories for categoryId:", categoryId);
        console.log("API URL:", `/api/subcategories?categoryId=${categoryId}`);

        const res = await axiosInstance.get(
          `/api/subcategories?categoryId=${categoryId}`,
        );
        console.log("Subcategories API response:", res.data);
        setSubcategories(res.data.subcategories || []);
        setApiError(""); // Clear any previous errors

        // Fetch category name
        console.log("Fetching category name for categoryId:", categoryId);
        const catRes = await axiosInstance.get(`/api/categories/${categoryId}`);
        console.log("Category API response:", catRes.data);
        setCategoryName(catRes.data.category?.name || "");
      } catch (error: any) {
        console.error("Error fetching subcategories:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        console.error("Error message:", error.message);

        setApiError(
          `API Error: ${error.response?.status || "Unknown"} - ${error.response?.data?.error || error.message}`,
        );

        // Try alternative API endpoint
        try {
          console.log("Trying alternative API endpoint...");
          const altRes = await axiosInstance.get(
            `/api/subcategories?category=${categoryId}`,
          );
          console.log("Alternative API response:", altRes.data);
          setSubcategories(altRes.data.subcategories || []);
        } catch (altError) {
          console.error("Alternative API also failed:", altError);

          // Try fetching all subcategories as last resort
          try {
            console.log("Trying to fetch all subcategories as fallback...");
            const allRes = await axiosInstance.get(`/api/subcategories`);
            console.log("All subcategories response:", allRes.data);
            // Filter client-side if needed
            const filteredSubcategories =
              allRes.data.subcategories?.filter(
                (sub: any) => sub.categoryId === categoryId,
              ) || [];
            setSubcategories(filteredSubcategories);
          } catch (allError) {
            console.error("Fetching all subcategories also failed:", allError);
            setSubcategories([]);
          }
        }
        setCategoryName("");
      } finally {
        setLoading(false);
      }
    };
    fetchSubcategories();
  }, [categoryId]);

  const createSubcategory = async (subcategory: any) => {
    setLoading(true);
    try {
      await axiosInstance.post("/api/subcategories", subcategory);
      await fetchSubcategories();
    } finally {
      setLoading(false);
    }
  };

  const updateSubcategory = async (subcategoryId: string, subcategory: any) => {
    setLoading(true);
    try {
      await axiosInstance.put(
        `/api/subcategories/${subcategoryId}`,
        subcategory,
      );
      await fetchSubcategories();
    } finally {
      setLoading(false);
    }
  };

  const deleteSubcategory = async (subcategoryId: string) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/api/subcategories/${subcategoryId}`);
      await fetchSubcategories();
    } finally {
      setLoading(false);
    }
  };

  const fetchSubcategories = async () => {
    if (!categoryId) {
      console.log("No categoryId available for fetchSubcategories");
      return;
    }

    setLoading(true);
    try {
      console.log("Refreshing subcategories for categoryId:", categoryId);
      console.log("API URL:", `/api/subcategories?categoryId=${categoryId}`);
      const res = await axiosInstance.get(
        `/api/subcategories?categoryId=${categoryId}`,
      );
      console.log("Refresh subcategories API response:", res.data);
      setSubcategories(res.data.subcategories || []);
    } catch (error: any) {
      console.error("Error refreshing subcategories:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);

      // Try alternative API endpoint
      try {
        console.log("Trying alternative API endpoint for refresh...");
        const altRes = await axiosInstance.get(
          `/api/subcategories?category=${categoryId}`,
        );
        console.log("Alternative refresh API response:", altRes.data);
        setSubcategories(altRes.data.subcategories || []);
      } catch (altError) {
        console.error("Alternative refresh API also failed:", altError);
        setSubcategories([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = {
      name: form.name ? "" : "Name is required",
      description: "",
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some((err) => err)) return;

    const payload = {
      name: form.name,
      description: form.description,
      categoryId: form.categoryId,
    };

    if (isEdit && editId !== null) {
      await updateSubcategory(editId, payload);
    } else {
      await createSubcategory(payload);
    }
    setShowModal(false);
    setForm({ name: "", description: "", categoryId: categoryId || "" });
    setEditId(null);
    setIsEdit(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-green-700">
            Subcategories for Category: {categoryName}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Category ID: {categoryId}
          </p>
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow transition"
          onClick={() => {
            setShowModal(true);
            setIsEdit(false);
            setForm({
              name: "",
              description: "",
              categoryId: categoryId || "",
            });
            setErrors({ name: "", description: "" });
            setEditId(null);
          }}
        >
          Create Subcategory
        </button>
      </div>

      {apiError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <div className="text-red-600">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-800">API Error</h3>
              <p className="text-sm text-red-700 mt-1">{apiError}</p>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading...</div>
      ) : subcategories.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No subcategories found for this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subcategories.map((subcategory) => (
            <div
              key={subcategory._id}
              className="bg-white rounded-lg shadow p-4 flex flex-col gap-2"
            >
              <h3 className="font-bold text-lg text-green-700">
                {subcategory.name}
              </h3>
              <p className="text-gray-600">{subcategory.description}</p>
              <div className="flex gap-2 mt-2">
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  onClick={() => {
                    setShowModal(true);
                    setIsEdit(true);
                    setEditId(subcategory._id);
                    setForm({
                      name: subcategory.name,
                      description: subcategory.description || "",
                      categoryId: subcategory.categoryId,
                    });
                    setErrors({ name: "", description: "" });
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  onClick={() => {
                    setShowDeleteModal(true);
                    setDeleteId(subcategory._id);
                  }}
                >
                  Delete
                </button>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  onClick={() =>
                    navigate(`${location.pathname}/${subcategory._id}`)
                  }
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-6 text-center text-blue-700">
              {isEdit ? "Edit Subcategory" : "Create New Subcategory"}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter subcategory name"
                  className={`w-full border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Enter subcategory description"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows={3}
                />
              </div>
              <button
                type="submit"
                className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
              >
                {isEdit ? "Update Subcategory" : "Create Subcategory"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold"
              onClick={() => setShowDeleteModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-6 text-center text-red-700">
              Delete Subcategory
            </h3>
            <p className="text-center mb-8 text-gray-700">
              Are you sure you want to delete this subcategory? This action
              cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold"
                onClick={async () => {
                  if (deleteId !== null) {
                    await deleteSubcategory(deleteId);
                  }
                  setShowDeleteModal(false);
                  setDeleteId(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSubcategories;
