import "./Hero.css";
import heroCollege from "../../assets/images/hero-college.jpg";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-left">

        <span className="badge">
          MADE FOR MHT CET ENGINEERING STUDENTS
        </span>

        <h1>
          YOUR JOURNEY TO A
          <span> TOP ENGINEERING COLLEGE </span>
          STARTS HERE!
        </h1>

        <p>
          All-in-one platform for MHT CET preparation,
          mock tests, DPPs, performance analysis &
          admission guidance.
        </p>

        <div className="hero-buttons">

          <button className="primary-btn">
            Start Free Mock Test
          </button>

          <button className="secondary-btn">
            Book Counselling
          </button>

        </div>

      </div>

      <div className="hero-right">

        <img
          src={heroCollege}
          alt="College"
          className="hero-image"
        />

        <div className="hero-card">

          <h2>
            MHT CET <span>2027</span>
          </h2>

          <ul>
            <li>✓ Full Length Mock Tests</li>
            <li>✓ Subject Wise Tests</li>
            <li>✓ Daily Practice Papers</li>
            <li>✓ Detailed Solutions</li>
            <li>✓ Rank & Percentile Analysis</li>
            <li>✓ CAP Counselling Support</li>
          </ul>

        </div>

      </div>

    </section>
  );
}

export default Hero;