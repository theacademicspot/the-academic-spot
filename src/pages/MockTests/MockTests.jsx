import "./MockTests.css";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
function MockTests() {

  const navigate = useNavigate();
const [searchParams] = useSearchParams();

const subject = searchParams.get("subject");
const standard = searchParams.get("standard");
const chapter = searchParams.get("chapter");
 const mockTests = [
  {
    id: 1,
    title: "Physics - Thermodynamics",
    subject: "Physics",
    standard: "12",
    chapter: "Thermodynamics",
    questions: 20,
    duration: 180
  },
  {
    id: 2,
    title: "Chemistry - Thermodynamics",
    subject: "Chemistry",
    standard: "11",
    chapter: "Thermodynamics",
    questions: 20,
    duration: 180
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
  navigate(
    `/mock-exam/${test.id}?subject=${test.subject}&standard=${test.standard}&chapter=${test.chapter}`
  )
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