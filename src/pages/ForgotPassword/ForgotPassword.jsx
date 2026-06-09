import "./ForgotPassword.css";
import Navbar from "../../components/Navbar/Navbar";
import { useState } from "react";
import axios from "axios";

function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        `${import.meta.env.VITE_API_URL}/forgot-password`,
        {
          email,
          password,
        }
      );

      alert("Password Updated");

      window.location.href = "/login";

    } catch (err) {

      console.log(err);
      alert("Error");

    }

  };

  return (
    <>
      <Navbar />

      <div className="forgot-page">

        <div className="forgot-card">

          <h1>Reset Password</h1>

          <form onSubmit={handleSubmit}>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
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