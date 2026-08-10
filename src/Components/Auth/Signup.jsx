
import React, { useState } from "react";
import axios from "axios";
import AuthLayout from "./AuthLayout";
import { Leaf } from "lucide-react";

const SignupPage = ({ onSwitch }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/auth/signup", {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      if (response.data.success) {
        alert("Account created successfully!");

        // Reset form inputs
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });

        // 1. Jump directly to login page
        if (onSwitch) {
          onSwitch();
        }
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    <AuthLayout>
      <div className="auth-header">
        <div className="auth-logo-icon">
          <Leaf size={32} />
        </div>

        <h2 className="auth-title">Join Koreanza</h2>

        <p className="auth-subtitle-italic">
          Begin your journey to luminous skin.
        </p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="fullName"
            className="form-input"
            placeholder="Evelyn Rose"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="hello@ritual.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* 2. Phone Number Input Field */}
        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <input
            type="tel"
            name="phone"
            className="form-input"
            placeholder="+923139884980"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Password</label>
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

          <div className="form-group">
            <label className="form-label">Confirm</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-input"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Create Account
        </button>
      </form>

      <div className="auth-footer">
        Already have an account?{" "}
        <span className="auth-footer-link" onClick={onSwitch}>
          Sign In
        </span>
      </div>

      <div className="bottom-decoration">
        <div className="decor-line"></div>
        <span className="decor-icon">✧</span>
        <div className="decor-line"></div>
      </div>
    </AuthLayout>
  );
};

export default SignupPage;