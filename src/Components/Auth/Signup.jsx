// import React from "react";
// import AuthLayout from "./AuthLayout";
// import { Leaf } from "lucide-react";

// const SignupPage = ({ onSwitch }) => {
//   const handleSubmit = (e) => {
//     const [formData, setFormData] = useState({
//       fullName: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     });

//     e.preventDefault();
//     onSwitch();
//   };

//   return (
//     <AuthLayout>
//       <div className="auth-header">
//         <div className="auth-logo-icon">
//           <Leaf size={32} />
//         </div>
//         <h2 className="auth-title">Join Koreanza</h2>
//         <p className="auth-subtitle-italic">Begin your journey to luminous skin.</p>
//       </div>

//       <form className="auth-form" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label className="form-label">Full Name</label>
//           <input
//             type="text"
//             className="form-input"
//             placeholder="Evelyn Rose"
//           />
//         </div>

//         <div className="form-group">
//           <label className="form-label">Email Address</label>
//           <input
//             type="email"
//             className="form-input"
//             placeholder="hello@ritual.com"
//           />
//         </div>

//         <div className="form-row">
//           <div className="form-group">
//             <label className="form-label">Password</label>
//             <input
//               type="password"
//               className="form-input"
//               placeholder="••••••••"
//             />
//           </div>
//           <div className="form-group">
//             <label className="form-label">Confirm</label>
//             <input
//               type="password"
//               className="form-input"
//               placeholder="••••••••"
//             />
//           </div>
//         </div>

//         <button type="submit" className="submit-btn">Create Account</button>
//       </form>

//       <div className="auth-footer">
//         Already have an account? <span className="auth-footer-link" onClick={onSwitch}>Sign In</span>
//       </div>

//       <div className="bottom-decoration">
//         <div className="decor-line"></div>
//         <span className="decor-icon">✧</span>
//         <div className="decor-line"></div>
//       </div>
//     </AuthLayout>
//   );
// };

// export default SignupPage;







import React, { useState } from "react";
import axios from "axios";
import AuthLayout from "./AuthLayout";
import { Leaf } from "lucide-react";

const SignupPage = ({ onSwitch }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        formData
      );

      alert(response.data.message);

      console.log("Signup Success:", response.data);

      // Save token if returned
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      // Redirect to Login page
      onSwitch();

    } catch (error) {
      console.error(error);

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
        {/* Full Name */}
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

        {/* Email */}
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

        <div className="form-row">
          {/* Password */}
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

          {/* Confirm Password */}
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