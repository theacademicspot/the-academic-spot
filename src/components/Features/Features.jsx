import "./Features.css";
import {
  FaClipboardCheck,
  FaBook,
  FaBullseye,
  FaUserTie,
  FaChartLine
} from "react-icons/fa";

const features = [
  {
    icon: <FaClipboardCheck />,
    title: "MOCK TESTS",
    desc: "MHT CET Full Length Mock Tests with real exam interface & analysis."
  },
  {
    icon: <FaBook />,
    title: "DAILY DPP",
    desc: "Daily Practice Papers topic-wise to boost concepts."
  },
  {
    icon: <FaBullseye />,
    title: "COLLEGE PREDICTOR",
    desc: "Predict college using percentile and previous year data."
  },
  {
    icon: <FaUserTie />,
    title: "COUNSELLING",
    desc: "Expert CAP round admission guidance."
  },
  {
    icon: <FaChartLine />,
    title: "PERFORMANCE",
    desc: "Rank, percentile and detailed performance insights."
  }
];

function Features() {
  return (
    <section className="features">

      <h2>WHAT WE OFFER</h2>

      <div className="features-grid">

        {features.map((item,index)=>(

          <div className="feature-card" key={index}>

            <div className="feature-icon">
              {item.icon}
            </div>

            <h3>{item.title}</h3>
            <p>{item.desc}</p>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Features;