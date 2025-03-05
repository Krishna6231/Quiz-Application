import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

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
    fetch("http://localhost:8080/api/questions")
      .then(response => response.json())
      .then(data => {
        setQuestions(data);
        if (data.length > 0) {
          setQuestionType(data[0].type);
        }
      })
      .catch(error => console.error("Error fetching questions:", error));
  }, []);

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswer = (option) => {
    if (!answered) {
      const currentQuestion = questions[currentQuestionIndex];
      if (Array.isArray(currentQuestion.correctAnswer)) {
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

    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
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
    if (!answered) return;
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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <header className="w-full bg-blue-500 text-white py-4 px-6 text-xl font-semibold text-left flex justify-between">
        Welcome Student
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            navigate("/login", { replace: true });
          }}
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
              {questions[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`px-4 py-2 rounded-lg border text-lg font-medium transition-all duration-300
                    ${
                      answered
                        ? questions[currentQuestionIndex].correctAnswer.includes(option)
                          ? "bg-green-500 text-white"
                          : selectedOptions.includes(option)
                          ? "bg-red-500 text-white"
                          : "bg-gray-200"
                        : selectedOptions.includes(option)
                        ? "bg-blue-300"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  disabled={answered}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {feedback && (
            <p className={`text-lg font-semibold ${feedback === "correct" ? "text-green-500" : "text-red-500"}`}>
              {feedback === "correct" ? "You are correct! ✅" : "You are wrong! ❌"}
            </p>
          )}

          <div className="flex justify-between mt-4">
            <button
              onClick={handleSubmit}
              className={`px-6 py-2 font-semibold rounded-lg transition-all ${
                selectedOptions.length > 0 && !answered ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"
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
