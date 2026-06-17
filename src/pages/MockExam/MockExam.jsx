import "./MockExam.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import questions from "./data/questions";

function MockExam() {

  const { id } = useParams();

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answers, setAnswers] =
    useState({});

  const question =
    questions[currentQuestion];

  const selectOption = (optionIndex) => {

    setAnswers({
      ...answers,
      [currentQuestion]: optionIndex
    });

  };

  return (

    <div className="exam-page">

      <div className="exam-header">

        <h2>
          MHT CET Mock Test {id}
        </h2>

        <h3>
          03:00:00
        </h3>

      </div>

      <div className="exam-body">

        <div className="exam-left">

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

          <div className="exam-actions">

            <button
              onClick={() => {

                if (
                  currentQuestion > 0
                ) {

                  setCurrentQuestion(
                    currentQuestion - 1
                  );

                }

              }}
            >
              Previous
            </button>

            <button
              onClick={() => {

                if (
                  currentQuestion <
                  questions.length - 1
                ) {

                  setCurrentQuestion(
                    currentQuestion + 1
                  );

                }

              }}
            >
              Save & Next
            </button>

          </div>

        </div>

        <div className="exam-right">

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