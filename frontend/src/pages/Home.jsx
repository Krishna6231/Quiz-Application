import React, { useState, useEffect } from "react";
import questionsData from "../assets/questions.json";

function Home() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [questionType, setQuestionType] = useState("Single Correct Option Questions");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

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

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswer = (option, correctAnswer) => {
    setSelectedOption(option);

    if (
      (Array.isArray(correctAnswer) && correctAnswer.includes(option)) ||
      (!Array.isArray(correctAnswer) && option === correctAnswer)
    ) {
      setFeedback("correct");
      setScore(score + 1);
    } else {
      setFeedback("wrong");
    }

    setTimeout(() => {
      setFeedback(null);
      setSelectedOption(null);
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setQuestionType(questions[currentQuestionIndex + 1].type);
      } else {
        setQuizCompleted(true);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-blue-500 text-white py-4 px-6 text-xl font-semibold text-left">
        Welcome Student
      </header>

      {/* Start Quiz Button */}
      {!quizStarted && !quizCompleted && (
        <button
          onClick={startQuiz}
          className="mt-10 px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded-lg hover:bg-green-600"
        >
          Start Quiz
        </button>
      )}

      {/* Quiz Completion Message */}
      {quizCompleted && (
        <div className="mt-10 text-center bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold">Quiz Completed! 🎉</h2>
          <p className="text-lg mt-4">Your Score: {score} / {questions.length}</p>
        </div>
      )}

      {/* Quiz Questions */}
      {quizStarted && !quizCompleted && questions.length > 0 && (
        <div className="mt-10 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">{questionType}</h3>
          <div className="mb-6 bg-white shadow-lg rounded-lg p-6 text-center">
            <h2 className="text-lg font-semibold mb-4">{questions[currentQuestionIndex].question}</h2>
            <div className="flex flex-col gap-3">
              {["option1", "option2", "option3", "option4"].map(
                (optionKey) =>
                  questions[currentQuestionIndex][optionKey] && (
                    <button
                      key={optionKey}
                      onClick={() => handleAnswer(optionKey, questions[currentQuestionIndex].answer)}
                      className={`px-4 py-2 rounded-lg border text-lg font-medium transition-all duration-300
                        ${
                          feedback && optionKey === questions[currentQuestionIndex].answer
                            ? "bg-green-500 text-white"
                            : feedback && optionKey === selectedOption
                            ? "bg-red-500 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                      disabled={feedback !== null}
                    >
                      {questions[currentQuestionIndex][optionKey]}
                    </button>
                  )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;