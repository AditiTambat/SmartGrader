//
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Quiz({ studentEmail }) {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loadingResults, setLoadingResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes in seconds

  // Refs to control auto-submit behavior
  const isAutoSubmitRef = useRef(false);
  const hasAutoSubmittedRef = useRef(false);

  useEffect(() => {
    if (!studentEmail) return;

    axios
      .get("http://localhost:8080/quiz/start", {
        params: { email: studentEmail },
      })
      .then((response) => {
        setQuestions(response.data);
        setError("");
        setScore(null);
        setSubmitted(false);
        setTimeLeft(60 * 60); // reset timer when new quiz loads
        // reset auto-submit guards on new quiz
        isAutoSubmitRef.current = false;
        hasAutoSubmittedRef.current = false;
      })
      .catch((err) => {
        setError(err.response?.data || "Failed to fetch questions");
        setQuestions([]);
      });
  }, [studentEmail]);

  // countdown timer
  useEffect(() => {
    if (submitted || questions.length === 0) return;

    if (timeLeft <= 0 && !hasAutoSubmittedRef.current) {
      hasAutoSubmittedRef.current = true;
      isAutoSubmitRef.current = true;
      toast.info("⏰ Time's up! Submitting your quiz...", {
        position: "top-center",
      });
      formik.submitForm(); // auto-submit when time is up
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted, questions]);

  // Prevent copying via right-click/context menu and selection
  useEffect(() => {
    const preventDefault = (e) => e.preventDefault();
    document.addEventListener("contextmenu", preventDefault);
    document.addEventListener("copy", preventDefault);
    document.addEventListener("cut", preventDefault);
    document.addEventListener("paste", preventDefault);
    document.addEventListener("dragstart", preventDefault);
    return () => {
      document.removeEventListener("contextmenu", preventDefault);
      document.removeEventListener("copy", preventDefault);
      document.removeEventListener("cut", preventDefault);
      document.removeEventListener("paste", preventDefault);
      document.removeEventListener("dragstart", preventDefault);
    };
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: questions.reduce((acc, q) => {
      acc[q.id] = "";
      return acc;
    }, {}),
    // Removed validate function to eliminate required validation
    onSubmit: (values, { setSubmitting }) => {
      // Only block manual submits; allow auto-submit even with unanswered
      const unanswered = questions.filter((q) => !values[q.id]);
      if (!isAutoSubmitRef.current && unanswered.length > 0) {
        toast.warn("⚠️ Please attempt all the questions before submitting!", {
          position: "top-center",
        });
        setSubmitting(false);
        return;
      }

      setSubmitError("");
      setScore(null);

      const answers = questions.map((q) => ({
        question: { id: q.id },
        selectedAnswer: values[q.id],
      }));

      // Reset the auto-submit flag before network call
      isAutoSubmitRef.current = false;

      axios
        .post(
          `http://localhost:8080/quiz/submit?email=${studentEmail}`,
          answers
        )
        .then(() => {
          setSubmitted(true);
          toast.success("✅ Quiz submitted successfully!", {
            position: "top-center",
          });
        })
        .catch((err) => {
          const data = err?.response?.data;
          const message =
            typeof data === "string"
              ? data
              : typeof data?.message === "string"
              ? data.message
              : err.message || "Failed to submit quiz";
          setSubmitError(message);
          toast.error(`❌ ${message}`, { position: "top-center" });
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  const fetchScore = () => {
    setLoadingResults(true);
    axios
      .get(`http://localhost:8080/students/score`, {
        params: { email: studentEmail },
      })
      .then((res) => {
        setScore(res.data);
      })
      .catch((err) => {
        const data = err?.response?.data;
        const message =
          typeof data === "string"
            ? data
            : typeof data?.message === "string"
            ? data.message
            : err.message || "Failed to fetch score";
        setSubmitError(message);
        toast.error(`❌ ${message}`, { position: "top-center" });
      })
      .finally(() => {
        setLoadingResults(false);
      });
  };

  if (error) {
    return (
      <div
        className="alert alert-danger mt-3"
        onContextMenu={(e) => e.preventDefault()}
        onCopy={(e) => e.preventDefault()}
        onCut={(e) => e.preventDefault()}
        onPaste={(e) => e.preventDefault()}
        onSelectStart={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        style={{
          userSelect: "none",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
        }}
      >
        {error}
      </div>
    );
  }

  if (score !== null) {
    return (
      <div
        className="container mt-4 d-flex justify-content-center align-items-center"
        style={{
          minHeight: "60vh",
          userSelect: "none",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
        }}
        onContextMenu={(e) => e.preventDefault()}
        onCopy={(e) => e.preventDefault()}
        onCut={(e) => e.preventDefault()}
        onPaste={(e) => e.preventDefault()}
        onSelectStart={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
      >
        <div
          className="card shadow-lg p-4 text-center"
          style={{ width: "22rem", borderRadius: "1rem" }}
        >
          <div className="card-body">
            <h2 className="card-title mb-3">Quiz Result</h2>
            <p className="card-text fs-4 fw-semibold">
              Your Score: <span className="text-primary">{score}</span> /{" "}
              {questions.length}
            </p>
          </div>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          theme="colored"
        />
      </div>
    );
  }

  return (
    <div
      className="container mt-4"
      onContextMenu={(e) => e.preventDefault()}
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
      onPaste={(e) => e.preventDefault()}
      onSelectStart={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      style={{
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
      }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <h2 style={{ marginLeft: "310px" }}>Quiz Questions</h2>
      </div>

      {/* Sticky Timer (always visible) */}
      <div
        style={{
          position: "fixed",
          bottom: "15px",
          right: "1px",
          backgroundColor: "#fff",
          padding: "8px 14px",
          borderRadius: "10px",
          boxShadow: "0px 2px 6px rgba(0,0,0,0.25)",
          fontWeight: "bold",
          fontSize: "16px",
          borderColor: "red",
          borderWidth: "2px",
          borderStyle: "solid",
          color: timeLeft < 300 ? "red" : "green",
          zIndex: 1100,
        }}
      >
        ⏳ {formatTime(timeLeft)}
      </div>

      {questions.length === 0 ? (
        <p>Loading questions...</p>
      ) : (
        <>
          {!submitted ? (
            <form onSubmit={formik.handleSubmit}>
              {questions.map((q, idx) => (
                <div
                  key={q.id}
                  className="card mb-3 shadow-sm"
                  style={{ padding: "20px", borderRadius: "8px" }}
                >
                  <h5>
                    Question {idx + 1}: {q.questionText}
                  </h5>
                  <div style={{ marginTop: "12px", fontWeight: "bold" }}>
                    {["A", "B", "C", "D"].map((opt) => (
                      <label
                        key={opt}
                        style={{
                          display: "block",
                          marginBottom: "8px",
                          cursor: "pointer",
                        }}
                      >
                        <input
                          type="radio"
                          name={q.id}
                          value={opt}
                          onChange={formik.handleChange}
                          checked={formik.values[q.id] === opt}
                          style={{ marginRight: "8px" }}
                        />
                        {opt}. {q[`option${opt}`]}
                      </label>
                    ))}
                  </div>
                  {/* Removed error display for each question */}
                </div>
              ))}

              <button
                type="submit"
                className="btn btn-primary"
                disabled={formik.isSubmitting}
              >
                Submit Quiz
              </button>
              {submitError && (
                <div className="alert alert-danger mt-3" role="alert">
                  {submitError}
                </div>
              )}
            </form>
          ) : (
            <div className="text-center">
              <p>Quiz submitted successfully!</p>
              <button
                className="btn btn-success"
                onClick={fetchScore}
                disabled={loadingResults}
              >
                {loadingResults ? "Loading..." : "Show Results"}
              </button>
              {submitError && (
                <div className="alert alert-danger mt-3" role="alert">
                  {submitError}
                </div>
              )}
            </div>
          )}
        </>
      )}
      {/* Toast container added here */}
      <ToastContainer position="top-center" autoClose={3000} theme="light" />
    </div>
  );
}

export default Quiz;
