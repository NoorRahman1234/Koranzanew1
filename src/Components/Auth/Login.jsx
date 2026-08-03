

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";

const Login = ({ onSwitch, onForgot }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData
      );

      console.log(response.data);

      // Save Token
      localStorage.setItem("token", response.data.token);

      // Save User (Optional)
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert("Login Successful");

      // Go to Home Page
      navigate("/");

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Invalid Email or Password"
      );
    }
  };

  return (
    <AuthLayout>
      <div className="auth-header">
        <h1 className="auth-logo-text">KOREANZA</h1>
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">
          Step into your sanctuary of self-care.
        </p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label className="form-label">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">

          <div className="label-row">
            <label className="form-label">
              Password
            </label>

            <span
              className="forgot-link-small"
              onClick={onForgot}
            >
              *Forgot?
            </span>
          </div>

          <input
            type="password"
            name="password"
            className="form-input"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />

        </div>

        <button
          type="submit"
          className="submit-btn"
        >
          SIGN IN
        </button>

      </form>

      <div className="divider-container">
        <div className="divider-line"></div>

        <span className="divider-text">
          or continue with
        </span>

        <div className="divider-line"></div>
      </div>

      <div className="social-grid">
        <button className="social-btn">
          GOOGLE
        </button>

        <button className="social-btn">
          APPLE
        </button>
      </div>

      <div className="auth-footer">
        New?

        <span
          className="auth-footer-link"
          onClick={onSwitch}
        >
          Join the Koreanza
        </span>
      </div>
    </AuthLayout>
  );
};

export default Login;