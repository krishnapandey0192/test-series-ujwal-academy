import { useState } from "react";

export default function AddTest() {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [marks, setMarks] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Test Added:\n${title} - ${duration} - ${marks}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Test</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Test Title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Duration (e.g., 60 min)"
          className="w-full border p-2 rounded"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <input
          type="number"
          placeholder="Total Marks"
          className="w-full border p-2 rounded"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Test
        </button>
      </form>
    </div>
  );
}
