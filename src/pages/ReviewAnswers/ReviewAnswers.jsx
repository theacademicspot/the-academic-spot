import "./ReviewAnswers.css";

function ReviewAnswers() {

  const result = JSON.parse(
    localStorage.getItem("mockResult")
  );

  if (!result) {
    return (
      <div className="review-page">
        <h1>No Result Found</h1>
      </div>
    );
  }

  const questions =
    result.questions || [];

  const studentAnswers =
    result.studentAnswers || {};

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
              ["A", "B", "C", "D"].indexOf(
                q.correct_answer
              );

            const options = [
              q.option_a,
              q.option_b,
              q.option_c,
              q.option_d
            ];

            return (

              <div
                key={q.id}
                className="review-card"
              >

                <h3>
                  Q{index + 1}. {q.question}
                </h3>

                <p>
                  <strong>
                    Your Answer :
                  </strong>{" "}
                  {
                    studentAnswer !== undefined
                      ? options[
                          studentAnswer
                        ]
                      : "Not Attempted"
                  }
                </p>

                <p>
                  <strong>
                    Correct Answer :
                  </strong>{" "}
                  {
                    options[
                      correctAnswer
                    ]
                  }
                </p>

                <p>
                  <strong>
                    Status :
                  </strong>{" "}
                  {
                    studentAnswer ===
                    correctAnswer
                      ? "✅ Correct"
                      : "❌ Wrong"
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