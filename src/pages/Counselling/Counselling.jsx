import "./Counselling.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import sumit from "../../assets/images/sumit.png";
import { useState } from "react";
import axios from "axios";

function Counselling() {
    const [name, setName] = useState("");
const [mobile, setMobile] = useState("");
const [percentile, setPercentile] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    await axios.post(
      `${import.meta.env.VITE_API_URL}/counselling`,
      {
        name,
        mobile,
        percentile,
      }
    );

    const message = `
🎓 New Counselling Lead

👤 Name: ${name}
📱 Mobile: ${mobile}
📊 Percentile: ${percentile}
    `;

    window.open(
      `https://wa.me/919167265085?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    alert("Lead Saved Successfully!");

    setName("");
    setMobile("");
    setPercentile("");

  } catch (error) {

    console.log(error);
    alert("Error Saving Lead");

  }
};
  return (
    <>
      <Navbar />

      <div className="counselling">

        {/* HERO SECTION */}

        <section className="counselling-hero">

          <h1>
            Get The Best Engineering College
            Based On Your MHT CET Percentile
          </h1>

          <p>
            Personalized college selection,
            CAP round guidance, branch selection
            and spot round support for MHT CET aspirants.
          </p>

          <button>
            Book Free 1:1 Counselling
          </button>

        </section>

        {/* SERVICES */}

        <section className="services">

          <h2>Our Services</h2>

          <div className="services-grid">

            <div className="service-card">
              <h3>🎯 College Selection</h3>
              <p>
                Find the best engineering college
                according to your percentile.
              </p>
            </div>

            <div className="service-card">
              <h3>📚 Branch Selection</h3>
              <p>
                Choose the right branch
                for your future goals.
              </p>
            </div>

            <div className="service-card">
              <h3>🏛 CAP Round Guidance</h3>
              <p>
                Complete support throughout
                CAP counselling rounds.
              </p>
            </div>

            <div className="service-card">
              <h3>🚀 Spot Round Support</h3>
              <p>
                Maximize your admission chances
                during spot rounds.
              </p>
            </div>

          </div>

        </section>

        {/* ROADMAP */}

        <section className="timeline">

          <h2>CAP Round Roadmap</h2>

          <div className="timeline-box">
            <div>1. Registration</div>
            <div>2. Verification</div>
            <div>3. CAP Round 1</div>
            <div>4. CAP Round 2</div>
            <div>5. CAP Round 3</div>
            <div>6. Spot Round</div>
          </div>

        </section>

        {/* WHY US */}

        <section className="why-us">

          <h2>Why Choose The Academic Spot?</h2>

          <div className="why-grid">

            <div className="why-card">
              <h3>🎯 MHT CET Focused</h3>
              <p>
                Dedicated platform specially
                for MHT CET aspirants.
              </p>
            </div>

            <div className="why-card">
              <h3>🏛 College Selection</h3>
              <p>
                Get the best colleges according
                to your percentile.
              </p>
            </div>

            <div className="why-card">
              <h3>📚 Branch Guidance</h3>
              <p>
                Choose the right branch
                based on career goals.
              </p>
            </div>

            <div className="why-card">
              <h3>📱 WhatsApp Support</h3>
              <p>
                Direct support and quick
                guidance through WhatsApp.
              </p>
            </div>

          </div>

        </section>

        {/* COUNSELLOR + FORM */}

        <section className="counsellor-booking">

          <div className="mentor-section">

            <div className="mentor-image">

              <img
                src={sumit}
                alt="Sumit Jha"
              />

            </div>

            <div className="mentor-content">

              <h2>Meet Your Counsellor</h2>

              <h3>Sumit Jha</h3>

              <p className="mentor-role">
                Engineering Student & MHT CET Mentor
              </p>

              <div className="mentor-points">

                <p>✓ College Selection Guidance</p>
                <p>✓ CAP Round Strategy</p>
                <p>✓ Branch Selection Support</p>
                <p>✓ Spot Round Guidance</p>
                <p>✓ WhatsApp Support</p>

              </div>

            </div>

          </div>

          <div className="booking-right">

            <h2>Book Free Counselling</h2>

            <form onSubmit={handleSubmit}>

              <input
  type="text"
  placeholder="Full Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

              <input
  type="text"
  placeholder="Mobile Number"
  value={mobile}
  onChange={(e) => setMobile(e.target.value)}
/>

             <input
  type="text"
  placeholder="MHT CET Percentile"
  value={percentile}
  onChange={(e) => setPercentile(e.target.value)}
/>              

              <button type="submit">
  Submit
</button>

            </form>

            <div className="whatsapp-cta">

              <h3>Need Instant Guidance?</h3>

              <a
                href="https://wa.me/919167265085"
                target="_blank"
                rel="noreferrer"
              >
                Chat On WhatsApp
              </a>

            </div>

          </div>

        </section>

      </div>

      <Footer />
    </>
  );
}

export default Counselling;