import React from "react";

function LandingPage() {
  const containerStyle = {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#2C3E50",
    animation: "fadeIn 1s ease forwards",
  };

  const heroStyle = {
    background: "linear-gradient(135deg, #2980B9, #6DD5FA, #FFFFFF)",
    color: "#fff",
    textAlign: "center",
    padding: "80px 20px",
  };

  const headingStyle = {
    fontSize: "3rem",
    fontWeight: "bold",
    marginBottom: "20px",
  };

  const subHeadingStyle = {
    fontSize: "1.3rem",
    maxWidth: "700px",
    margin: "0 auto 30px auto",
    lineHeight: "1.6",
  };

  const ctaButton = {
    background: "#FF6B6B",
    color: "#fff",
    padding: "15px 30px",
    borderRadius: "30px",
    border: "none",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  const sectionStyle = {
    maxWidth: "1100px",
    margin: "60px auto",
    padding: "0 20px",
  };

  const cardGrid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginTop: "30px",
  };

  const cardStyle = {
    background: "#fff",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease, boxShadow 0.3s ease",
  };

  const cardHover = {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
  };

  const featureTitle = {
    fontSize: "1.4rem",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#2980B9",
  };

  const footerStyle = {
    background: "#2C3E50",
    color: "#fff",
    textAlign: "center",
    padding: "20px",
    marginTop: "50px",
  };

  return (
    <div style={containerStyle}>
      {/* Hero Section */}
      <div style={heroStyle}>
        <h1 style={headingStyle}>🚀 Welcome to SmartGrader</h1>
        <p style={subHeadingStyle}>
          The smart way for students to assess, improve, and prepare for the job
          market. Practice, track progress, and land your dream job!
        </p>
        <button
          style={ctaButton}
          onMouseOver={(e) => {
            e.target.style.background = "#E63946";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "#FF6B6B";
          }}
        >
          Get Started Now
        </button>
      </div>

      {/* Features Section */}
      <section style={sectionStyle}>
        <h2 style={{ textAlign: "center", fontSize: "2rem" }}>
          Why Choose SmartGrader?
        </h2>
        <div style={cardGrid}>
          <div
            style={cardStyle}
            onMouseOver={(e) => Object.assign(e.currentTarget.style, cardHover)}
            onMouseOut={(e) => Object.assign(e.currentTarget.style, cardStyle)}
          >
            <h3 style={featureTitle}>📊 Instant Feedback</h3>
            <p>
              Take quizzes and get immediate scores to identify strengths and
              weaknesses in real time.
            </p>
          </div>
          <div
            style={cardStyle}
            onMouseOver={(e) => Object.assign(e.currentTarget.style, cardHover)}
            onMouseOut={(e) => Object.assign(e.currentTarget.style, cardStyle)}
          >
            <h3 style={featureTitle}>🎯 Targeted Improvement</h3>
            <p>
              Focus on the skills that matter most to increase your job
              readiness.
            </p>
          </div>
          <div
            style={cardStyle}
            onMouseOver={(e) => Object.assign(e.currentTarget.style, cardHover)}
            onMouseOut={(e) => Object.assign(e.currentTarget.style, cardStyle)}
          >
            <h3 style={featureTitle}>📈 Progress Tracking</h3>
            <p>
              Track your performance over time and stay motivated to achieve
              your career goals.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section (Now Cards) */}
      <section style={sectionStyle}>
        <h2 style={{ textAlign: "center", fontSize: "2rem" }}>
          ⚙ How It Works
        </h2>
        <div style={cardGrid}>
          <div
            style={cardStyle}
            onMouseOver={(e) => Object.assign(e.currentTarget.style, cardHover)}
            onMouseOut={(e) => Object.assign(e.currentTarget.style, cardStyle)}
          >
            <h3 style={featureTitle}>1️⃣ Sign Up</h3>
            <p>Create your SmartGrader account in seconds and get started.</p>
          </div>
          <div
            style={cardStyle}
            onMouseOver={(e) => Object.assign(e.currentTarget.style, cardHover)}
            onMouseOut={(e) => Object.assign(e.currentTarget.style, cardStyle)}
          >
            <h3 style={featureTitle}>2️⃣ Take Assessments</h3>
            <p>
              Choose from a wide range of skill-based quizzes and tests to
              evaluate your abilities.
            </p>
          </div>
          <div
            style={cardStyle}
            onMouseOver={(e) => Object.assign(e.currentTarget.style, cardHover)}
            onMouseOut={(e) => Object.assign(e.currentTarget.style, cardStyle)}
          >
            <h3 style={featureTitle}>3️⃣ Instant Feedback</h3>
            <p>
              Receive your score immediately with a detailed breakdown of your
              performance.
            </p>
          </div>
          <div
            style={cardStyle}
            onMouseOver={(e) => Object.assign(e.currentTarget.style, cardHover)}
            onMouseOut={(e) => Object.assign(e.currentTarget.style, cardStyle)}
          >
            <h3 style={featureTitle}>4️⃣ Improve & Track</h3>
            <p>
              Work on your weak areas, retake tests, and track your progress
              over time until you're job-ready.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={footerStyle}>
        © {new Date().getFullYear()} SmartGrader | All Rights Reserved
      </footer>
    </div>
  );
}

export default LandingPage;
