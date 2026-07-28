import React, { useState } from "react";
import AuthLayout from "./AuthLayout";

const Login = ({ onSwitch, onForgot }) => {
  return (
    <AuthLayout>
      <div className="auth-header">
        <h1 className="auth-logo-text">KOREANZA</h1>
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Step into your sanctuary of self-care.</p>
      </div>

      <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input 
            type="email" 
            className="form-input" 
            placeholder="your@email.com" 
          />
        </div>

        <div className="form-group">
          <div className="label-row">
            <label className="form-label">Password</label>
            <span className="forgot-link-small" onClick={onForgot}>*Forgot?</span>
          </div>
          <input 
            type="password" 
            className="form-input" 
            placeholder="••••••••" 
          />
        </div>

        <button type="submit" className="submit-btn">SIGN IN</button>
      </form>

      <div className="divider-container">
        <div className="divider-line"></div>
        <span className="divider-text">or continue with</span>
        <div className="divider-line"></div>
      </div>

      <div className="social-grid">
        <button className="social-btn">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/0.png" alt="Google" className="social-icon" />
          GOOGLE
        </button>
        <button className="social-btn">
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="social-icon" />
          APPLE
        </button>
      </div>

      <div className="auth-footer">
        New? <span className="auth-footer-link" onClick={onSwitch}>Join the Koreanza</span>
      </div>
    </AuthLayout>
  );
};

export default Login;





// import React, { useState } from "react";
// import AuthLayout from "./AuthLayout";

// const Login = ({ onSwitch, onForgot, onLoginSuccess }) => {
//   // 1. State for form inputs
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // 2. Helper to pre-fill dummy data
//   const handleFillDummyData = () => {
//     setEmail("demo@koreanza.com");
//     setPassword("password123");
//   };

//   // 3. Form submit handler to trigger navigation/login action
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (onLoginSuccess) {
//       onLoginSuccess({ email, password });
//     } else {
//       console.log("Logged in with:", { email, password });
//     }
//   };

//   return (
//     <AuthLayout>
//       <div className="auth-header">
//         <h1 className="auth-logo-text">KOREANZA</h1>
//         <h2 className="auth-title">Welcome Back</h2>
//         <p className="auth-subtitle">Step into your sanctuary of self-care.</p>
//       </div>

//       {/* Quick Autofill Button for testing */}
//       <button 
//         type="button" 
//         onClick={handleFillDummyData}
//         style={{
//           width: "100%",
//           padding: "8px",
//           marginBottom: "15px",
//           backgroundColor: "#f0f0f0",
//           border: "1px dashed #ccc",
//           borderRadius: "4px",
//           cursor: "pointer",
//           fontSize: "12px"
//         }}
//       >
//         ⚡ Auto-fill Dummy Credentials
//       </button>

//       <form className="auth-form" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label className="form-label">Email Address</label>
//           <input 
//             type="email" 
//             className="form-input" 
//             placeholder="your@email.com" 
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <div className="label-row">
//             <label className="form-label">Password</label>
//             <span className="forgot-link-small" onClick={onForgot}>*Forgot?</span>
//           </div>
//           <input 
//             type="password" 
//             className="form-input" 
//             placeholder="••••••••" 
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>

//         <button type="submit" className="submit-btn">SIGN IN</button>
//       </form>

//       <div className="divider-container">
//         <div className="divider-line"></div>
//         <span className="divider-text">or continue with</span>
//         <div className="divider-line"></div>
//       </div>

//       <div className="social-grid">
//         <button className="social-btn" type="button" onClick={handleSubmit}>
//           <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/0.png" alt="Google" className="social-icon" />
//           GOOGLE
//         </button>
//         <button className="social-btn" type="button" onClick={handleSubmit}>
//           <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="social-icon" />
//           APPLE
//         </button>
//       </div>

//       <div className="auth-footer">
//         New? <span className="auth-footer-link" onClick={onSwitch}>Join the Koreanza</span>
//       </div>
//     </AuthLayout>
//   );
// };

// export default Login;
