import "./MockExam.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import questions from "./data/questions";
import { useNavigate } from "react-router-dom";

function MockExam() {
const navigate = useNavigate();
  const { id } = useParams();

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answers, setAnswers] =
    useState({});

  const [timeLeft, setTimeLeft] =
    useState(10800);

  const [reviewQuestions, setReviewQuestions] =
    useState([]);

  const question =
    questions[currentQuestion];

  useEffect(() => {

    const timer = setInterval(() => {

      setTimeLeft((prev) => {

        if (prev <= 1) {

          clearInterval(timer);

          return 0;

        }

        return prev - 1;

      });

    }, 1000);

    return () => clearInterval(timer);

  }, []);

  const hours =
    String(Math.floor(timeLeft / 3600))
      .padStart(2, "0");

  const minutes =
    String(
      Math.floor(
        (timeLeft % 3600) / 60
      )
    ).padStart(2, "0");

  const seconds =
    String(timeLeft % 60)
      .padStart(2, "0");

  const selectOption = (optionIndex) => {

    setAnswers({
      ...answers,
      [currentQuestion]: optionIndex
    });

  };

  const markForReview = () => {

    if (
      !reviewQuestions.includes(
        currentQuestion
      )
    ) {

      setReviewQuestions([
        ...reviewQuestions,
        currentQuestion
      ]);

    }

  };

  const nextQuestion = () => {

    if (
      currentQuestion <
      questions.length - 1
    ) {

      setCurrentQuestion(
        currentQuestion + 1
      );

    }

  };

  const prevQuestion = () => {

    if (
      currentQuestion > 0
    ) {

      setCurrentQuestion(
        currentQuestion - 1
      );

    }

  };
const submitTest = () => {

  let correct = 0;

  questions.forEach((q, index) => {

    if (
      answers[index] === q.answer
    ) {
      correct++;
    }

  });

  const wrong =
    Object.keys(answers).length - correct;

  const skipped =
    questions.length -
    Object.keys(answers).length;

  const accuracy =
    Object.keys(answers).length === 0
      ? 0
      : (
          (correct /
            Object.keys(answers).length) *
          100
        ).toFixed(2);

  localStorage.setItem(
    "mockResult",
    JSON.stringify({
      correct,
      wrong,
      skipped,
      total: questions.length,
      accuracy
    })
  );

  navigate("/mock-result/1");

};

  return (

    <div className="exam-page">

      <div className="exam-header">

        <h2>
          MHT CET Mock Test {id}
        </h2>

        <h3>
          {hours}:{minutes}:{seconds}
        </h3>

      </div>

      <div className="exam-body">

     <div className="exam-left">

  <div className="question-card">

    <h3>
      Question {currentQuestion + 1}
    </h3>

    <p className="question-text">
      {question.question}
    </p>

    <div className="options">

      {question.options.map(
        (option, index) => (

          <button
            key={index}
            onClick={() =>
              selectOption(index)
            }
            className={
              answers[currentQuestion] === index
                ? "selected-option"
                : ""
            }
          >
            {option}
          </button>

        )
      )}

    </div>

  </div>

  <div className="exam-actions">

            <button
              onClick={prevQuestion}
            >
              Previous
            </button>

            <button
              onClick={markForReview}
            >
              Mark Review
            </button>

            {
              currentQuestion ===
              questions.length - 1
                ?

                <button
                  onClick={submitTest}
                >
                  Submit Test
                </button>

                :

                <button
                  onClick={nextQuestion}
                >
                  Save & Next
                </button>
            }

          </div>

        </div>

        <div className="exam-right">
<div className="exam-stats">

  <div className="stat-box">
    <span>Answered</span>
    <strong>
      {
        Object.keys(answers).length
      }
    </strong>
  </div>

  <div className="stat-box">
    <span>Review</span>
    <strong>
      {
        reviewQuestions.length
      }
    </strong>
  </div>

  <div className="stat-box">
    <span>Total</span>
    <strong>
      {questions.length}
    </strong>
  </div>

</div>
          <h3>
            Questions
          </h3>

          <div className="question-palette">

            {questions.map(
              (q, index) => (

                <button
                  key={index}
                  onClick={() =>
                    setCurrentQuestion(index)
                  }
                  className={
                    currentQuestion === index
                      ? "current-question"
                      : reviewQuestions.includes(
                        index
                      )
                        ? "review-question"
                        : answers[index] !== undefined
                          ? "answered-question"
                          : ""
                  }
                >
                  {index + 1}
                </button>

              )
            )}

          </div>

        </div>

      </div>

    </div>

  );

}

export default MockExam;