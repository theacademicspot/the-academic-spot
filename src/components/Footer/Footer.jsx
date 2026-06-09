import "./Footer.css";
import logo from "../../assets/images/logo.png";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-col">

        <img
          src={logo}
          alt="The Academic Spot"
          className="footer-logo"
        />

        <p>
          All-in-one platform for MHT CET aspirants
          to prepare, practice and succeed.
        </p>

      </div>

      <div className="footer-col">

        <h3>Quick Links</h3>

        <p>Home</p>
        <p>Mock Tests</p>
        <p>DPP</p>
        <p>College Predictor</p>
        <p>Counselling</p>

      </div>

      <div className="footer-col">

        <h3>Useful Links</h3>

        <p>MHT CET Info</p>
        <p>Exam Pattern</p>
        <p>Syllabus</p>
        <p>Previous Year Papers</p>

      </div>

      <div className="footer-col">

        <h3>Contact Us</h3>

        <p>9167265085</p>
        <p>theacademicspot@gmail.com</p>

        <p>
          G.H Raisoni College Of Engineering
          Pune
        </p>

      </div>

    </footer>
  );
}

export default Footer;