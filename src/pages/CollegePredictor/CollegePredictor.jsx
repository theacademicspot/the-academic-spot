import "./CollegePredictor.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function CollegePredictor() {

  const [percentile, setPercentile] = useState("");
  const [category, setCategory] = useState("OPEN");
  const [results, setResults] = useState([]);

  const getCutoff = (college) => {

    if (category === "TFWS") {
      return college.tfws_percentile;
    }

    if (category === "EWS") {
      return college.ews_percentile;
    }

    return college.gopeno_percentile;
  };

  const getRank = (college) => {

    if (category === "TFWS") {
      return college.tfws_rank;
    }

    if (category === "EWS") {
      return college.ews_rank;
    }

    return college.gopeno_rank;
  };

  const predictCollege = async () => {

    if (!percentile) {
      alert("Please Enter Percentile");
      return;
    }

    try {

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/predict/${percentile}/${category}`
      );

      setResults(res.data);

    } catch (err) {

      console.log(err);
      alert("Error Fetching Colleges");

    }
  };

  const downloadPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(
      "The Academic Spot - College Prediction Report",
      14,
      15
    );

    doc.setFontSize(12);

    doc.text(
      `Percentile: ${percentile}`,
      14,
      25
    );

    doc.text(
      `Category: ${category}`,
      14,
      32
    );

    autoTable(doc, {
      startY: 40,

      head: [[
        "College",
        "Branch",
        "Rank",
        "Percentile",
        "Prediction"
      ]],

      body: results.map((college) => {

        const cutoff =
          parseFloat(getCutoff(college));

        const buffer =
          parseFloat(percentile) - cutoff;

        let prediction = "Very Dream";

        if (buffer >= 2) {
          prediction = "Safe";
        }
        else if (buffer >= 0) {
          prediction = "Moderate";
        }
        else if (buffer >= -1.5) {
          prediction = "Dream";
        }

        return [
          college.college_name,
          college.branch,
          getRank(college),
          getCutoff(college),
          prediction
        ];

      })
    });

    doc.save("College-Prediction-Report.pdf");
  };

  return (
    <>
      <Navbar />

      <div className="predictor">

        <div className="predictor-card">

          <h1>College Predictor</h1>

          <p>
            Enter your MHT CET percentile and
            get college recommendations.
          </p>

          <input
            type="number"
            placeholder="Enter Percentile"
            value={percentile}
            onChange={(e) =>
              setPercentile(e.target.value)
            }
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            <option value="OPEN">OPEN</option>
            <option value="EWS">EWS</option>
            <option value="TFWS">TFWS</option>
          </select>

          <button
            onClick={predictCollege}
            className="predict-btn"
          >
            Predict Colleges
          </button>

          {results.length > 0 && (

            <>
              <button
                onClick={downloadPDF}
                className="pdf-btn"
              >
                Download PDF Report
              </button>

              <div className="results">

                <h2>Predicted Colleges</h2>

                {results.map((college, index) => {

                  const cutoff =
                    parseFloat(getCutoff(college));

                  const buffer =
                    parseFloat(percentile) - cutoff;

                  let prediction = "Very Dream";

                  if (buffer >= 2) {
                    prediction = "Safe";
                  }
                  else if (buffer >= 0) {
                    prediction = "Moderate";
                  }
                  else if (buffer >= -1.5) {
                    prediction = "Dream";
                  }

                  return (

                    <div
                      key={index}
                      className="college-card"
                    >

                      <h3>
                        {college.college_name}
                      </h3>

                      <p>
                        <strong>Branch:</strong>{" "}
                        {college.branch}
                      </p>

                      <p>
                        <strong>Rank:</strong>{" "}
                        {getRank(college)}
                      </p>

                      <p>
                        <strong>Cutoff:</strong>{" "}
                        {getCutoff(college)}
                      </p>

                      <p>
                        <strong>Buffer:</strong>{" "}
                        {buffer.toFixed(2)}
                      </p>

                      <p>
                        <strong>Prediction:</strong>{" "}
                        {prediction}
                      </p>

                    </div>

                  );

                })}

              </div>
            </>

          )}

        </div>

      </div>

      <Footer />
    </>
  );
}

export default CollegePredictor;