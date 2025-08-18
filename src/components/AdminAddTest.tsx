import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

// For adding questions: fetch all tests for dropdown

const AdminAddTest = () => {
  // For add question: fetch all tests
  const [tests, setTests] = useState<{ id: string; title: string }[]>([]);
  const [selectedTestId, setSelectedTestId] = useState("");
  const [questionFile, setQuestionFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Fetch all tests for dropdown
    const fetchTests = async () => {
      try {
        const res = await axiosInstance.get("/api/tests");
        const arr = (res.data.tests || []).map((t: any) => ({
          id: t._id,
          title: t.title,
        }));
        setTests(arr);
        // Do not auto-select any test; default is ""
      } catch {
        setTests([]);
      }
    };
    fetchTests();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!selectedTestId) {
      setError("Please select a test");
      return;
    }
    if (!questionFile) {
      setError("Please upload a question file (Excel)");
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", questionFile);
      // API expects testId in body or as param, here as body
      formData.append("testId", selectedTestId);
      await axiosInstance.post("/api/questions", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess("Questions uploaded successfully!");
      setQuestionFile(null);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to upload questions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-green-700">
        Add Questions to Test
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row md:items-end gap-4 mb-8"
        encType="multipart/form-data"
      >
        <div className="flex-1">
          <label className="block text-sm font-semibold mb-1">
            Select Test
          </label>
          <select
            value={selectedTestId}
            onChange={(e) => setSelectedTestId(e.target.value)}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          >
            <option value="">Select Test</option>
            {tests.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-semibold mb-1">
            Upload Question File (Excel)
          </label>
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={(e) => {
              if (e.target.files && e.target.files[0])
                setQuestionFile(e.target.files[0]);
            }}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
            required
          />
          {questionFile && (
            <p className="text-xs text-green-700 mt-1">
              Selected: {questionFile.name}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded font-bold shadow hover:from-blue-500 hover:to-green-500 transition"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Questions"}
        </button>
      </form>
      {error && <div className="text-red-600 font-semibold mb-2">{error}</div>}
      {success && (
        <div className="text-green-600 font-semibold mb-2">{success}</div>
      )}
    </div>
  );
};

export default AdminAddTest;
