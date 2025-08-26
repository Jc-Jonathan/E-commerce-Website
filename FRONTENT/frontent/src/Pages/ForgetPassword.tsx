import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../FirebaseConfig";
import "../Components/PagesStyles/ForgetPassword.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("✅ A password reset link has been sent to your email!");
    } catch (error: any) {
      setMessage("❌ Error: " + error.message);
    }
  };

  return (
    <div className="forget-container">
      <form className="forget-form" onSubmit={handleResetPassword}>
        <h2>Reset Password</h2>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="reset-btn">
          Send Reset Link
        </button>

        {message && <p className="reset-message">{message}</p>}
      </form>
    </div>
  );
};

export default ForgetPassword;
