import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

interface Category {
  _id: string;
  name: string;
  description?: string;
}

const AdminCategories = () => {
  // Remove local state for viewing details, will use navigation instead
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    description: "",
  });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/api/categories");
      setCategories(res.data.categories || []);
    } catch (err) {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (category: any) => {
    setLoading(true);
    try {
      await axiosInstance.post("/api/categories", category);
      await fetchCategories();
    } finally {
      setLoading(false);
    }
  };

  const updateCategory = async (id: string, category: any) => {
    setLoading(true);
    try {
      await axiosInstance.put(`/api/categories/${id}`, category);
      await fetchCategories();
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id: string) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/api/categories/${id}`);
      await fetchCategories();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
    };
    if (isEdit && editId !== null) {
      await updateCategory(editId, payload);
    } else {
      await createCategory(payload);
    }
    setShowModal(false);
    setForm({ name: "", description: "" });
    setEditId(null);
    setIsEdit(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-green-700">All Categories</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow transition"
          onClick={() => {
            setShowModal(true);
            setIsEdit(false);
            setForm({ name: "", description: "" });
            setErrors({ name: "", description: "" });
            setEditId(null);
          }}
        >
          Create Category
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-10 text-gray-500">
            Loading...
          </div>
        ) : (
          categories &&
          categories.length > 0 &&
          categories.map((cat) => (
            <div
              key={cat._id}
              className="bg-white rounded-lg shadow p-4 flex flex-col gap-2"
            >
              <h3 className="font-bold text-lg text-green-700">{cat.name}</h3>
              <p className="text-gray-600">{cat.description}</p>
              <div className="flex gap-2 mt-2">
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  onClick={() => {
                    setShowModal(true);
                    setIsEdit(true);
                    setEditId(cat._id);
                    setForm({
                      name: cat.name,
                      description: cat.description || "",
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
                    setDeleteId(cat._id);
                  }}
                >
                  Delete
                </button>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  onClick={() => navigate(`/admin/category/${cat._id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
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
              {isEdit ? "Edit Category" : "Create New Category"}
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
                  placeholder="Enter category name"
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
                  placeholder="Enter category description"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows={3}
                />
              </div>
              <button
                type="submit"
                className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
              >
                {isEdit ? "Update Category" : "Create Category"}
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
              Delete Category
            </h3>
            <p className="text-center mb-8 text-gray-700">
              Are you sure you want to delete this category? This action cannot
              be undone.
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
                    await deleteCategory(deleteId);
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

export default AdminCategories;
