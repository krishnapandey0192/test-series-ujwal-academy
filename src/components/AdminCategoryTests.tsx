import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import TestCard from "./TestCard";

const AdminCategoryTests = () => {
  const { categoryId, subcategoryId } = useParams();
  const [tests, setTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [subcategoryName, setSubcategoryName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [showTestModal, setShowTestModal] = useState(false);
  const [testForm, setTestForm] = useState({
    title: "",
    examType: "",
    duration: "",
    totalMarks: "",
    questionCount: "",
    startDate: "",
    isActive: true,
    subcategoryId: subcategoryId || "",
    categoryId: categoryId || "",
    fileName: "",
  });
  const [testErrors, setTestErrors] = useState({
    title: "",
    examType: "",
    duration: "",
    totalMarks: "",
    questionCount: "",
    startDate: "",
    fileName: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [editTestId, setEditTestId] = useState<string | null>(null);
  const [deleteTestId, setDeleteTestId] = useState<string | null>(null);
  const [uploadForm, setUploadForm] = useState({
    testId: "",
    fileName: "",
  });
  const [uploadErrors, setUploadErrors] = useState({
    testId: "",
    fileName: "",
  });
  const [uploadSelectedFile, setUploadSelectedFile] = useState<File | null>(
    null,
  );
  const [editForm, setEditForm] = useState({
    title: "",
    examType: "",
    duration: "",
    totalMarks: "",
    questionCount: "",
    startDate: "",
    isActive: true,
  });
  const [editErrors, setEditErrors] = useState({
    title: "",
    examType: "",
    duration: "",
    totalMarks: "",
    questionCount: "",
    startDate: "",
  });

  // Fetch tests, subcategory and category information
  useEffect(() => {
    const fetchTests = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(
          `/api/tests?categoryId=${categoryId}&subcategoryId=${subcategoryId}`,
        );
        setTests(res.data.tests || []);
        // Fetch subcategory name
        const subcatRes = await axiosInstance.get(
          `/api/subcategories/${subcategoryId}`,
        );
        setSubcategoryName(subcatRes.data.subcategory?.name || "");

        // Fetch category name
        const catRes = await axiosInstance.get(`/api/categories/${categoryId}`);
        setCategoryName(catRes.data.category?.name || "");
      } catch {
        setTests([]);
        setSubcategoryName("");
        setCategoryName("");
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, [categoryId, subcategoryId]);

  // Update test function
  async function updateTest(testId: string, testData: any) {
    setLoading(true);
    try {
      await axiosInstance.put(`/api/tests/${testId}`, testData);
      // Refresh tests after update
      const res = await axiosInstance.get(
        `/api/tests?categoryId=${categoryId}&subcategoryId=${subcategoryId}`,
      );
      setTests(res.data.tests || []);
    } catch (err) {
      console.error("Error updating test:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleTestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setTestForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setTestForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
        "application/vnd.ms-excel", // .xls
      ];

      if (!allowedTypes.includes(file.type)) {
        setTestErrors((prev) => ({
          ...prev,
          fileName: "Please select a valid Excel file (.xlsx or .xls)",
        }));
        setSelectedFile(null);
        setTestForm((prev) => ({ ...prev, fileName: "" }));
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setTestErrors((prev) => ({
          ...prev,
          fileName: "File size must be less than 10MB",
        }));
        setSelectedFile(null);
        setTestForm((prev) => ({ ...prev, fileName: "" }));
        return;
      }

      setSelectedFile(file);
      setTestForm((prev) => ({ ...prev, fileName: file.name }));
      setTestErrors((prev) => ({ ...prev, fileName: "" }));
    }
  };

  const handleUploadFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
        "application/vnd.ms-excel", // .xls
      ];

      if (!allowedTypes.includes(file.type)) {
        setUploadErrors((prev) => ({
          ...prev,
          fileName: "Please select a valid Excel file (.xlsx or .xls)",
        }));
        setUploadSelectedFile(null);
        setUploadForm((prev) => ({ ...prev, fileName: "" }));
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setUploadErrors((prev) => ({
          ...prev,
          fileName: "File size must be less than 10MB",
        }));
        setUploadSelectedFile(null);
        setUploadForm((prev) => ({ ...prev, fileName: "" }));
        return;
      }

      setUploadSelectedFile(file);
      setUploadForm((prev) => ({ ...prev, fileName: file.name }));
      setUploadErrors((prev) => ({ ...prev, fileName: "" }));
    }
  };

  const createTest = async (testData: any, file: File | null) => {
    setLoading(true);
    try {
      const formData = new FormData();

      // Add all test data to FormData
      formData.append("categoryId", testData.categoryId);
      formData.append("subcategoryId", testData.subcategoryId);
      formData.append("title", testData.title);
      formData.append("examType", testData.examType);
      formData.append("duration", testData.duration.toString());
      formData.append("totalMarks", testData.totalMarks.toString());
      formData.append("questionCount", testData.questionCount.toString());
      formData.append("startDate", testData.startDate);
      formData.append("isActive", testData.isActive.toString());

      // Add file if provided
      if (file) {
        formData.append("file", file);
        console.log(
          "File being sent:",
          file.name,
          "Size:",
          file.size,
          "Type:",
          file.type,
        );
      } else {
        console.log("No file provided");
      }

      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      await axiosInstance.post("/api/tests", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Refresh tests after creation
      const res = await axiosInstance.get(
        `/api/tests?categoryId=${categoryId}&subcategoryId=${subcategoryId}`,
      );
      setTests(res.data.tests || []);
    } finally {
      setLoading(false);
    }
  };

  const handleTestSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validation
    const newErrors = {
      title: testForm.title ? "" : "Title is required",
      examType: testForm.examType ? "" : "Exam type is required",
      duration: testForm.duration ? "" : "Duration is required",
      totalMarks: testForm.totalMarks ? "" : "Total marks is required",
      questionCount: testForm.questionCount ? "" : "Question count is required",
      startDate: testForm.startDate ? "" : "Start date is required",
      fileName: "", // Excel file is now optional
    };
    setTestErrors(newErrors);
    if (Object.values(newErrors).some((err) => err)) return;

    const payload = {
      title: testForm.title,
      examType: testForm.examType,
      duration: Number(testForm.duration),
      totalMarks: Number(testForm.totalMarks),
      questionCount: Number(testForm.questionCount),
      startDate: testForm.startDate,
      isActive: testForm.isActive,
      subcategoryId: testForm.subcategoryId,
      categoryId: testForm.categoryId,
    };

    await createTest(payload, selectedFile);
    setShowTestModal(false);
    setTestForm({
      title: "",
      examType: "",
      duration: "",
      totalMarks: "",
      questionCount: "",
      startDate: "",
      isActive: true,
      subcategoryId: subcategoryId || "",
      categoryId: categoryId || "",
      fileName: "",
    });
    setSelectedFile(null);
  };

  // Edit Form Change Handler
  const handleEditChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setEditForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (editErrors[name as keyof typeof editErrors]) {
      setEditErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Edit Form Submit Handler
  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      title: editForm.title ? "" : "Title is required",
      examType: editForm.examType ? "" : "Exam type is required",
      duration: editForm.duration ? "" : "Duration is required",
      totalMarks: editForm.totalMarks ? "" : "Total marks is required",
      questionCount: editForm.questionCount ? "" : "Question count is required",
      startDate: editForm.startDate ? "" : "Start date is required",
    };

    setEditErrors(newErrors);
    if (Object.values(newErrors).some((err) => err)) return;

    try {
      setLoading(true);
      await axiosInstance.put(`/api/tests/${editTestId}`, editForm);

      // Refresh tests
      const res = await axiosInstance.get(
        `/api/tests?categoryId=${categoryId}&subcategoryId=${subcategoryId}`,
      );
      setTests(res.data.tests || []);

      setShowEditModal(false);
      setEditTestId(null);
    } catch (error) {
      console.error("Error updating test:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete Test Handler
  const handleDeleteTest = (testId: string) => {
    setDeleteTestId(testId);
    setShowDeleteModal(true);
  };

  // Confirm Delete Handler
  const handleConfirmDelete = async () => {
    if (!deleteTestId) return;

    try {
      setLoading(true);
      await axiosInstance.delete(`/api/tests/${deleteTestId}`);

      // Refresh tests
      const res = await axiosInstance.get(
        `/api/tests?categoryId=${categoryId}&subcategoryId=${subcategoryId}`,
      );
      setTests(res.data.tests || []);

      setShowDeleteModal(false);
      setDeleteTestId(null);
    } catch (error) {
      console.error("Error deleting test:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUploadForm((prev) => ({ ...prev, [name]: value }));

    // Clear error when user selects a test
    if (uploadErrors[name as keyof typeof uploadErrors]) {
      setUploadErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const uploadQuestions = async (testId: string, file: File) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("testId", testId);
      formData.append("file", file);

      console.log("Uploading questions for test:", testId);
      console.log(
        "File being sent:",
        file.name,
        "Size:",
        file.size,
        "Type:",
        file.type,
      );
      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await axiosInstance.post("/api/questions", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload response:", response.data);
      alert("Questions uploaded successfully!");
    } catch (error) {
      console.error("Error uploading questions:", error);
      alert("Error uploading questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    const newErrors = {
      testId: uploadForm.testId ? "" : "Please select a test",
      fileName: uploadForm.fileName ? "" : "Excel file is required",
    };

    setUploadErrors(newErrors);
    if (Object.values(newErrors).some((err) => err)) return;

    if (uploadSelectedFile) {
      await uploadQuestions(uploadForm.testId, uploadSelectedFile);
      setShowUploadModal(false);
      setUploadForm({
        testId: "",
        fileName: "",
      });
      setUploadSelectedFile(null);
      setUploadErrors({
        testId: "",
        fileName: "",
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-green-700">
          Tests for Subcategory: {subcategoryName}
        </h2>
        <div className="flex gap-3">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow transition"
            onClick={() => {
              setShowUploadModal(true);
              setUploadForm({
                testId: "",
                fileName: "",
              });
              setUploadSelectedFile(null);
              setUploadErrors({
                testId: "",
                fileName: "",
              });
            }}
          >
            Upload Test
          </button>
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium shadow transition"
            onClick={() => {
              setShowTestModal(true);
              setTestForm({
                title: "",
                examType: "",
                duration: "",
                totalMarks: "",
                questionCount: "",
                startDate: "",
                isActive: true,
                subcategoryId: subcategoryId || "",
                categoryId: categoryId || "",
                fileName: "",
              });
              setSelectedFile(null);
              setTestErrors({
                title: "",
                examType: "",
                duration: "",
                totalMarks: "",
                questionCount: "",
                startDate: "",
                fileName: "",
              });
            }}
          >
            Create Test
          </button>
        </div>
      </div>
      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading...</div>
      ) : tests.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No tests found for this subcategory.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
          {tests.map((test) => (
            <TestCard
              key={test._id}
              test={test}
              isAdmin={true}
              showAdminActions={true}
              onUpdate={async (testId, testData) => {
                await updateTest(testId, testData);
              }}
              onDelete={() => handleDeleteTest(test._id)}
              // onView={() => {
              //   alert(`Viewing test: ${test.title}`);
              // }}
            />
          ))}
        </div>
      )}

      {/* Create Test Modal */}
      {showTestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-8 relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold"
              onClick={() => setShowTestModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-6 text-center text-blue-700">
              Create New Test
            </h3>
            <form onSubmit={handleTestSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={categoryName}
                    disabled
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Subcategory
                  </label>
                  <input
                    type="text"
                    value={subcategoryName}
                    disabled
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={testForm.title}
                    onChange={handleTestChange}
                    placeholder="Enter test title"
                    className={`w-full border ${
                      testErrors.title ? "border-red-500" : "border-gray-300"
                    } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  />
                  {testErrors.title && (
                    <p className="text-red-500 text-xs mt-1">
                      {testErrors.title}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Exam Type <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="examType"
                    value={testForm.examType}
                    onChange={handleTestChange}
                    placeholder="e.g. Mock, Practice"
                    className={`w-full border ${
                      testErrors.examType ? "border-red-500" : "border-gray-300"
                    } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  />
                  {testErrors.examType && (
                    <p className="text-red-500 text-xs mt-1">
                      {testErrors.examType}
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
                    value={testForm.duration}
                    onChange={handleTestChange}
                    placeholder="e.g. 60"
                    className={`w-full border ${
                      testErrors.duration ? "border-red-500" : "border-gray-300"
                    } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    min="1"
                  />
                  {testErrors.duration && (
                    <p className="text-red-500 text-xs mt-1">
                      {testErrors.duration}
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
                    value={testForm.totalMarks}
                    onChange={handleTestChange}
                    placeholder="e.g. 100"
                    className={`w-full border ${
                      testErrors.totalMarks
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    min="1"
                  />
                  {testErrors.totalMarks && (
                    <p className="text-red-500 text-xs mt-1">
                      {testErrors.totalMarks}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Question Count <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="questionCount"
                    value={testForm.questionCount}
                    onChange={handleTestChange}
                    placeholder="e.g. 50"
                    className={`w-full border ${
                      testErrors.questionCount
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    min="1"
                  />
                  {testErrors.questionCount && (
                    <p className="text-red-500 text-xs mt-1">
                      {testErrors.questionCount}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={testForm.startDate}
                    onChange={handleTestChange}
                    className={`w-full border ${
                      testErrors.startDate
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white`}
                  />
                  {testErrors.startDate && (
                    <p className="text-red-500 text-xs mt-1">
                      {testErrors.startDate}
                    </p>
                  )}
                </div>
              </div>
              {/* File Upload */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Upload Excel File (Optional)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileChange}
                    className={`w-full border ${
                      testErrors.fileName ? "border-red-500" : "border-gray-300"
                    } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100`}
                  />
                  {selectedFile && (
                    <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-700">
                        <strong>Selected file:</strong> {selectedFile.name}
                      </p>
                      <p className="text-xs text-green-600">
                        Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  )}
                </div>
                {testErrors.fileName && (
                  <p className="text-red-500 text-xs mt-1">
                    {testErrors.fileName}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Accepted formats: .xlsx, .xls (Max size: 10MB)
                </p>
              </div>
              {/* isActive Switch */}
              <div className="sm:col-span-2 flex items-center mt-2">
                <label className="block text-sm font-medium mr-4">
                  Start Test Immediately
                </label>
                <button
                  type="button"
                  className={`relative inline-flex h-6 w-12 border-2 border-transparent rounded-full cursor-pointer transition-colors duration-200 focus:outline-none ${
                    testForm.isActive ? "bg-green-500" : "bg-gray-300"
                  }`}
                  onClick={() =>
                    setTestForm((prev) => ({
                      ...prev,
                      isActive: !prev.isActive,
                    }))
                  }
                  aria-pressed={testForm.isActive}
                >
                  <span
                    className={`inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition-transform duration-200 ${
                      testForm.isActive ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
                <span
                  className={`ml-3 text-sm font-semibold ${
                    testForm.isActive ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {testForm.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <button
                type="submit"
                className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
              >
                Create Test
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Test Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-8 relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold"
              onClick={() => setShowEditModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-6 text-center text-blue-700">
              Edit Test
            </h3>
            <form onSubmit={handleEditSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={editForm.title}
                    onChange={handleEditChange}
                    className={`w-full border ${
                      editErrors.title ? "border-red-500" : "border-gray-300"
                    } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    placeholder="Enter test title"
                  />
                  {editErrors.title && (
                    <p className="text-red-500 text-xs mt-1">
                      {editErrors.title}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Exam Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="examType"
                    value={editForm.examType}
                    onChange={handleEditChange}
                    className={`w-full border ${
                      editErrors.examType ? "border-red-500" : "border-gray-300"
                    } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white`}
                  >
                    <option value="">Select exam type</option>
                    <option value="Multiple Choice">Multiple Choice</option>
                    <option value="True/False">True/False</option>
                    <option value="Fill in the Blank">Fill in the Blank</option>
                    <option value="Essay">Essay</option>
                    <option value="Mixed">Mixed</option>
                  </select>
                  {editErrors.examType && (
                    <p className="text-red-500 text-xs mt-1">
                      {editErrors.examType}
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
                    value={editForm.duration}
                    onChange={handleEditChange}
                    className={`w-full border ${
                      editErrors.duration ? "border-red-500" : "border-gray-300"
                    } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    min="1"
                  />
                  {editErrors.duration && (
                    <p className="text-red-500 text-xs mt-1">
                      {editErrors.duration}
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
                    value={editForm.totalMarks}
                    onChange={handleEditChange}
                    className={`w-full border ${
                      editErrors.totalMarks
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    min="1"
                  />
                  {editErrors.totalMarks && (
                    <p className="text-red-500 text-xs mt-1">
                      {editErrors.totalMarks}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Question Count <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="questionCount"
                    value={editForm.questionCount}
                    onChange={handleEditChange}
                    className={`w-full border ${
                      editErrors.questionCount
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    min="1"
                  />
                  {editErrors.questionCount && (
                    <p className="text-red-500 text-xs mt-1">
                      {editErrors.questionCount}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={editForm.startDate}
                    onChange={handleEditChange}
                    className={`w-full border ${
                      editErrors.startDate
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white`}
                  />
                  {editErrors.startDate && (
                    <p className="text-red-500 text-xs mt-1">
                      {editErrors.startDate}
                    </p>
                  )}
                </div>
              </div>
              {/* isActive Switch */}
              <div className="flex items-center mt-4">
                <label className="block text-sm font-medium mr-4">
                  Start Test Immediately
                </label>
                <button
                  type="button"
                  className={`relative inline-flex h-6 w-12 border-2 border-transparent rounded-full cursor-pointer transition-colors duration-200 focus:outline-none ${
                    editForm.isActive ? "bg-green-500" : "bg-gray-300"
                  }`}
                  onClick={() =>
                    setEditForm((prev) => ({
                      ...prev,
                      isActive: !prev.isActive,
                    }))
                  }
                  aria-pressed={editForm.isActive}
                >
                  <span
                    className={`inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition-transform duration-200 ${
                      editForm.isActive ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
                <span
                  className={`ml-3 text-sm font-semibold ${
                    editForm.isActive ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {editForm.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
                >
                  Update Test
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 relative">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Delete Test
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete this test? This action cannot be
                undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Test Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-8 relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold"
              onClick={() => setShowUploadModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-6 text-center text-blue-700">
              Upload Test Questions
            </h3>
            <div className="flex items-center justify-center gap-4 mb-4">
              {tests.length > 0 && (
                <p className="text-sm text-gray-600">
                  Found {tests.length} tests available
                </p>
              )}
            </div>
            <form onSubmit={handleUploadSubmit}>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Select Test <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="testId"
                    value={uploadForm.testId}
                    onChange={handleUploadChange}
                    className={`w-full border ${
                      uploadErrors.testId ? "border-red-500" : "border-gray-300"
                    } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white`}
                  >
                    <option value="">Select a test</option>
                    {tests.length > 0 ? (
                      tests.map((test) => (
                        <option
                          key={test._id || test.id}
                          value={test._id || test.id}
                        >
                          {test.title} - {test.examType} ({test.questionCount}{" "}
                          questions)
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>
                        No tests available
                      </option>
                    )}
                  </select>
                  {uploadErrors.testId && (
                    <p className="text-red-500 text-xs mt-1">
                      {uploadErrors.testId}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Upload Excel File <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".xlsx,.xls"
                      onChange={handleUploadFileChange}
                      className={`w-full border ${
                        uploadErrors.fileName
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100`}
                    />
                    {uploadSelectedFile && (
                      <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-700">
                          <strong>Selected file:</strong>{" "}
                          {uploadSelectedFile.name}
                        </p>
                        <p className="text-xs text-green-600">
                          Size:{" "}
                          {(uploadSelectedFile.size / 1024 / 1024).toFixed(2)}{" "}
                          MB
                        </p>
                      </div>
                    )}
                  </div>
                  {uploadErrors.fileName && (
                    <p className="text-red-500 text-xs mt-1">
                      {uploadErrors.fileName}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Accepted formats: .xlsx, .xls (Max size: 10MB)
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
                >
                  Upload Questions
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategoryTests;
