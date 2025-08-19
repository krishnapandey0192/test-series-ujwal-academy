import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import TestCard from "./TestCard";

const AdminCategoryTests = () => {
  const { id } = useParams();
  const [tests, setTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    examType: "",
    duration: "",
    totalMarks: "",
    questionCount: "",
    startDate: "",
    isActive: true,
    categoryId: id || "",
  });
  const [errors, setErrors] = useState({
    title: "",
    examType: "",
    duration: "",
    totalMarks: "",
    questionCount: "",
    startDate: "",
  });

  // Fetch tests and category name
  useEffect(() => {
    const fetchTests = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/api/tests?category=${id}`);
        setTests(res.data.tests || []);
        // Optionally fetch category name
        const catRes = await axiosInstance.get(`/api/categories/${id}`);
        setCategoryName(catRes.data.category?.name || "");
      } catch {
        setTests([]);
        setCategoryName("");
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, [id]);

  // Toggle active status
  async function handleToggleActive(testId: string) {
    const testToToggle = tests.find((t) => t._id === testId);
    if (!testToToggle) return;
    const updated = { ...testToToggle, isActive: !testToToggle.isActive };
    setTests((prev) =>
      prev.map((test) =>
        test._id === testId ? { ...test, isActive: !test.isActive } : test
      )
    );
    try {
      await axiosInstance.put(`/api/tests/${testId}`, updated);
    } catch (err) {
      setTests((prev) =>
        prev.map((test) =>
          test._id === testId
            ? { ...test, isActive: testToToggle.isActive }
            : test
        )
      );
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-green-700 mb-4">
        Tests for Category: {categoryName}
      </h2>
      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading...</div>
      ) : tests.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No tests found for this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((test) => (
            <TestCard
              key={test._id}
              test={test}
              onEdit={() => {
                setShowModal(true);
                setIsEdit(true);
                setEditId(test._id);
                setForm({
                  title: test.title,
                  examType: test.examType,
                  duration: String(test.duration),
                  totalMarks: String(test.totalMarks),
                  questionCount: String(test.questionCount),
                  startDate: test.startDate ? test.startDate.split("T")[0] : "",
                  isActive:
                    typeof test.isActive === "boolean" ? test.isActive : true,
                  categoryId: test.categoryId || id || "",
                });
                setErrors({
                  title: "",
                  examType: "",
                  duration: "",
                  totalMarks: "",
                  questionCount: "",
                  startDate: "",
                });
              }}
              onDelete={async () => {
                setShowDeleteModal(true);
                setDeleteId(test._id);
              }}
              onView={() => {
                alert(`Viewing test: ${test.title}`);
              }}
              onToggleActive={() => handleToggleActive(test._id)}
            />
          ))}
        </div>
      )}
      {/* Modal and delete modal logic can be added here if needed, similar to AdminTests */}
    </div>
  );
};

export default AdminCategoryTests;
