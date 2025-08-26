import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../FirebaseConfig";
import "../Components/PagesStyles/SignInScreen.css";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);

      // ✅ Confirmation popup
      const proceed = window.confirm("✅ Successfully signed in! Do you want to go to your profile?");
      if (proceed) {
        navigate("/ProfileScreen"); // redirect automatically if user clicks yes
      }

    } catch (error: any) {
      alert("❌ Error: " + error.message);
    }
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSignIn}>
        <h2>Sign In</h2>

        {/* Email */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Forgot Password */}
        <div className="forgot-password">
          <Link to="/forgetpassword">Forgot Password?</Link>
        </div>

        {/* Sign In Button */}
        <button type="submit" className="signin-btn">Sign In</button>

        {/* Sign Up Redirect */}
        <p className="signup-redirect">
          Don't have an account?{" "}
          <Link to="/SignUpScreen">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default SignInScreen;
