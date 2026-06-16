import "./MockExam.css";
import { useParams } from "react-router-dom";

function MockExam() {

  const { id } = useParams();

  return (

    <div>

      <h1>
        Mock Test {id}
      </h1>

    </div>

  );

}

export default MockExam;