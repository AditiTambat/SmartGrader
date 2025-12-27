import React, { useState } from 'react';

function AdminStudentData() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = async (e) => {
    if (e) e.preventDefault();

    if (!username || !password) {
      setError('Please enter username and password');
      return;
    }

    setIsFetching(true);
    const url = 'http://localhost:8080/admin/get-all-students';
    const basicAuth = 'Basic ' + btoa(username + ':' + password);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: basicAuth,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setStudents(Array.isArray(data) ? data : []);
      setError(null);
      setIsAdmin(true); // hide login form after first successful fetch
    } catch (err) {
      setError('Failed to fetch student data. Check your credentials.');
      setStudents([]);
      setIsAdmin(false);
      console.error(err);
    } finally {
      setIsFetching(false);
    }
  };

  const handleLogout = () => {
    setStudents([]);
    setUsername('');
    setPassword('');
    setIsAdmin(false);
    setError(null);
    localStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminData');
  };

  const classify = (score) => {
    const s = Number.isFinite(score) ? score : 0;
    if (s > 40) return 'A';
    if (s >= 30 && s <= 40) return 'B';
    if (s >= 20 && s < 30) return 'C';
    return 'D';
  };

  const grouped = students.reduce((acc, st) => {
    const cat = classify(st.finalScore);
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(st);
    return acc;
  }, {});

  const orderedCats = ['A', 'B', 'C', 'D'];
  const headerBg = 'rgba(29, 203, 209, 1)';

  return (
    <div
      style={{
        padding: '30px',
        fontFamily: 'Arial, sans-serif',
        maxWidth: '900px',
        margin: '40px auto',
        backgroundColor: '#fefefe',
        boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
        borderRadius: '8px',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '25px',
        }}
      >
        <h2 style={{ color: '#397486ff', fontWeight: 'bold' }}>
          Admin - Fetch Students Data
        </h2>

        {isAdmin && (
          <div style={{ display: 'flex', gap: '10px' }}>
            {/* Fetch button -> only show when no students yet */}
            {students.length === 0 && (
              <button
                onClick={fetchData}
                disabled={isFetching}
                style={{
                  padding: '8px 18px',
                  backgroundColor: 'rgba(56, 238, 111, 0.57)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.95em',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = 'rgba(65, 162, 106, 0.77)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = 'rgba(54, 220, 104, 0.53)')
                }
              >
                {isFetching ? 'Fetching…' : 'Fetch Students Data'}
              </button>
            )}

            {/* Logout button */}
            <button
              onClick={handleLogout}
              style={{
                padding: '8px 18px',
                backgroundColor: 'rgba(231, 76, 60, 1)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.95em',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = 'rgba(192, 57, 43, 1)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = 'rgba(231, 76, 60, 1)')
              }
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Login Form */}
      {!isAdmin && (
        <form onSubmit={fetchData} style={{ marginBottom: '30px' }}>
          {/* Username */}
          <div style={{ marginBottom: '15px' }}>
            <label
              style={{ display: 'block', fontWeight: '600', marginBottom: '6px' }}
            >
              Username:
            </label>
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter email"
              style={{
                background: 'white',
                padding: '8px',
                width: '100%',
                maxWidth: '350px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '1em',
                color: '#333'   
              }}
              required
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{ display: 'block', fontWeight: '600', marginBottom: '6px' }}
            >
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
             style={{
                background: 'white',
                padding: '8px',
                width: '100%',
                maxWidth: '350px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '1em',
                color: '#333'   
              }}
              required
            />
          </div>

          <button
            type="submit"
            style={{
              padding: '10px 24px',
              backgroundColor: 'rgba(27, 231, 88, 1)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '1em',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = 'rgba(39, 97, 234, 0.64)')
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = 'rgba(49, 185, 167, 0.89)')
            }
          >
            Fetch Students Data
          </button>
        </form>
      )}

      {/* Error */}
      {error && (
        <p style={{ color: 'red', marginBottom: '20px', fontWeight: '600' }}>
          {error}
        </p>
      )}

      {/* Student Groups */}
      {isAdmin && (
        <div style={{ display: 'grid', gap: '28px' }}>
          {orderedCats.map((cat) => {
            const list = grouped[cat] || [];
            return (
              <div key={cat}>
                <h3 style={{ margin: '0 0 12px', fontWeight: 'bold', color: '#2980B9' }}>
                  Class {cat} {list.length ? `(${list.length})` : ''}
                </h3>

                <div style={{ overflowX: 'auto' }}>
                  <table
                    style={{
                      width: '100%',
                      borderCollapse: 'collapse',
                      minWidth: '600px',
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          backgroundColor: headerBg,
                          color: 'white',
                          position: 'sticky',
                          top: 0,
                          zIndex: 1,
                        }}
                      >
                        <th style={{ padding: '14px 12px', textAlign: 'left' }}>Name</th>
                        <th style={{ padding: '14px 12px', textAlign: 'left' }}>Email</th>
                        <th style={{ padding: '14px 12px', textAlign: 'left' }}>Final Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {list.length === 0 ? (
                        <tr>
                          <td colSpan="3" style={{ textAlign: 'center', padding: '20px' }}>
                            No students in Class {cat}.
                          </td>
                        </tr>
                      ) : (
                        list
                          .slice()
                          .sort((a, b) => (b.finalScore ?? 0) - (a.finalScore ?? 0))
                          .map((student) => (
                            <tr key={student.id} style={{ borderBottom: '1px solid #eee' }}>
                              <td style={{ padding: '12px 15px' }}>{student.name}</td>
                              <td style={{ padding: '12px 15px' }}>{student.email}</td>
                              <td style={{ padding: '12px 15px', fontWeight: '600' }}>
                                {student.finalScore ?? '-'}
                              </td>
                            </tr>
                          ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Info if no students */}
      {isAdmin && students.length === 0 && !error && (
        <p style={{ marginTop: '16px', color: '#555', fontStyle: 'italic' }}>
          No data available. Click <strong>Fetch Students Data</strong> to load results.
        </p>
      )}
    </div>
  );
}

export default AdminStudentData;
