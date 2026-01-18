import TestCard from "./TestCard";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

type Test = {
  id: string;
  _id: string;
  title: string;
  examType: string;
  duration: number;
  totalMarks: number;
  questionCount: number;
  image?: string;
  startDate?: string;
  isActive?: boolean;
  categoryId?: string;
};

const AdminTests = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<{
    title: string;
    examType: string;
    duration: string;
    totalMarks: string;
    questionCount: string;
    startDate: string;
    isActive: boolean;
    categoryId: string;
  }>({
    title: "",
    examType: "",
    duration: "",
    totalMarks: "",
    questionCount: "",
    startDate: "",
    isActive: true,
    categoryId: "",
  });
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
    [],
  );
  const [errors, setErrors] = useState({
    title: "",
    examType: "",
    duration: "",
    totalMarks: "",
    questionCount: "",
    startDate: "",
  });
  // Removed questionFile state, no file upload needed

  // API helpers (using .env base URL)
  const fetchTests = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/api/tests");
      // API returns { tests: [...], ... }
      const dummyImage =
        "https://source.unsplash.com/400x250/?exam,education,test";
      const testsArr = (res.data.tests || []).map((t: any) => ({
        id: t._id,
        _id: t._id,
        title: t.title,
        examType: t.examType,
        duration: t.duration,
        totalMarks: t.totalMarks,
        questionCount: t.questionCount,
        image: dummyImage,
        startDate: t.startDate,
        isActive: typeof t.isActive === "boolean" ? t.isActive : true,
      }));
      setTests(testsArr);
    } catch (err) {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  const createTest = async (test: any) => {
    setLoading(true);
    try {
      await axiosInstance.post("/api/tests", test);
      await fetchTests();
    } finally {
      setLoading(false);
    }
  };

  const updateTest = async (id: string, test: any) => {
    setLoading(true);
    try {
      await axiosInstance.put(`/api/tests/${id}`, test);
      await fetchTests();
    } finally {
      setLoading(false);
    }
  };

  const deleteTest = async (id: string) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/api/tests/${id}`);
      await fetchTests();
    } catch (err) {
      // handle error if needed
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTests();
    // Fetch categories for dropdown
    (async () => {
      try {
        const res = await axiosInstance.get("/api/categories");
        setCategories(res.data.categories || []);
      } catch {
        setCategories([]);
      }
    })();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validation
    const newErrors = {
      title: form.title ? "" : "Title is required",
      examType: form.examType ? "" : "Exam type is required",
      duration: form.duration ? "" : "Duration is required",
      totalMarks: form.totalMarks ? "" : "Total marks is required",
      questionCount: form.questionCount ? "" : "Question count is required",
      startDate: form.startDate ? "" : "Start date is required",
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some((err) => err)) return;

    // You can handle the file upload here (e.g., send to server)

    const payload = {
      title: form.title,
      examType: form.examType,
      duration: Number(form.duration),
      totalMarks: Number(form.totalMarks),
      questionCount: Number(form.questionCount),
      startDate: form.startDate,
      isActive: form.isActive,
      categoryId: form.categoryId,
      // Add file info if needed
    };

    if (isEdit && editId !== null) {
      await updateTest(editId, payload);
    } else {
      await createTest(payload);
    }
    setShowModal(false);
    setForm({
      title: "",
      examType: "",
      duration: "",
      totalMarks: "",
      questionCount: "",
      startDate: "",
      isActive: true,
      categoryId: "",
    });
    setEditId(null);
    setIsEdit(false);
    // No file upload, nothing to reset
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-green-700">All Tests</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow transition"
          onClick={() => {
            setShowModal(true);
            setIsEdit(false);
            setForm({
              title: "",
              examType: "",
              duration: "",
              totalMarks: "",
              questionCount: "",
              startDate: "",
              isActive: true,
              categoryId: "",
            });
            setErrors({
              title: "",
              examType: "",
              duration: "",
              totalMarks: "",
              questionCount: "",
              startDate: "",
            });
            setEditId(null);
          }}
        >
          Create Test
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-10 text-gray-500">
            Loading...
          </div>
        ) : (
          tests &&
          tests.length > 0 &&
          tests?.map((test) => (
            <TestCard
              key={test.id}
              test={test}
              isAdmin={true}
              showAdminActions={true}
              onUpdate={async (testId, testData) => {
                await updateTest(testId, testData);
              }}
              onDelete={async (testId) => {
                setShowDeleteModal(true);
                setDeleteId(testId);
              }}
              // onView={() => {
              //   // Implement view logic here
              //   alert(`Viewing test: ${test.title}`);
              // }}
            />
          ))
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-8 relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-6 text-center text-blue-700">
              {isEdit ? "Edit Test" : "Create New Test"}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="categoryId"
                    value={form.categoryId}
                    onChange={(e) => handleChange(e as any)}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Enter test title"
                    className={`w-full border ${
                      errors.title ? "border-red-500" : "border-gray-300"
                    } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Exam Type <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="examType"
                    value={form.examType}
                    onChange={handleChange}
                    placeholder="e.g. Mock, Practice"
                    className={`w-full border ${
                      errors.examType ? "border-red-500" : "border-gray-300"
                    } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  />
                  {errors.examType && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.examType}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Duration (minutes) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    placeholder="e.g. 60"
                    className={`w-full border ${
                      errors.duration ? "border-red-500" : "border-gray-300"
                    } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    min="1"
                  />
                  {errors.duration && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.duration}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Total Marks <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="totalMarks"
                    value={form.totalMarks}
                    onChange={handleChange}
                    placeholder="e.g. 100"
                    className={`w-full border ${
                      errors.totalMarks ? "border-red-500" : "border-gray-300"
                    } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    min="1"
                  />
                  {errors.totalMarks && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.totalMarks}
                    </p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Question Count <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="questionCount"
                    value={form.questionCount}
                    onChange={handleChange}
                    placeholder="e.g. 50"
                    className={`w-full border ${
                      errors.questionCount
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    min="1"
                  />
                  {errors.questionCount && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.questionCount}
                    </p>
                  )}
                </div>
              </div>
              {/* Start Date */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  className={`w-full border ${
                    errors.startDate ? "border-red-500" : "border-gray-300"
                  } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white`}
                />
                {errors.startDate && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.startDate}
                  </p>
                )}
              </div>
              {/* isActive Switch */}
              <div className="sm:col-span-2 flex items-center mt-2">
                <label className="block text-sm font-medium mr-4">
                  Start Test Immediately
                </label>
                <button
                  type="button"
                  className={`relative inline-flex h-6 w-12 border-2 border-transparent rounded-full cursor-pointer transition-colors duration-200 focus:outline-none ${
                    form.isActive ? "bg-green-500" : "bg-gray-300"
                  }`}
                  onClick={() =>
                    setForm((prev) => ({ ...prev, isActive: !prev.isActive }))
                  }
                  aria-pressed={form.isActive}
                >
                  <span
                    className={`inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition-transform duration-200 ${
                      form.isActive ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
                <span
                  className={`ml-3 text-sm font-semibold ${
                    form.isActive ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {form.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              {/* File upload removed as per requirements */}
              <button
                type="submit"
                className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
              >
                {isEdit ? "Update Test" : "Create Test"}
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
              Delete Test
            </h3>
            <p className="text-center mb-8 text-gray-700">
              Are you sure you want to delete this test? This action cannot be
              undone.
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
                    await deleteTest(deleteId);
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

export default AdminTests;
