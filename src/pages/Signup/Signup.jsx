import "./Signup.css";
import Navbar from "../../components/Navbar/Navbar";
import { useState } from "react";
import axios from "axios";

function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] =
    useState(false);

  const sendOtp = async () => {

    try {

      if (!email) {
        alert("Enter Email First");
        return;
      }

      await axios.post(
        `${import.meta.env.VITE_API_URL}/send-otp`,
        { email }
      );

      alert("OTP Sent Successfully");

    } catch (err) {

      console.log(err);

      alert("Failed To Send OTP");

    }

  };

  const verifyOtp = async () => {

    try {

      await axios.post(
        `${import.meta.env.VITE_API_URL}/verify-otp`,
        {
          email,
          otp
        }
      );

      setOtpVerified(true);

      alert("OTP Verified Successfully");

    } catch (err) {

      console.log(err);

      alert("Invalid OTP");

    }

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!otpVerified) {
      alert("Verify OTP First");
      return;
    }

    // Name Validation

    if (name.trim().length < 3) {
      alert(
        "Name must be at least 3 characters"
      );
      return;
    }

    // Email Validation

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Enter Valid Email Address");
      return;
    }

    // Mobile Validation

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      alert("Enter Valid Mobile Number");
      return;
    }

    // Password Validation

    if (password.length < 8) {
      alert(
        "Password must be at least 8 characters"
      );
      return;
    }

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

      alert(
        "Account Created Successfully"
      );

      setName("");
      setEmail("");
      setMobile("");
      setPassword("");
      setOtp("");
      setOtpVerified(false);

      window.location.href = "/login";

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Signup Failed"
      );

    }

  };

  return (
    <>
      <Navbar />

      <div className="signup-page">

        <div className="signup-card">

          <h1>Create Account</h1>

          <p>
            Join The Academic Spot and start
            your MHT CET preparation journey.
          </p>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

            <button
              type="button"
              onClick={sendOtp}
            >
              Send OTP
            </button>

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value)
              }
            />

            <button
              type="button"
              onClick={verifyOtp}
            >
              Verify OTP
            </button>

            {otpVerified && (
              <p
                style={{
                  color: "green",
                  marginTop: "10px"
                }}
              >
                OTP Verified ✓
              </p>
            )}

            <input
              type="text"
              placeholder="Mobile Number"
              value={mobile}
              maxLength="10"
              onChange={(e) =>
                setMobile(e.target.value)
              }
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
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