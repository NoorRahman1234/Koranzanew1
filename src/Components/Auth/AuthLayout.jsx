import React from "react";
import "./AuthLayout.css";

const AuthLayout = ({ children }) => {
    return (
        <div className="auth-page-wrapper">
            <div className="auth-container">
                <div className="auth-card">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;

