import Thumbnail from "./../assets/ssc-thumbnail.png";
import {
  PencilLine,
  Trash2,
  Timer,
  ListChecks,
  // FileText,
  BookText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type Test = {
  id: string;
  title: string;
  examType: string;
  duration: number;
  totalMarks: number;
  questionCount: number;
  image?: string;
  startDate?: string;
  isActive?: boolean;
};

type TestCardProps = {
  test: Test;
  onEdit: (test: Test) => void;
  onDelete: (id: string) => void;
  onToggleActive: (id: string) => void;
  onView?: (test: Test) => void;
};

export default function TestCard({
  test,
  onEdit,
  onDelete,
  onToggleActive,
  // onView,
}: TestCardProps) {
  const navigate = useNavigate();
  const handleView = () => {
    navigate(`/admin/test/view/${test.id}`);
  };
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
      {/* Image Banner */}
      <img
        src={Thumbnail || "/test-thumbnail.jpg"}
        alt="Test Thumbnail"
        className="w-full h-40 object-cover"
      />

      {/* Content */}
      <div className="p-5">
        {/* Title and Exam */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">{test.title}</h2>
          <span className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full font-medium mt-2 sm:mt-0">
            {test.examType}
          </span>
        </div>

        {/* Start Date and Status Switch */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Start Date:</span>
            <span className="font-medium">
              {test.startDate
                ? new Date(test.startDate).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
          <label className="flex items-center cursor-pointer select-none">
            <div className="relative">
              <input
                type="checkbox"
                checked={!!test.isActive}
                onChange={() => onToggleActive(test.id)}
                className="sr-only"
              />
              <div
                className={`block w-10 h-6 rounded-full transition ${
                  test.isActive ? "bg-green-500" : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                  test.isActive ? "translate-x-4" : ""
                }`}
              ></div>
            </div>
            <span
              className={`ml-3 text-sm font-medium ${
                test.isActive ? "text-green-600" : "text-red-600"
              }`}
            >
              {test.isActive ? "Active" : "Inactive"}
            </span>
          </label>
        </div>

        {/* Two Column Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Timer className="w-4 h-4" />
            Duration: <span className="font-medium">{test.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <ListChecks className="w-4 h-4" />
            Questions: <span className="font-medium">{test.questionCount}</span>
          </div>
          {/* <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Test ID: <span className="font-medium">#{test.id}</span>
          </div> */}
        </div>

        {/* Total Marks on its own line */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
          <BookText className="w-4 h-4" />
          Total Marks: <span className="font-medium">{test.totalMarks}</span>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(test)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
            >
              <PencilLine className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={() => onDelete(test.id)}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
            <button
              onClick={handleView}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition"
              type="button"
            >
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
