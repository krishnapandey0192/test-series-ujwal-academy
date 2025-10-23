import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import TestCard from "./TestCard";

const TestSeriesTests = () => {
    const { categoryId, subcategoryId } = useParams();
    const navigate = useNavigate();
    const [tests, setTests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [subcategoryName, setSubcategoryName] = useState("");

    useEffect(() => {
        const fetchTests = async () => {
            setLoading(true);
            setError("");
            try {
                // Fetch tests for this category and subcategory
                const testsRes = await axiosInstance.get(`/api/tests?categoryId=${categoryId}&subcategoryId=${subcategoryId}`);
                setTests(testsRes.data.tests || []);

                // Fetch category name
                const catRes = await axiosInstance.get(`/api/categories/${categoryId}`);
                setCategoryName(catRes.data.category?.name || "");

                // Fetch subcategory name
                const subcatRes = await axiosInstance.get(`/api/subcategories/${subcategoryId}`);
                setSubcategoryName(subcatRes.data.subcategory?.name || "");
            } catch (err: any) {
                setError(err?.response?.data?.message || "Failed to fetch tests.");
                setTests([]);
                setCategoryName("");
                setSubcategoryName("");
            } finally {
                setLoading(false);
            }
        };
        fetchTests();
    }, [categoryId, subcategoryId]);

    const handleStartTest = (testId: string) => {
        // Navigate to test page
        navigate(`/student/test/view/${testId}`);
    };

    return (
        <section className="py-4 bg-gray-50 min-h-[60vh]">
            <div className="max-w-5xl mx-auto px-5">
                <div className="flex items-center gap-4 mb-8">
                    {/* <button
                        onClick={() => navigate(`/test-series/category/${categoryId}`)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                        ← Back to Subcategories
                    </button> */}
                    <div>
                        <h2 className="text-3xl font-bold text-blue-700">
                             {subcategoryName}
                        </h2>
                        <p className="text-gray-600 mt-1">
                             {categoryName}
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center min-h-[200px] text-lg">
                        Loading...
                    </div>
                ) : error ? (
                    <div className="flex justify-center items-center min-h-[200px] text-red-600">
                        {error}
                    </div>
                ) : tests.length === 0 ? (
                    <div className="flex justify-center items-center min-h-[200px] text-gray-600">
                        No tests found for this subcategory.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {tests.map((test) => (
                            <TestCard
                                key={test._id}
                                test={{
                                    id: test._id,
                                    _id: test._id,
                                    title: test.title,
                                    examType: test.examType,
                                    duration: test.duration,
                                    totalMarks: test.totalMarks,
                                    questionCount: test.questionCount,
                                    startDate: test.startDate,
                                    isActive: test.isActive,
                                    userCount: Math.floor(Math.random() * 5000) + 1000, // Random user count for demo
                                }}
                                onStart={() => handleStartTest(test._id)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default TestSeriesTests;
