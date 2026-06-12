import "./Login.css";
import Navbar from "../../components/Navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Email Validation

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    alert("Enter Valid Email Address");
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

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/login`,
      {
        email,
        password,
      }
    );

    localStorage.setItem(
      "user",
      JSON.stringify(res.data)
    );

    alert("Login Successful");

    window.location.href = "/";

  } catch (err) {

    console.log(err);

    alert(
      err.response?.data?.message ||
      "Login Failed"
    );

  }
};

  return (
    <>
      <Navbar />

      <div className="login-page">

        <div className="login-card">

          <h1>Welcome Back</h1>

          <p>
            Login to access Mock Tests, DPPs,
            College Predictor and Counselling.
          </p>

          <form onSubmit={handleSubmit}>

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <button type="submit">
              Login
            </button>
            <p
  style={{
    marginTop:"15px",
    cursor:"pointer",
    color:"blue"
  }}
  onClick={() =>
    window.location.href="/forgot-password"
  }
>
  Forgot Password?
</p>

          
          </form>

<div style={{ marginTop: "20px" }}>
 <GoogleLogin
  onSuccess={async (
    credentialResponse
  ) => {

    try {

      const res =
        await axios.post(
          `${import.meta.env.VITE_API_URL}/google-login`,
          {
            credential:
              credentialResponse.credential
          }
        );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data)
      );

      alert(
        "Google Login Successful"
      );

      window.location.href = "/";

    } catch (err) {

      alert(
        "Google Login Failed"
      );

    }

  }}
  onError={() => {
    alert(
      "Google Login Failed"
    );
  }}
/>
        </div>
</div>
      </div>
    </>
  );
}

export default Login;