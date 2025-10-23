import { useState } from "react";
import TestCard from "./components/TestCard";

// Example API response (replace with your actual data fetch)
const apiResponse = {
  attempts: [
    {
      _id: "6880aa4f2027fec9a2feaa7e",
      testId: {
        _id: "687c83aef6f3408656c1769a",
        title: "Mp police",
        examType: "Mock",
        totalMarks: 20,
      },
      timeTaken: 14,
      totalQuestions: 20,
      createdAt: "2025-07-23T09:24:31.811Z",
    },
    {
      _id: "687c886d1840e81c77d496b2",
      testId: {
        _id: "687c83aef6f3408656c1769a",
        title: "Mp police",
        examType: "Mock",
        totalMarks: 20,
      },
      timeTaken: 50,
      totalQuestions: 20,
      createdAt: "2025-07-20T06:10:53.969Z",
    },
  ],
  total: 2,
};

// Transform attempts to TestCard props, add isActive
const initialTests = apiResponse.attempts.map((attempt, idx) => ({
  id: attempt.testId._id,
  _id: attempt.testId._id, // Add _id property
  title: attempt.testId.title,
  examType: attempt.testId.examType,
  totalMarks: attempt.testId.totalMarks,
  duration: attempt.timeTaken,
  questionCount: attempt.totalQuestions,
  startDate: attempt.createdAt,
  isActive: idx === 0, // Only first active for demo, or set all false
}));

export default function TestList() {
  const [tests, _setTests] = useState(initialTests);

  // const handleToggleActive = (id: string) => {
  //   setTests((prev) =>
  //     prev.map((test) =>
  //       test.id === id ? { ...test, isActive: !test.isActive } : test
  //     )
  //   );
  // };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {tests.map((test) => (
        <TestCard
          key={test.id}
          test={test}

        // onToggleActive={handleToggleActive}
        />
      ))}
    </div>
  );
}
