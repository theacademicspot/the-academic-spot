import "./MockExam.css";
import {
  useParams,
  useNavigate,
  useSearchParams
} from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";
function MockExam() {
  const [showSubmitModal, setShowSubmitModal] =
  useState(false);
  const { id } = useParams();
const [searchParams] = useSearchParams();
const subject = searchParams.get("subject");
const standard = searchParams.get("standard");
const chapter = searchParams.get("chapter");
  const navigate = useNavigate();

  const [questions, setQuestions] =
  useState([]);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answers, setAnswers] =
    useState({});

  const [reviewQuestions, setReviewQuestions] =
    useState([]);

  const [timeLeft, setTimeLeft] =
    useState(10800);

  const question =
  questions?.[currentQuestion];

 const submitTest = async () => {

    let correct = 0;

    questions.forEach((q, index) => {

      if (
  answers[index] ===
  ["A","B","C","D"].indexOf(
    q.correct_answer
  )
) {
        correct++;
      }

    });

    const wrong =
      Object.keys(answers).length -
      correct;

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
    accuracy,
    studentAnswers: answers,
    questions
  })
);
try {

  await axios.post(

    `${import.meta.env.VITE_API_URL}/mock-result`,

    {

      user_id: 1,

      subject,

      standard,

      chapter,

      total_questions: questions.length,

      correct,

      wrong,

      skipped,

      accuracy

    }

  );

}

catch(err){

  console.log(err);

}
    navigate(
      `/mock-result/${id}`
    );

  };

  useEffect(() => {

  const fetchQuestions =
    async () => {

      try {

        const res = await axios.get(
  `${import.meta.env.VITE_API_URL}/questions`,
  {
    params: {
      subject,
      standard,
      chapter
    }
  }
);
        setQuestions(
          res.data
        );

      } catch (err) {

        console.log(err);

      }

    };

  fetchQuestions();

}, []);

  useEffect(() => {

    const timer = setInterval(() => {

      setTimeLeft((prev) => {

        if (prev <= 1) {

          clearInterval(timer);

          submitTest();

          return 0;

        }

        return prev - 1;

      });

    }, 1000);

    return () =>
      clearInterval(timer);

  }, []);

  const hours =
    String(
      Math.floor(
        timeLeft / 3600
      )
    ).padStart(2, "0");

  const minutes =
    String(
      Math.floor(
        (timeLeft % 3600) / 60
      )
    ).padStart(2, "0");

  const seconds =
    String(
      timeLeft % 60
    ).padStart(2, "0");

  const selectOption = (
    optionIndex
  ) => {

    setAnswers({
      ...answers,
      [currentQuestion]:
        optionIndex
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
  if (
  questions.length === 0
) {

  return (
    <h2>
      Loading Questions...
    </h2>
  );

}

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

              {[
  question.option_a,
  question.option_b,
  question.option_c,
  question.option_d
].map(
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
              onClick={
                prevQuestion
              }
            >
              Previous
            </button>

            <button
              onClick={
                markForReview
              }
            >
              Mark Review
            </button>

            {
              currentQuestion ===
                questions.length - 1

                ?

              <button
  onClick={() =>
    setShowSubmitModal(true)
  }
>
  Submit Test
</button>

                :

                <button
                  onClick={
                    nextQuestion
                  }
                >
                  Save & Next
                </button>
            }

          </div>

        </div>

        <div className="exam-right">

          <div className="exam-stats">

            <div className="stat-box">
              <span>
                Answered
              </span>

              <strong>
                {
                  Object.keys(
                    answers
                  ).length
                }
              </strong>
            </div>

            <div className="stat-box">
              <span>
                Review
              </span>

              <strong>
                {
                  reviewQuestions.length
                }
              </strong>
            </div>

            <div className="stat-box">
              <span>
                Total
              </span>

              <strong>
                {
                  questions.length
                }
              </strong>
            </div>

          </div>

          <h3>
            Questions
          </h3>

          <div className="question-palette">

            {questions.map(
              (
                q,
                index
              ) => (

                <button
                  key={index}
                  onClick={() =>
                    setCurrentQuestion(
                      index
                    )
                  }
                  className={

                    currentQuestion ===
                      index

                      ?

                      "current-question"

                      :

                      reviewQuestions.includes(
                        index
                      )

                        ?

                        "review-question"

                        :

                        answers[
                          index
                        ] !==
                          undefined

                          ?

                          "answered-question"

                          :

                          ""

                  }
                >
                  {index + 1}
                </button>

              )
            )}

          </div>

        </div>

      </div>
      {
  showSubmitModal && (

    <div className="modal-overlay">

      <div className="submit-modal">

        <h2>
          Submit Test?
        </h2>

        <p>
          Answered :
          {
            Object.keys(answers).length
          }
        </p>

        <p>
          Skipped :
          {
            questions.length -
            Object.keys(answers).length
          }
        </p>

        <div className="modal-buttons">

          <button
            onClick={() =>
              setShowSubmitModal(false)
            }
          >
            Cancel
          </button>

          <button
            onClick={submitTest}
          >
            Final Submit
          </button>

        </div>

      </div>

    </div>

  )
}

    </div>

  );

}

export default MockExam;