import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const TestExperience = () => {
  // For demo, get studentId from localStorage or hardcode for now
  const studentId = localStorage.getItem("userId");
  const [attempts, setAttempts] = useState<any[]>([]);
  const [attemptsLoading, setAttemptsLoading] = useState(false);
  const [attemptsError, setAttemptsError] = useState("");
  const [selectedAttempt, setSelectedAttempt] = useState<any>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState("");

  // Fetch all attempts for student
  useEffect(() => {
    setAttemptsLoading(true);
    setAttemptsError("");
    axiosInstance
      .get(`/api/attempts/student/${studentId}`)
      .then((res) => setAttempts(res.data.attempts || []))
      .catch((err) =>
        setAttemptsError(
          err?.response?.data?.message || "Failed to fetch attempts.",
        ),
      )
      .finally(() => setAttemptsLoading(false));
  }, [studentId]);

  // Fetch analysis when selectedAttempt changes
  useEffect(() => {
    if (!selectedAttempt) return;
    setAnalysisLoading(true);
    setAnalysisError("");
    setAnalysis(null);
    axiosInstance
      .get(`/api/performance/test-analysis`, {
        params: {
          testId: selectedAttempt.testId._id,
          userId: studentId,
        },
      })
      .then((res) => setAnalysis(res.data.data))
      .catch((err) =>
        setAnalysisError(
          err?.response?.data?.message || "Failed to fetch analysis.",
        ),
      )
      .finally(() => setAnalysisLoading(false));
  }, [selectedAttempt, studentId]);

  return (
    <section
      id="my-tests"
      className="py-12 bg-gradient-to-br from-blue-50 to-purple-50 min-h-[60vh]"
    >
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">
          My Test Attempts
        </h2>
        {/* Attempts List */}
        {attemptsLoading ? (
          <div className="bg-white rounded-xl shadow p-8 text-center mb-8">
            <p className="text-blue-600 text-lg font-semibold">
              Loading attempts...
            </p>
          </div>
        ) : attemptsError ? (
          <div className="bg-white rounded-xl shadow p-8 text-center mb-8">
            <p className="text-red-600 text-lg font-semibold">
              {attemptsError}
            </p>
          </div>
        ) : attempts.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center mb-8">
            <p className="text-gray-500 text-lg">No test attempts found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {attempts.map((attempt) => (
              <div
                key={attempt._id}
                className={`bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-2 border-2 transition-all ${
                  selectedAttempt?._id === attempt._id
                    ? "border-blue-500 ring-2 ring-blue-200"
                    : "border-transparent"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg shadow">
                    {attempt?.testId?.title[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-lg text-gray-800">
                      {attempt?.testId?.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(attempt.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 text-sm mb-2">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded font-bold">
                    Score: {attempt.score}
                  </span>
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold">
                    Correct: {attempt.correctAnswers}
                  </span>
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded font-bold">
                    Wrong: {attempt.wrongAnswers}
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded font-bold">
                    Unanswered: {attempt.unanswered}
                  </span>
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded font-bold">
                    Time: {attempt.timeTaken}s
                  </span>
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-bold">
                    %: {attempt.percentage}
                  </span>
                </div>
                <button
                  className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow transition-all"
                  onClick={() => setSelectedAttempt(attempt)}
                  disabled={
                    selectedAttempt?._id === attempt._id && analysisLoading
                  }
                >
                  {selectedAttempt?._id === attempt._id && analysisLoading
                    ? "Loading..."
                    : "View Analysis"}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Analysis Section */}
        {selectedAttempt && (
          <div className="mb-8">
            {analysisLoading ? (
              <div className="bg-white rounded-xl shadow p-8 text-center">
                <p className="text-blue-600 text-lg font-semibold">
                  Loading analysis...
                </p>
              </div>
            ) : analysisError ? (
              <div className="bg-white rounded-xl shadow p-8 text-center">
                <p className="text-red-600 text-lg font-semibold">
                  {analysisError}
                </p>
              </div>
            ) : analysis ? (
              <>
                <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-1">
                      Exam Analysis
                    </h2>
                    <div className="text-lg font-semibold text-gray-700">
                      {analysis?.testTitle}
                    </div>
                    <div className="text-sm text-gray-500">
                      Student:{" "}
                      <span className="font-bold text-blue-700">
                        {analysis.student?.name}
                      </span>{" "}
                      ({analysis.student?.email})
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-2 md:mt-0">
                    <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-bold shadow">
                      Correct: {analysis.correctCount}
                    </div>
                    <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-bold shadow">
                      Total: {analysis.totalQuestions}
                    </div>
                  </div>
                </div>
                <div className="space-y-8">
                  {analysis.analysis.map((q: any, idx: number) => (
                    <div
                      key={q.questionId}
                      className="bg-white rounded-2xl shadow-lg p-6"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-lg shadow ${
                            q.isCorrect
                              ? "bg-green-500 text-white"
                              : q.selectedOption === -1
                                ? "bg-gray-300 text-gray-700"
                                : "bg-red-500 text-white"
                          }`}
                        >
                          {idx + 1}
                        </div>
                        <div className="text-base md:text-lg font-semibold text-gray-800 flex-1">
                          {q.questionText}
                        </div>
                        {q.isCorrect ? (
                          <span className="ml-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                            Correct
                          </span>
                        ) : q.selectedOption === -1 ? (
                          <span className="ml-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-bold">
                            Unanswered
                          </span>
                        ) : (
                          <span className="ml-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold">
                            Wrong
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                        {q.options.map((opt: string, i: number) => {
                          const isCorrect = i === q.correctOption;
                          const isSelected = i === q.selectedOption;
                          return (
                            <div
                              key={i}
                              className={`flex items-center px-4 py-3 rounded-lg border-2 transition-all font-medium text-base shadow-sm
                                ${
                                  isCorrect
                                    ? "border-green-500 bg-green-50 text-green-800"
                                    : isSelected
                                      ? "border-red-500 bg-red-50 text-red-800"
                                      : "border-gray-200 bg-gray-50 text-gray-700"
                                }
                                ${
                                  isCorrect && isSelected
                                    ? "ring-2 ring-green-400"
                                    : ""
                                }
                              `}
                            >
                              <span
                                className={`w-6 h-6 rounded-full mr-3 border-2 flex items-center justify-center
                                ${
                                  isCorrect
                                    ? "border-green-500 bg-green-100 text-green-700"
                                    : isSelected
                                      ? "border-red-500 bg-red-100 text-red-700"
                                      : "border-gray-300 bg-white text-gray-700"
                                }
                              `}
                              >
                                {isCorrect ? "✔" : isSelected ? "✖" : ""}
                              </span>
                              <span>{opt}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestExperience;
