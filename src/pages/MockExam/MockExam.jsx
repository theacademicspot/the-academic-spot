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

    <div className="mock-exam">

      <h1>
        Mock Test {id}
      </h1>

      <h2>
        Question {currentQuestion + 1}
      </h2>

      <p>
        {question.question}
      </p>

      <div>

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

  );

}

export default MockExam;