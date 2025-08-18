import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import TestCard from "./TestCard";

const AdminCategoryTests = () => {
  const { id } = useParams();
  const [tests, setTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState("");

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
              onEdit={() => {}}
              onDelete={() => {}}
              onToggleActive={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCategoryTests;
