import "./ReviewAnswers.css";
import questions from "../MockExam/data/questions";

function ReviewAnswers() {

  const result = JSON.parse(
    localStorage.getItem("mockResult")
  );

  const studentAnswers =
    result?.studentAnswers || {};

  return (

    <div className="review-page">

      <h1>
        Review Solutions
      </h1>

      {
        questions.map(
          (q, index) => {

            const studentAnswer =
              studentAnswers[index];

            const correctAnswer =
              q.answer;

            return (

              <div
                key={q.id}
                className="review-card"
              >

                <h3>
                  Q{index + 1}.
                  {" "}
                  {q.question}
                </h3>

                <p>

                  Your Answer :

                  {" "}

                  {
                    studentAnswer !==
                    undefined

                      ?

                      q.options[
                        studentAnswer
                      ]

                      :

                      "Not Attempted"
                  }

                </p>

                <p>

                  Correct Answer :

                  {" "}

                  {
                    q.options[
                      correctAnswer
                    ]
                  }

                </p>

                <p>

                  Status :

                  {

                    studentAnswer ===
                    correctAnswer

                      ?

                      "✅ Correct"

                      :

                      "❌ Wrong"

                  }

                </p>

              </div>

            );

          }
        )
      }

    </div>

  );

}

export default ReviewAnswers;