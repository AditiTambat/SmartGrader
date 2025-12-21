import React, { useState } from "react";
import Navbar from "./Navbar"; 

function AdminWithFetch() {
  // login states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // student data + error
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  // Loading state for fetch
  const [loading, setLoading] = useState(false);

  // Login form submit
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }
    setCurrentUserEmail(email);
    setIsLoggedIn(true);
    setError(null);
  };

  // Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUserEmail(null);
    setPassword("");
    setEmail("");
    setStudents([]);
    setError(null);
  };

  // Fetch master data button handler
  const fetchMasterData = () => {
    if (!currentUserEmail || !password) {
      setError("Missing credentials to fetch data");
      return;
    }
    setLoading(true);
    setError(null);

    const url = "http://localhost:8080/admin/get-all-students";
    const basicAuth = "Basic " + btoa(currentUserEmail + ":" + password);

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: basicAuth,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setStudents(data);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError("Failed to fetch student data. Check credentials.");
        setStudents([]);
        setLoading(false);
        console.error(err);
      });
  };

  return (
    <>
      <Navbar currentUserEmail={currentUserEmail} onLogout={handleLogout} />

      <main
        style={{
          marginLeft: "260px",
          padding: "20px",
          fontFamily: "Arial, sans-serif",
          marginTop: "60px",
        }}
      >
        {!isLoggedIn ? (
          <form
            onSubmit={handleLogin}
            style={{
              maxWidth: 400,
              background: "#f4f4f4",
              padding: 20,
              borderRadius: 8,
            }}
          >
            <h2>Login</h2>

            <div style={{ marginBottom: 10 }}>
              <label>
                Email:
                <br />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
                />
              </label>
            </div>

            <div style={{ marginBottom: 10 }}>
              <label>
                Password:
                <br />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
                />
              </label>
            </div>

            <button
              type="submit"
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              Login
            </button>

            {error && (
              <p style={{ color: "red", marginTop: 10 }}>{error}</p>
            )}
          </form>
        ) : (
          <>
            <div
              style={{
                marginBottom: 20,
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <button
                onClick={fetchMasterData}
                disabled={loading}
                style={{
                  padding: "10px 16px",
                  backgroundColor: loading ? "#999" : "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: 4,
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Loading..." : "Fetch Master Data"}
              </button>
            </div>

            {error && (
              <p style={{ color: "red", marginBottom: 10 }}>{error}</p>
            )}

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#007bff", color: "white" }}>
                  <th style={{ padding: 12, textAlign: "left" }}>Name</th>
                  <th style={{ padding: 12, textAlign: "left" }}>Email</th>
                  <th style={{ padding: 12, textAlign: "left" }}>Final Score</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center", padding: 20 }}>
                      No data loaded yet. Click "Fetch Master Data".
                    </td>
                  </tr>
                ) : (
                  students.map((student) => (
                    <tr
                      key={student.id}
                      style={{
                        borderBottom: "1px solid #ddd",
                        backgroundColor: "#f9f9f9",
                      }}
                    >
                      <td style={{ padding: 12 }}>{student.name}</td>
                      <td style={{ padding: 12 }}>{student.email}</td>
                      <td style={{ padding: 12 }}>{student.finalScore}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </>
        )}
      </main>
    </>
  );
}

export default AdminWithFetch;
