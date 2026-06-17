import "./MockExam.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import questions from "./data/questions";

function MockExam() {

  const { id } = useParams();

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const question =
    questions[currentQuestion];

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

          <p>
            {question.question}
          </p>

          <div className="options">

            {question.options.map(
              (option, index) => (

                <button
                  key={index}
                >
                  {option}
                </button>

              )
            )}

          </div>

        </div>

        <div className="exam-right">

          <h3>
            Questions
          </h3>

          {
            questions.map(
              (q, index) => (

                <button
                  key={index}
                >
                  {index + 1}
                </button>

              )
            )
          }

        </div>

      </div>

    </div>

  );

}

export default MockExam;