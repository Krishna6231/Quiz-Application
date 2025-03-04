import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import questionsData from "../assets/questions.json";

function Home() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [questionType, setQuestionType] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [role, setRole] = useState("student");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    setRole(localStorage.getItem('role'));
  }, []);

  useEffect(() => {
    const allQuestions = [
      ...questionsData.single_correct.map(q => ({ ...q, type: "Single Correct Option Questions" })),
      ...questionsData.multi_correct.map(q => ({ ...q, type: "Multiple Choice Questions" })),
      ...questionsData.true_false.map(q => ({ ...q, type: "True or False Questions" }))
    ];
    setQuestions(allQuestions);
    if (allQuestions.length > 0) {
      setQuestionType(allQuestions[0].type);
    }
  }, []);

  // Backward Protection
  useEffect(() => {
    // Replace the current history entry with the current page
    window.history.replaceState(null, "", window.location.href);

    // Add a new history entry when the component mounts
    window.history.pushState(null, "", window.location.href);

    // Handle the popstate event (triggered by the back button)
    const handleBackButton = () => {
      // Replace the current history entry again to prevent going back
      window.history.replaceState(null, "", window.location.href);
    };

    // Add event listener for the popstate event
    window.addEventListener("popstate", handleBackButton);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswer = (option) => {
    if (!answered) {
      const currentQuestion = questions[currentQuestionIndex];

      if (Array.isArray(currentQuestion.answer)) {
        // Multi-select logic
        setSelectedOptions((prev) =>
          prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
        );
      } else {
        // Single-select logic
        setSelectedOptions([option]);
      }
    }
  };

  const handleSubmit = () => {
    if (selectedOptions.length === 0) return;

    const correctAnswer = questions[currentQuestionIndex].answer;
    let isCorrect;

    if (Array.isArray(correctAnswer)) {
      // Multi-choice validation
      isCorrect =
        selectedOptions.length === correctAnswer.length &&
        selectedOptions.every((opt) => correctAnswer.includes(opt));
    } else {
      // Single-choice validation
      isCorrect = selectedOptions[0] === correctAnswer;
    }

    setFeedback(isCorrect ? "correct" : "wrong");
    if (isCorrect) setScore(score + 1);
    setAnswered(true);
  };

  const handleNext = () => {
    setFeedback(null);
    setSelectedOptions([]);
    setAnswered(false);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setQuestionType(questions[currentQuestionIndex + 1].type);
    } else {
      setQuizCompleted(true);
    }
  };

  // Logout Functionality
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    localStorage.removeItem("role"); // Remove role from localStorage
    navigate("/login", { replace: true }); // Redirect to the login page and replace history
  };

  const leaderboardData = [
    { name: "Alice", score: 95 },
    { name: "Bob", score: 88 },
    { name: "Charlie", score: 80 },
    { name: "David", score: 75 },
    { name: "Eve", score: 70 }
  ];

  if (role === "ADMIN") {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
        <header className="w-full bg-red-500 text-white py-4 px-6 text-xl font-semibold text-left flex justify-between">
          Welcome Admin
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-white text-red-500 rounded-lg hover:bg-red-100 transition-all"
          >
            Logout
          </button>
        </header>
        <div className="mt-10 w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
          <p className="text-lg mt-4">Manage questions, users, and analytics here.</p>
        </div>
        <div className="mt-10 w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold">Student Leaderboard</h2>
          <table className="w-full mt-4 border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Rank</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((student, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{student.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{student.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <header className="w-full bg-blue-500 text-white py-4 px-6 text-xl font-semibold text-left flex justify-between">
        Welcome Student
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-white text-blue-500 rounded-lg hover:bg-blue-100 transition-all"
        >
          Logout
        </button>
      </header>

      {!quizStarted && !quizCompleted && (
        <button
          onClick={startQuiz}
          className="mt-10 px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded-lg hover:bg-green-600"
        >
          Start Quiz
        </button>
      )}

      {quizCompleted && (
        <div className="mt-10 text-center bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold">Quiz Completed! 🎉</h2>
          <p className="text-lg mt-4">Your Score: {score} / {questions.length}</p>
        </div>
      )}

      {quizStarted && !quizCompleted && questions.length > 0 && (
        <div className="mt-10 w-full max-w-md">
          {/* Progress Bar */}
          <div className="w-full bg-gray-300 h-4 rounded-lg overflow-hidden mb-4">
            <div
              className="bg-blue-500 h-4"
              style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
            ></div>
          </div>

          <h3 className="text-lg font-semibold mb-4">{questionType}</h3>
          <div className="mb-6 bg-white shadow-lg rounded-lg p-6 text-center">
            <h2 className="text-lg font-semibold mb-4">{questions[currentQuestionIndex].question}</h2>
            <div className="flex flex-col gap-3">
              {["option1", "option2", "option3", "option4"].map(
                (optionKey) =>
                  questions[currentQuestionIndex][optionKey] && (
                    <button
                      key={optionKey}
                      onClick={() => handleAnswer(optionKey)}
                      className={`px-4 py-2 rounded-lg border text-lg font-medium transition-all duration-300
                        ${
                          answered
                            ? questions[currentQuestionIndex].answer.includes(optionKey)
                              ? "bg-green-500 text-white" // Correct answer turns green
                              : selectedOptions.includes(optionKey)
                              ? "bg-red-500 text-white" // Wrong answer turns red
                              : "bg-gray-200"
                            : selectedOptions.includes(optionKey)
                            ? "bg-blue-300" // Selected options before submission stay blue
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                      disabled={answered}
                    >
                      {questions[currentQuestionIndex][optionKey]}
                    </button>
                  )
              )}
            </div>
          </div>

          {/* Feedback Message */}
          {feedback ? (
            <p className={`text-lg font-semibold ${feedback === "correct" ? "text-green-500" : "text-red-500"}`}>
              {feedback === "correct" ? "You are correct! ✅" : "You are wrong! ❌"}
            </p>
          ) : (
            <div>
              <p className="text-lg font-semibold text-gray-500">Answer the question</p>
            </div>
          )}

          <div className="flex justify-between mt-4">
            <button
              onClick={handleSubmit}
              className={`px-6 py-2 font-semibold rounded-lg transition-all ${
                selectedOptions.length > 0 && !answered
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={selectedOptions.length === 0 || answered}
            >
              Submit
            </button>
            <button
              onClick={handleNext}
              className={`px-6 py-2 font-semibold rounded-lg transition-all ${
                answered ? "bg-green-500 text-white hover:bg-green-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!answered}
            >
              {currentQuestionIndex + 1 < questions.length ? "Next" : "End"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;