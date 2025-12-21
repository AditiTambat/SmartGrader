import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

import SignupForm from "./Components/SignupForm";
import LoginForm from "./Components/LoginForm";
import Quiz from "./Components/Quiz";
import Navbar from "./Components/Navbar";
import LandingPage from "./Components/LandingPage";
import AdminStudentData from "./Components/AdminFetchdata"; 

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false); 

  useEffect(() => {
    const fadeInKeyframes = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    const styleSheet = document.styleSheets[0];
    if (styleSheet) {
      styleSheet.insertRule(fadeInKeyframes, styleSheet.cssRules.length);
    }
  }, []);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setShowConfetti(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setShowConfetti(false);
    setShowAdmin(false); // ✅ reset admin view when logging out
  };

  const handleShowLogin = () => {
    setShowLanding(false);
    setShowSignup(false);
    setShowAdmin(false); // ✅ ensure not admin
  };

  const handleShowSignup = () => {
    setShowLanding(false);
    setShowSignup(true);
    setShowAdmin(false); // ✅ ensure not admin
  };

  const handleShowAdmin = () => {
    setShowLanding(false);
    setShowSignup(false);
    setCurrentUser(null); // ✅ admin is separate from student login
    setShowAdmin(true);
  };

  useEffect(() => {
    if (currentUser && currentUser.finalScore !== null) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 7000);
      return () => clearTimeout(timer);
    }
  }, [currentUser]);

  const cardStyle = {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(224, 33, 33, 0.1)",
    backgroundColor: "#fff",
    color: "#333",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textAlign: "center",
    animation: "fadeIn 1s ease forwards",
  };

  return (
    <>
      <Navbar
        currentUserEmail={currentUser?.name}
        onLogout={handleLogout}
        onLoginClick={handleShowLogin}
        onSignupClick={handleShowSignup}
        onAdminClick={handleShowAdmin} // ✅ pass handler
      />

      <main
        style={{
          marginLeft: "250px",
          marginTop: "56px",
          padding: "20px",
          minHeight: "calc(100vh - 56px)",
          backgroundColor: "#fbfbfb",
          position: "relative",
        }}
      >
        {showConfetti && (
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        )}

        {showAdmin ? (
          <AdminStudentData /> // ✅ Admin page shown here
        ) : showLanding ? (
          <LandingPage onGetStarted={() => setShowLanding(false)} />
        ) : !currentUser ? (
          showSignup ? (
            <SignupForm
              onSignupSuccess={() => setShowSignup(false)}
              switchToLogin={() => setShowSignup(false)}
            />
          ) : (
            <LoginForm
              onLogin={handleLogin}
              switchToSignup={() => setShowSignup(true)}
            />
          )
        ) : currentUser.finalScore === null ? (
          <Quiz studentEmail={currentUser.email} />
        ) : (
          <div style={cardStyle}>
            <h2 style={{ color: "#27AE60" }}>
              Congratulations, {currentUser.name}!
            </h2>
            <p style={{ fontSize: "1.2em" }}>
              Your final score is:{" "}
              <strong style={{ fontSize: "2em", color: "#E67E22" }}>
                {currentUser.finalScore}
              </strong>
              /50
            </p>
            <p>Keep up the great work and continue learning!</p>
          </div>
        )}
      </main>
    </>
  );
}

export default App;

