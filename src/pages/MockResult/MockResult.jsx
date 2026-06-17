import "./MockResult.css";

function MockResult() {

  const result = JSON.parse(
    localStorage.getItem("mockResult")
  );

  if (!result) {
    return <h2>No Result Found</h2>;
  }

  return (

    <div className="result-page">

      <div className="result-card">

        <h1>
          Mock Test Result
        </h1>

        <h2>
          Score :
          {result.correct}
          /
          {result.total}
        </h2>

        <div className="result-grid">

          <div>
            Correct:
            {result.correct}
          </div>

          <div>
            Wrong:
            {result.wrong}
          </div>

          <div>
            Skipped:
            {result.skipped}
          </div>

          <div>
            Accuracy:
            {result.accuracy}%
          </div>

        </div>

      </div>

    </div>

  );

}

export default MockResult;