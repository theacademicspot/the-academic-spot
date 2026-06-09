import "./Signup.css";
import Navbar from "../../components/Navbar/Navbar";
import { useState } from "react";
import axios from "axios";

function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await axios.post(
        `${import.meta.env.VITE_API_URL}/signup`,
        {
          name,
          email,
          mobile,
          password,
        }
      );

      alert("Account Created Successfully");

      setName("");
      setEmail("");
      setMobile("");
      setPassword("");

    } catch (err) {

      console.log(err);
      alert("Signup Failed");

    }
  };

  return (
    <>
      <Navbar />

      <div className="signup-page">

        <div className="signup-card">

          <h1>Create Account</h1>

          <p>
            Join The Academic Spot and start your
            MHT CET preparation journey.
          </p>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="text"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">
              Create Account
            </button>

          </form>

        </div>

      </div>
    </>
  );
}

export default Signup;