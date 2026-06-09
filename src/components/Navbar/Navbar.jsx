import "./Navbar.css";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

function Navbar() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <nav className="navbar">

      <div className="logo-section">

        <img
          src={logo}
          alt="The Academic Spot"
          className="nav-logo"
        />

        <div className="logo-text">
          <h2>THE ACADEMIC SPOT</h2>
          <p>PREPARE • PRACTICE • SUCCEED</p>
        </div>

      </div>

      <ul className="nav-links">

        <li>
          <Link to="/">
            Home
          </Link>
        </li>

        <li>
          Mock Tests
        </li>

        <li>
          DPP
        </li>

        <li>
          <Link to="/college-predictor">
            College Predictor
          </Link>
        </li>

        <li>
          <Link to="/counselling">
            Counselling
          </Link>
        </li>
      {user?.role === "admin" && (
  <li>
    <Link to="/admin">
      Admin
    </Link>
  </li>
)}

      </ul>

      <div className="auth-buttons">

        {user ? (

          <div className="user-section">

            <span>
              👤 <a href="/profile">
  {user.name}
</a>
            </span>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        ) : (

          <>

            <Link to="/login">
              <button className="login-btn">
                Login
              </button>
            </Link>

            <Link to="/signup">
              <button className="signup-btn">
                Sign Up
              </button>
            </Link>

          </>

        )}

      </div>

    </nav>
  );
}

export default Navbar;