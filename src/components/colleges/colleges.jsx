import "./colleges.css";

import coep from "../../assets/images/coep.jpg";
import pict from "../../assets/images/pict.jpg";
import vit from "../../assets/images/vit.jpg";
import pccoe from "../../assets/images/pccoe.jpg";
import dypatil from "../../assets/images/dypatil.jpg";

const colleges = [
  {
    name: "COEP TECH",
    city: "Pune",
    cutoff: "99+ %ile",
    fees: "₹95K / Year",
    placement: "18 LPA",
    img: coep,
  },
  {
    name: "PICT",
    city: "Pune",
    cutoff: "98+ %ile",
    fees: "₹1.1L / Year",
    placement: "12 LPA",
    img: pict,
  },
  {
    name: "VIT PUNE",
    city: "Pune",
    cutoff: "97+ %ile",
    fees: "₹1.8L / Year",
    placement: "8 LPA",
    img: vit,
  },
  {
    name: "PCCOE",
    city: "Pune",
    cutoff: "95+ %ile",
    fees: "₹1.5L / Year",
    placement: "7 LPA",
    img: pccoe,
  },
  {
    name: "DY PATIL",
    city: "Pune",
    cutoff: "90+ %ile",
    fees: "₹1.7L / Year",
    placement: "6 LPA",
    img: dypatil,
  },
];

function Colleges() {
  return (
    <section className="colleges">
      <h2>TOP ENGINEERING COLLEGES</h2>

      <div className="college-grid">
        {colleges.map((college, index) => (
          <div className="college-card" key={index}>
            <img src={college.img} alt={college.name} />

            <div className="college-content">
              <h3>{college.name}</h3>

              <p className="city">{college.city}</p>

              <div className="college-info">
                <span>🎯 {college.cutoff}</span>
                <span>💰 {college.fees}</span>
                <span>📈 {college.placement}</span>
              </div>

              <button className="college-btn">
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Colleges;