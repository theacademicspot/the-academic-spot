import "./ForgotPassword.css";
import Navbar from "../../components/Navbar/Navbar";
import { useState } from "react";
import axios from "axios";

function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const sendOtp = async () => {

    try {

      await axios.post(
        `${import.meta.env.VITE_API_URL}/send-otp`,
        { email }
      );

      alert("OTP Sent");

    } catch (err) {

      alert("Failed To Send OTP");

    }

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (password !== confirmPassword) {

      alert(
        "Passwords Do Not Match"
      );

      return;

    }

    try {

      await axios.post(
        `${import.meta.env.VITE_API_URL}/reset-password`,
        {
          email,
          otp,
          password
        }
      );

      alert(
        "Password Updated Successfully"
      );

      window.location.href =
        "/login";

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Error"
      );

    }

  };

  return (
    <>
      <Navbar />

      <div className="forgot-page">

        <div className="forgot-card">

          <h1>
            Reset Password
          </h1>

          <form onSubmit={handleSubmit}>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
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
                setOtp(
                  e.target.value
                )
              }
            />

            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
            />

            <button type="submit">
              Update Password
            </button>

          </form>

        </div>

      </div>

    </>
  );
}

export default ForgotPassword;