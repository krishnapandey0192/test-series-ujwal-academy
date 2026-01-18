// import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Scoreboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const attempt = location.state?.attempt;

  if (!attempt) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-red-600">
        No attempt data found.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 font-roboto">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center border-t-8 border-blue-600">
        <h1 className="text-base sm:text-lg lg:text-xl font-black tracking-tight">
          <span className="bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-800 bg-clip-text text-transparent">
            UJJWAL ACADEMY MAUGANJ
          </span>
        </h1>
        <h2 className="text-xl font-bold text-blue-700 my-2">
          Test Submitted!
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Congratulations on completing your test.
        </p>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-700">
              {attempt.score}
            </div>
            <div className="text-xs text-gray-500">Score</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-700">
              {attempt.percentage}%
            </div>
            <div className="text-xs text-gray-500">Percentage</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-xl font-bold text-green-700">
              {attempt.correctAnswers}
            </div>
            <div className="text-xs text-gray-500">Correct</div>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <div className="text-xl font-bold text-red-700">
              {attempt.wrongAnswers}
            </div>
            <div className="text-xs text-gray-500">Wrong</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 col-span-2">
            <div className="text-xl font-bold text-yellow-700">
              {attempt.unanswered}
            </div>
            <div className="text-xs text-gray-500">Unanswered</div>
          </div>
        </div>
        <div className="mb-4 text-gray-600">
          Total Questions:{" "}
          <span className="font-semibold">{attempt.totalQuestions}</span>
        </div>
        <button
          className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
          onClick={() => navigate("/")}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Scoreboard;
