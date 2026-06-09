import "./Profile.css";
import Navbar from "../../components/Navbar/Navbar";

function Profile() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <>
      <Navbar />

      <div className="profile-page">

        <div className="profile-card">

          <h1>My Profile</h1>

          <p>
            <strong>Name:</strong>
            {" "}
            {user?.name}
          </p>

          <p>
            <strong>Email:</strong>
            {" "}
            {user?.email}
          </p>

          <p>
            <strong>Mobile:</strong>
            {" "}
            {user?.mobile}
          </p>

        </div>

      </div>
    </>
  );
}

export default Profile;