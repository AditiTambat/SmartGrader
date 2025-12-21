import React from "react";

import "../App.css";
const Navbar = ({
  currentUserEmail,
  onLogout,
  onLoginClick,
  onSignupClick,
  onAdminClick
}) => {
  return (
    <>
      <header>
        {/* Sidenav */}
        <div
          id="sidenav-1"
          className="sidenav"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "250px",
            height: "100vh",
            background: "linear-gradient(180deg, #92c2edff, #b1efb4ff)",
            color: "white",
            paddingTop: "56px", 
            overflowY: "auto",
            zIndex: 1030,
          }}
          role="navigation"
        >
          <a
            href="#!"
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "1rem",
            }}
          >
            <img
              src="uniqueLogo2.png"
              alt="USS Logo"
              draggable="false"
              style={{ width: "100%" }}
            />
          </a>
          <ul className="sidenav-menu">
            <li className="sidenav-item">
              <a href="/">
                <i className="fas fa-home fa-fw"></i> Home
              </a>
            </li>
            
          </ul>
        </div>

        {/* Navbar */}
        <nav
          id="main-navbar"
          className="navbar navbar-expand-lg navbar-light bg-white fixed-top"
          style={{
            height: "60px",

            boxShadow: "0 2px 4px rgba(0,0,0,.1)",
            zIndex: 1040,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: "1rem",
          }}
        >
          <h2 className="logoname" >SmartGrader</h2>
          <h5 className="student-slogan">
            An inhouse training platform for students.
          </h5>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {currentUserEmail ? (
              <>
                <span style={{fontWeight:"bold"}}>Welcome, {currentUserEmail}</span>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={onLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="b1"
                  style={{ fontSize: "100%" }}
                  onClick={onAdminClick} 
                >
                  Admin Login
                </button>
                <button class="nav-btn1 login-btn1" onClick={onLoginClick}>
                  Login
                </button>


                <button class="nav-btn1 signup-btn1" onClick={onSignupClick}>
                  Signup
                </button>
              </>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
