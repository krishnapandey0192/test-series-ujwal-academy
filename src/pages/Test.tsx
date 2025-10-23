import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const TestPage = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState<any[]>([]);
  const [testTitle, setTestTitle] = useState<string>("");
  const [duration, setDuration] = useState<number | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [review, setReview] = useState<string[]>([]);
  const [timer, setTimer] = useState<number>(0); // Will be set from duration
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    const fetchQuestions = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axiosInstance.get(`/api/questions/${id}`);
        setQuestions(res.data.questions || []);
        setTestTitle(res.data.testTitle || "");
        if (typeof res.data.duration === "number" && res.data.duration > 0) {
          setDuration(res.data.duration);
          setTimer(res.data.duration * 60); // set timer in seconds
        } else {
          setDuration(null);
          setTimer(0);
        }
      } catch (err: any) {
        if (err?.response?.status === 403) {
          setError("not-started-403");
        } else {
          setError(
            err?.response?.data?.message || "Failed to fetch questions."
          );
        }
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [id]);

  useEffect(() => {
    if (timer === 0) {
      // Auto-submit when timer reaches 0
      if (questions.length && !submitting) {
        handleSubmit();
      }
      return;
    }
    if (!timer || timer < 0) return;
    const interval = setInterval(() => {
      setTimer((prev: number) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, questions.length, submitting]);

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleAnswer = (ans: string) => {
    const qid = questions[currentQ]?._id || questions[currentQ]?.id;
    if (answers[qid] === ans) {
      // Deselect if already selected
      const newAnswers = { ...answers };
      delete newAnswers[qid];
      setAnswers(newAnswers);
    } else {
      setAnswers({
        ...answers,
        [qid]: ans,
      });
    }
  };

  const toggleReview = () => {
    const id = questions[currentQ]?._id || questions[currentQ]?.id;
    setReview((prev: string[]) =>
      prev.includes(id) ? prev.filter((r: string) => r !== id) : [...prev, id]
    );
  };

  const isAttempted = (id: string) => answers[id];
  const isMarked = (id: string) => review.includes(id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading questions...
      </div>
    );
  }
  if (error) {
    if (error === "not-started-403") {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-100 to-yellow-100 px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full flex flex-col items-center animate-fade-in">
            <div className="text-6xl mb-4">⏳</div>
            <h2 className="text-2xl font-bold text-red-600 mb-2 text-center">
              Test Not Started Yet
            </h2>
            <p className="text-gray-700 text-center mb-6">
              This test is not currently active.
              <br />
              Please check the scheduled start date or contact your
              administrator for more information.
            </p>
            <button
              onClick={() => (window.location.href = "/test-series")}
              className="mt-2 px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow hover:from-blue-700 hover:to-purple-700 transition"
            >
              Back to Test Series
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-red-600">
        {error}
      </div>
    );
  }
  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        No questions found.
      </div>
    );
  }

  // Calculate time taken in seconds
  const totalTime = duration ? duration * 60 : 0;
  const timeTaken = totalTime - timer;

  // Convert answers object to array of { questionId, selectedOption } where selectedOption is the actual value (e.g., 'Valmiki')
  const answersArray = Object.entries(answers).map(
    ([questionId, selectedOption]) => ({
      questionId,
      selectedOption,
    })
  );

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await axiosInstance.post("/api/attempts/submit", {
        testId: id,
        answers: answersArray,
        timeTaken,
      });
      setShowModal(false);
      setTimer(0); // stop timer
      setAnswers({});
      setReview([]);
      setQuestions([]);
      setTestTitle("");
      // Redirect to scoreboard with attempt data
      navigate("/scoreboard", { state: { attempt: res.data.attempt } });
    } catch (err: any) {
      setSubmitError(err?.response?.data?.message || "Failed to submit test.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row font-roboto">
      {/* Left Panel: Question and Navigation */}
      <div className="flex-1 p-4">
        {/* Test Title & Duration */}
        {testTitle && (
          <div className="mb-2 text-2xl font-bold text-center text-blue-700">
            {testTitle}
          </div>
        )}
        {duration !== null && (
          <div className="mb-1 text-center text-base text-gray-700 font-medium">
            Duration: {duration} minute{duration === 1 ? "" : "s"}
          </div>
        )}
        {/* Timer */}
        <div className="text-right mb-1 text-sm font-semibold text-blue-600">
          Time Left: {formatTime(timer)}
        </div>

        {/* Question Box */}
        <div className="flex flex-wrap gap-3 mb-1 text-xs text-gray-800">
          <span className="bg-gray-200 px-1 py-1 rounded">
            Section: {questions[currentQ]?.section}
          </span>
          <span className="bg-gray-200 px-1 py-1 rounded">
            Marks: {questions[currentQ]?.marks}
          </span>
          <span className="bg-gray-200 px-1 py-1 rounded">
            Negative: {questions[currentQ]?.negativeMarks}
          </span>
          {/* <span className="bg-gray-100 px-2 py-1 rounded">
                Difficulty: {questions[currentQ]?.difficulty}
              </span> */}
        </div>
        <div className="bg-white p-3 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">

            <h3 className="text-sm font-semibold mb-1 md:mb-0">
              Q{currentQ + 1}. {questions[currentQ]?.questionText}
            </h3>

          </div>

          <div className="space-y-2">
            {(questions[currentQ]?.options || []).map((opt: string) => (
              <label
                key={opt}
                className={`block text-sm p-2 border rounded-lg cursor-pointer transition ${answers[
                  questions[currentQ]?._id || questions[currentQ]?.id
                ] === opt
                  ? "bg-blue-100 border-blue-500"
                  : "bg-white border-gray-300 hover:bg-gray-50"
                  }`}
                onClick={() => handleAnswer(opt)}
              >
                <span className="inline-block align-middle mr-2">
                  <span
                    className={`w-4 h-4 inline-block rounded-full border-2 ${answers[
                      questions[currentQ]?._id || questions[currentQ]?.id
                    ] === opt
                      ? "border-blue-600 bg-blue-600"
                      : "border-gray-400 bg-white"
                      }`}
                    style={{ verticalAlign: "middle" }}
                  >
                    {answers[
                      questions[currentQ]?._id || questions[currentQ]?.id
                    ] === opt && (
                        <span className="block w-2 h-2 m-1 rounded-full bg-white"></span>
                      )}
                  </span>
                </span>
                {opt}
              </label>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-3 flex flex-wrap justify-between items-center gap-4">
          <button
            onClick={() => setCurrentQ((prev: number) => Math.max(0, prev - 1))}
            className="bg-gray-300 hover:bg-gray-400 text-sm px-2 py-1 rounded-lg"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentQ((prev: number) =>
                Math.min(questions.length - 1, prev + 1)
              )
            }
            className="bg-blue-600 hover:bg-blue-700 text-sm px-2 py-1 rounded-lg text-white"
          >
            Save & Next
          </button>
          <button
            onClick={toggleReview}
            className="bg-yellow-400 hover:bg-yellow-500 text-sm px-2 py-1 rounded-lg text-white"
          >
            {isMarked(questions[currentQ]?._id || questions[currentQ]?.id)
              ? "Unmark"
              : "Mark for Review"}
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 hover:bg-green-700 text-sm px-2 py-1 rounded-lg text-white"
          >
            Submit
          </button>
        </div>

        {/* Submit Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
              <h2 className="text-xl font-bold mb-4">Submit Test?</h2>
              <p className="mb-4">
                Are you sure you want to submit your answers? You won't be able
                to change them after submission.
              </p>
              {submitError && (
                <div className="text-red-600 mb-2">{submitError}</div>
              )}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white"
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Panel: Question Navigator */}
      <div className="w-full lg:w-72 p-4 bg-white border-l mt-4 lg:mt-0">
        <h3 className="text-lg font-semibold mb-4">Question Navigator</h3>
        <div className="grid grid-cols-5 gap-2">
          {questions.map((q: any, index: number) => {
            const id = q._id || q.id;
            const attempted = isAttempted(id);
            const marked = isMarked(id);
            return (
              <button
                key={id}
                onClick={() => setCurrentQ(index)}
                className={`w-10 h-10 rounded-full text-sm font-medium
                  ${attempted && marked
                    ? "bg-purple-500 text-white"
                    : attempted
                      ? "bg-green-500 text-white"
                      : marked
                        ? "bg-yellow-500 text-white"
                        : "bg-gray-300 text-gray-700"
                  } hover:opacity-80`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
        <div className="mt-6 space-y-2 text-sm">
          <div>
            <span className="inline-block w-4 h-4 bg-green-500 mr-2 rounded-sm"></span>
            Answered
          </div>
          <div>
            <span className="inline-block w-4 h-4 bg-yellow-500 mr-2 rounded-sm"></span>
            Marked
          </div>
          <div>
            <span className="inline-block w-4 h-4 bg-gray-300 mr-2 rounded-sm"></span>
            Not Attempted
          </div>
          <div>
            <span className="inline-block w-4 h-4 bg-purple-500 mr-2 rounded-sm"></span>
            Answered & Marked
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
