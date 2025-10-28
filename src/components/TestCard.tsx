import {
  PencilLine,
  Trash2,
  Zap,
  Clock,
  FileText,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
  userCount?: number;
};

type TestCardProps = {
  test: Test;
  onDelete?: (id: string) => void;
  onStart?: (test: Test) => void;
  onUpdate?: (testId: string, testData: any) => void;
  showAdminActions?: boolean;
  isAdmin?: boolean;
};

export default function TestCard({
  test,
  onDelete,
  onStart,
  onUpdate,
  showAdminActions = false,
  isAdmin = false,
}: TestCardProps) {
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showToggleModal, setShowToggleModal] = useState(false);
  const [editForm, setEditForm] = useState({
    title: test.title,
    examType: test.examType,
    duration: test.duration.toString(),
    totalMarks: test.totalMarks.toString(),
    questionCount: test.questionCount.toString(),
    startDate: test.startDate ? test.startDate.split('T')[0] : '',
    isActive: test.isActive || false,
  });
  const [editErrors, setEditErrors] = useState({
    title: "",
    examType: "",
    duration: "",
    totalMarks: "",
    questionCount: "",
    startDate: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isToggling, setIsToggling] = useState(false);

  const handleStartClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmStart = () => {
    setShowConfirmModal(false);

    // Check if user is authenticated
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('userId');

    if (!token || !user) {
      // User not logged in, redirect to register
      navigate('/register');
      return;
    }

    if (onStart) {
      onStart(test);
    } else {
      navigate(`/student/test/view/${test._id}`);
    }
  };

  // Check authentication status
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('userId');
    return !!(token && user);
  };

  const handleCancelStart = () => {
    setShowConfirmModal(false);
  };

  const handleEditClick = () => {
    // Reset form with current test data
    setEditForm({
      title: test.title,
      examType: test.examType,
      duration: test.duration.toString(),
      totalMarks: test.totalMarks.toString(),
      questionCount: test.questionCount.toString(),
      startDate: test.startDate ? test.startDate.split('T')[0] : '',
      isActive: test.isActive || false,
    });
    setEditErrors({
      title: "",
      examType: "",
      duration: "",
      totalMarks: "",
      questionCount: "",
      startDate: "",
    });
    setSelectedFile(null);
    setShowEditModal(true);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setEditForm(prev => ({ ...prev, [name]: checked }));
    } else {
      setEditForm(prev => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (editErrors[name as keyof typeof editErrors]) {
      setEditErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
        'application/vnd.ms-excel' // .xls
      ];

      if (!allowedTypes.includes(file.type)) {
        setEditErrors(prev => ({
          ...prev,
          fileName: "Please select a valid Excel file (.xlsx or .xls)"
        }));
        setSelectedFile(null);
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setEditErrors(prev => ({
          ...prev,
          fileName: "File size must be less than 10MB"
        }));
        setSelectedFile(null);
        return;
      }

      setSelectedFile(file);
      setEditErrors(prev => ({ ...prev, fileName: "" }));
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors = {
      title: editForm.title ? "" : "Title is required",
      examType: editForm.examType ? "" : "Exam type is required",
      duration: editForm.duration ? "" : "Duration is required",
      totalMarks: editForm.totalMarks ? "" : "Total marks is required",
      questionCount: editForm.questionCount ? "" : "Question count is required",
      startDate: editForm.startDate ? "" : "Start date is required",
    };

    setEditErrors(newErrors);
    if (Object.values(newErrors).some(err => err)) return;

    if (onUpdate) {
      onUpdate(test._id, {
        ...editForm,
        duration: Number(editForm.duration),
        totalMarks: Number(editForm.totalMarks),
        questionCount: Number(editForm.questionCount),
      });
    }
    setShowEditModal(false);
  };

  const handleDeleteConfirm = () => {
    if (onDelete) {
      onDelete(test._id);
    }
    setShowDeleteModal(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const handleToggleClick = () => {
    setShowToggleModal(true);
  };

  const handleToggleConfirm = async () => {
    if (isToggling || !onUpdate) return;

    setIsToggling(true);
    try {
      await onUpdate(test._id, { isActive: !test.isActive });
      setShowToggleModal(false);
    } catch (error) {
      console.error("Error toggling test status:", error);
    } finally {
      setIsToggling(false);
    }
  };

  const handleToggleCancel = () => {
    setShowToggleModal(false);
  };


  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-0.5 sm:p-6">
      {/* Mobile Dark Theme Layout */}
      <div className="block sm:hidden">
        <div className="bg-gradient-to-br from-blue-400/20 to-purple-500/20 backdrop-blur-sm rounded-lg p-4">
          {/* Title */}
          <h2 className="text-blue-500 font-bold text-base leading-tight mb-3">
            {test.title}
          </h2>

          {/* Test Details and Start Button */}
          <div className="flex items-center justify-between">
            <div className="text-black text-[11px]">
              {test.questionCount} Qs. {test.duration} mins. {test.totalMarks} Marks
            </div>
            <button
              onClick={handleStartClick}
              disabled={!test.isActive}
              className={`text-white bg-green-500 px-2 py-1 rounded-md font-medium text-sm transition ${test.isActive
                ? 'hover:bg-green-600 cursor-pointer'
                : 'bg-gray-500 cursor-not-allowed'
                }`}
            >
              {test.isActive ? 'Start Test' : 'Test Inactive'}
            </button>
          </div>

          {/* Active Status for Mobile Admin View */}
          {showAdminActions && (
            <div
              onClick={handleToggleClick}
              className="mt-3 flex items-center justify-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md group"
            >
              <span className="text-xs font-medium text-gray-700">Status:</span>
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full transition-all duration-200 ${test.isActive ? 'bg-green-500' : 'bg-red-500'} group-hover:scale-110`}></div>
                <span className={`text-xs font-semibold transition-colors duration-200 ${test.isActive ? 'text-green-600' : 'text-red-600'}`}>
                  {test.isActive ? 'Active' : 'Inactive'}
                </span>
                <div className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

{/* Desktop Layout */}
<div className="hidden sm:block">
  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
    {/* Left Content */}
    <div className="flex-1">
      {/* Badges */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <div className="flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          LIVE TEST
        </div>

        <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
          FREE
        </div>

        {showAdminActions && (
          <div
            onClick={handleToggleClick}
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md ${
              test.isActive
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full ${
                test.isActive ? "bg-white" : "bg-white"
              }`}
            ></div>
            {test.isActive ? "ACTIVE" : "INACTIVE"}
          </div>
        )}
      </div>

      {/* Title and User Count */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
        <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
          {test.title}
        </h2>
        <div className="flex items-center gap-1 text-gray-500 text-sm">
          <Zap className="w-4 h-4 text-yellow-500 flex-shrink-0" />
          <span>
            {test.userCount ? `${(test.userCount / 1000).toFixed(1)}k` : "1.5k"} Users
          </span>
        </div>
      </div>

      {/* Test Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-gray-500 text-sm">
        <div className="flex items-center gap-1">
          <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xs">❓</span>
          </div>
          <span>{test.questionCount} Questions</span>
        </div>

        <div className="flex items-center gap-1">
          <FileText className="w-4 h-4 flex-shrink-0" />
          <span>{test.totalMarks} Marks</span>
        </div>

        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4 flex-shrink-0" />
          <span>{test.duration} Mins</span>
        </div>
      </div>
    </div>

    {/* Right Content - Action Button */}
    <div className="flex-shrink-0 lg:ml-6">
      {showAdminActions ? (
        <div className="flex flex-col gap-2">
          <button
            onClick={handleStartClick}
            disabled={!test.isActive}
            className={`w-full sm:w-auto px-1 sm:px-2 py-1 rounded-lg font-bold text-white transition text-sm sm:text-base ${
              test.isActive
                ? "bg-cyan-500 hover:bg-cyan-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {test.isActive ? "Start Now" : "Test Inactive"}
          </button>

          {/* Active Status Toggle */}
          <div
            onClick={handleToggleClick}
            className="flex items-center justify-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md group"
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  test.isActive ? "bg-green-500" : "bg-red-500"
                } group-hover:scale-110`}
              ></div>
              <span
                className={`text-sm font-semibold transition-colors duration-200 ${
                  test.isActive ? "text-green-600" : "text-red-600"
                }`}
              >
                {test.isActive ? "Active" : "Inactive"}
              </span>

              <div className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Edit/Delete Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            {isAdmin && (
              <button
                onClick={handleEditClick}
                className="flex items-center justify-center gap-1 bg-blue-600 text-white px-3 py-2 rounded text-xs hover:bg-blue-700 transition"
              >
                <PencilLine className="w-3 h-3" />
              </button>
            )}

            {isAdmin && (
              <button
                onClick={handleDeleteClick}
                className="flex items-center justify-center gap-1 bg-red-600 text-white px-3 py-2 rounded text-xs hover:bg-red-700 transition"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      ) : (
        <button
          onClick={handleStartClick}
          disabled={!test.isActive}
          className={`w-full sm:w-auto px-4 sm:px-6 py-3 rounded-lg font-bold text-white transition text-sm sm:text-base ${
            test.isActive
              ? "bg-cyan-500 hover:bg-cyan-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {test.isActive ? "Start Now" : "Test Inactive"}
        </button>
      )}
    </div>
  </div>
</div>




      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 transform transition-all duration-300 scale-100">
            {/* Modal Header */}
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            {/* Modal Content */}
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {isAuthenticated() ? 'Start Test Confirmation' : 'Login Required'}
              </h3>
              <p className="text-gray-600 mb-4">
                {isAuthenticated()
                  ? 'Are you ready to start this test?'
                  : 'You need to be logged in to start this test.'
                }
              </p>

              {/* Test Details */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">{test.title}</h4>
                <div className="flex justify-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{test.duration} mins</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    <span>{test.questionCount} questions</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>{test.totalMarks} marks</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-500">
                {isAuthenticated()
                  ? 'Once you start, the timer will begin and you cannot pause the test.'
                  : 'Please register or login to access this test.'
                }
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleCancelStart}
                className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmStart}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition flex items-center justify-center gap-2 ${isAuthenticated()
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
              >
                <CheckCircle className="w-4 h-4" />
                {isAuthenticated() ? 'Start Test' : 'Login / Register'}
              </button>
            </div>
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


                <div>
                  <label className="block text-sm font-medium mb-1">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={editForm.title}
                    onChange={handleEditChange}
                    placeholder="Enter test title"
                    className={`w-full border ${editErrors.title ? "border-red-500" : "border-gray-300"
                      } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  />
                  {editErrors.title && (
                    <p className="text-red-500 text-xs mt-1">{editErrors.title}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Exam Type <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="examType"
                    value={editForm.examType}
                    onChange={handleEditChange}
                    placeholder="e.g. Mock, Practice"
                    className={`w-full border ${editErrors.examType ? "border-red-500" : "border-gray-300"
                      } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  />
                  {editErrors.examType && (
                    <p className="text-red-500 text-xs mt-1">{editErrors.examType}</p>
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
                    placeholder="e.g. 60"
                    className={`w-full border ${editErrors.duration ? "border-red-500" : "border-gray-300"
                      } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    min="1"
                  />
                  {editErrors.duration && (
                    <p className="text-red-500 text-xs mt-1">{editErrors.duration}</p>
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
                    placeholder="e.g. 100"
                    className={`w-full border ${editErrors.totalMarks ? "border-red-500" : "border-gray-300"
                      } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    min="1"
                  />
                  {editErrors.totalMarks && (
                    <p className="text-red-500 text-xs mt-1">{editErrors.totalMarks}</p>
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
                    placeholder="e.g. 50"
                    className={`w-full border ${editErrors.questionCount ? "border-red-500" : "border-gray-300"
                      } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    min="1"
                  />
                  {editErrors.questionCount && (
                    <p className="text-red-500 text-xs mt-1">{editErrors.questionCount}</p>
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
                    className={`w-full border ${editErrors.startDate ? "border-red-500" : "border-gray-300"
                      } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white`}
                  />
                  {editErrors.startDate && (
                    <p className="text-red-500 text-xs mt-1">{editErrors.startDate}</p>
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
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
                <p className="text-xs text-gray-500 mt-1">
                  Accepted formats: .xlsx, .xls (Max size: 10MB)
                </p>
              </div>
              {/* isActive Switch */}
              <div className="flex items-center mt-4">
                <label className="block text-sm font-medium mr-4">
                  Start Test Immediately
                </label>
                <button
                  type="button"
                  className={`relative inline-flex h-6 w-12 border-2 border-transparent rounded-full cursor-pointer transition-colors duration-200 focus:outline-none ${editForm.isActive ? "bg-green-500" : "bg-gray-300"
                    }`}
                  onClick={() =>
                    setEditForm((prev) => ({ ...prev, isActive: !prev.isActive }))
                  }
                  aria-pressed={editForm.isActive}
                >
                  <span
                    className={`inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition-transform duration-200 ${editForm.isActive ? "translate-x-6" : "translate-x-1"
                      }`}
                  />
                </button>
                <span
                  className={`ml-3 text-sm font-semibold ${editForm.isActive ? "text-green-600" : "text-gray-500"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 transform transition-all duration-300 scale-100">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="w-8 h-8 text-red-600" />
              </div>
            </div>

            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Delete Test
              </h3>
              <p className="text-gray-600 mb-4">
                Are you sure you want to delete this test?
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">{test.title}</h4>
                <p className="text-sm text-gray-600">
                  This action cannot be undone and will permanently delete the test.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleDeleteCancel}
                className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition"
              >
                Delete Test
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Status Confirmation Modal */}
      {showToggleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 transform transition-all duration-300 scale-100">
            <div className="flex items-center justify-center mb-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${test.isActive ? 'bg-red-100' : 'bg-green-100'}`}>
                {test.isActive ? (
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <CheckCircle className="w-8 h-8 text-green-600" />
                )}
              </div>
            </div>

            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {test.isActive ? 'Deactivate Test' : 'Activate Test'}
              </h3>
              <p className="text-gray-600 mb-4">
                {test.isActive
                  ? 'Are you sure you want to deactivate this test? Students will not be able to start it.'
                  : 'Are you sure you want to activate this test? Students will be able to start it.'
                }
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">{test.title}</h4>
                <div className="flex items-center justify-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${test.isActive ? 'bg-red-500' : 'bg-gray-400'}`}></div>
                  <span className="text-sm text-gray-600">Current Status: {test.isActive ? 'Active' : 'Inactive'}</span>
                </div>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <div className={`w-3 h-3 rounded-full ${!test.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <span className="text-sm text-gray-600">New Status: {!test.isActive ? 'Active' : 'Inactive'}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleToggleCancel}
                className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={handleToggleConfirm}
                disabled={isToggling}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition flex items-center justify-center gap-2 ${isToggling
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : test.isActive
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
              >
                {isToggling ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {test.isActive ? 'Deactivating...' : 'Activating...'}
                  </>
                ) : (
                  <>
                    {test.isActive ? (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Deactivate Test
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Activate Test
                      </>
                    )}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
