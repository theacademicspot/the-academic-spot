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

               <div className="review-options">

  {options.map((option, i) => {

    let className = "review-option";

    if (i === correctAnswer) {
      className += " correct-option";
    }

    if (
      studentAnswer === i &&
      studentAnswer !== correctAnswer
    ) {
      className += " wrong-option";
    }

    return (

      <div
        key={i}
        className={className}
      >

        <strong>
          {["A","B","C","D"][i]}.
        </strong>

        {" "}

        {option}

      </div>

    );

  })}

</div>

                <p>

  <strong>
    Correct Answer :
  </strong>

  <span
    style={{
      color:"green",
      fontWeight:"bold"
    }}
  >

    {" "}
    ✅ {options[correctAnswer]}

  </span>

</p>

                
                <p>

<strong>Status :</strong>{" "}

{

studentAnswer === undefined

? "⏭️ Skipped"

: studentAnswer === correctAnswer

? "✅ Correct"

: "❌ Wrong"

}

</p>
<p>

<b>Subject :</b> {q.subject}

</p>

<p>

<b>Chapter :</b> {q.chapter}

</p>

<p>

<b>Difficulty :</b> {q.difficulty}

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