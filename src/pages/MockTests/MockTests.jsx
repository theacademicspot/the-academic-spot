import "./MockTests.css";
import { useNavigate } from "react-router-dom";

function MockTests() {

  const navigate = useNavigate();

  const mockTests = [
    {
      id: 1,
      title: "MHT CET Full Mock Test 1",
      questions: 200,
      duration: 180,
      difficulty: "Easy"
    },
    {
      id: 2,
      title: "MHT CET Full Mock Test 2",
      questions: 200,
      duration: 180,
      difficulty: "Medium"
    },
    {
      id: 3,
      title: "Physics Mock Test",
      questions: 50,
      duration: 45,
      difficulty: "Hard"
    }
  ];

  return (
    <div className="mock-page">

      <h1>Mock Test Series</h1>

      <div className="mock-grid">

        {mockTests.map((test) => (

          <div
            key={test.id}
            className="mock-card"
          >

            <h2>{test.title}</h2>

            <p>
              Questions:
              <span> {test.questions}</span>
            </p>

            <p>
              Duration:
              <span> {test.duration} Minutes</span>
            </p>

            <p>
              Difficulty:
              <span> {test.difficulty}</span>
            </p>

            <button
              onClick={() =>
                navigate(`/mock-exam/${test.id}`)
              }
            >
              Start Test
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default MockTests;