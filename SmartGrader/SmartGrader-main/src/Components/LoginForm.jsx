import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../App.css";

const LoginForm = ({ onLogin, switchToSignup }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        // Call backend login API
        const response = await axios.post(
          "http://localhost:8080/students/login",
          values
        );

        // response.data has { name, email, finalScore }
        // Pass entire user data to parent
        onLogin(response.data);

        // Optional: log for debugging
        console.log("Logged in user:", response.data);
      } catch (error) {
        setErrors({ submit: "Login failed. Please try again." });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        // backgroundColor: "#fff",
        padding: "20px",
      }}
    >
      <form
        onSubmit={formik.handleSubmit}
        noValidate
        className="p-4 bg-white rounded shadow login-card"
      >
        <h3
          className="text-center mb-4"
          style={{ color: "#007BFF", fontWeight: "bold" }}
        >
          Student Login
        </h3>

        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className={`form-control ${
              formik.touched.email && formik.errors.email ? "is-invalid" : ""
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="invalid-feedback">{formik.errors.email}</div>
          )}
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className={`form-control ${
              formik.touched.password && formik.errors.password
                ? "is-invalid"
                : ""
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="invalid-feedback">{formik.errors.password}</div>
          )}
        </div>

        {formik.errors.submit && (
          <div className="alert alert-danger mt-3">{formik.errors.submit}</div>
        )}

        <button
          type="submit"
          className="btn btn-primary w-100 login-btn"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Logging in..." : "Login"}
        </button>

        <p className="mt-3 text-center">
          Don't have an account?{" "}
          <button
            type="button"
            className="btn btn-link p-0 signup-link btn-sl"
            onClick={switchToSignup}
          >
            Sign up here
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
