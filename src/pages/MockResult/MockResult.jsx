import "./MockResult.css";
import { useNavigate } from "react-router-dom";

function MockResult() {

  const navigate = useNavigate();

  const result = JSON.parse(
    localStorage.getItem("mockResult")
  );

  if (!result) {

    return (
      <div className="result-page">
        <h2>No Result Found</h2>
      </div>
    );

  }

  const percentage =
    (
      (result.correct /
        result.total) *
      100
    ).toFixed(2);

  return (

    <div className="result-page">

      <div className="result-card">

        <h1>
          🎉 Mock Test Result
        </h1>

        <h2 className="score-text">
          Score :
          {result.correct}
          /
          {result.total}
        </h2>

        <div className="percentage-box">
          {percentage}%
        </div>

        <div className="result-grid">

          <div className="result-item">
            <h3>✅ Correct</h3>
            <p>{result.correct}</p>
          </div>

          <div className="result-item">
            <h3>❌ Wrong</h3>
            <p>{result.wrong}</p>
          </div>

          <div className="result-item">
            <h3>⏭️ Skipped</h3>
            <p>{result.skipped}</p>
          </div>

          <div className="result-item">
            <h3>🎯 Accuracy</h3>
            <p>{result.accuracy}%</p>
          </div>

        </div>

        <div className="result-buttons">

          <button
            onClick={() =>
              navigate("/mock-tests")
            }
          >
            Back To Tests
          </button>

          <button
  onClick={() =>
    navigate("/")
  }
>
  Home
</button>

        </div>

      </div>

    </div>

  );

}

export default MockResult;