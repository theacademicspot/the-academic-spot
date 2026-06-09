import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
const user = JSON.parse(
  localStorage.getItem("user")
);

if (user?.role !== "admin") {
  return <h1>Access Denied</h1>;
}

function Admin() {

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLeads: 0,
  });

  const [leads, setLeads] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {

    fetchStats();
    fetchLeads();
    fetchUsers();

  }, []);

  const fetchStats = async () => {

    try {

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/stats`
      );

      setStats(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const fetchLeads = async () => {

    try {

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/leads`
      );

      setLeads(res.data);

    } catch (err) {

      console.log(err);

    }

  };
  const deleteLead = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure?"
  );

  if (!confirmDelete) return;

  try {

    await axios.delete(
      `${import.meta.env.VITE_API_URL}/admin/leads/${id}`
    );

    fetchLeads();

  } catch (err) {

    console.log(err);

    alert("Error deleting lead");

  }

};

  const fetchUsers = async () => {

    try {

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/users`
      );

      setUsers(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  return (
    <>
      <Navbar />

      <div style={{ padding: "40px" }}>

        <h1>Admin Dashboard</h1>

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "20px",
            marginBottom: "30px",
          }}
        >

          <div
            style={{
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              minWidth: "220px",
            }}
          >
            <h2>Total Users</h2>
            <h1>{stats.totalUsers}</h1>
          </div>

          <div
            style={{
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              minWidth: "220px",
            }}
          >
            <h2>Total Leads</h2>
            <h1>{stats.totalLeads}</h1>
          </div>

        </div>

        <h2>Recent Counselling Leads</h2>

        <table
          border="1"
          cellPadding="10"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
            marginBottom: "40px",
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Percentile</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {leads.map((lead) => (

              <tr key={lead.id}>
                <td>{lead.id}</td>
                <td>{lead.name}</td>
                <td>{lead.mobile}</td>
                <td>{lead.percentile}</td>
                <td>
                  {new Date(
                    lead.created_at
                  ).toLocaleString()}
                </td>
                <td>
  <button
    onClick={() => deleteLead(lead.id)}
  >
    Delete
  </button>
</td>
              </tr>

            ))}

          </tbody>
        </table>

        <h2>Registered Users</h2>

        <table
          border="1"
          cellPadding="10"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Role</th>
            </tr>
          </thead>

          <tbody>

            {users.map((user) => (

              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>{user.role}</td>
              </tr>

            ))}

          </tbody>
        </table>

      </div>
    </>
  );
}

export default Admin;