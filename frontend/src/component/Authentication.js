import React, { useState } from "react";
import "./Authentication.css";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase-init";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile
} from "firebase/auth";
import { useUser } from "./UserContext";
import { doc, setDoc } from "firebase/firestore";

function Authentication() {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState("login"); // "login", "register", "admin"
  const [credentials, setCredentials] = useState({ userName:"", email: "", password: "" });
  const [error, setError] = useState("");
  const { setUser } = useUser();

  const toggleAuthMode = (mode) => {
    setAuthMode(mode);
    setError(""); // Clear error when switching modes
    console.log(auth);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
    const user = userCredential.user;

    if (user.emailVerified) {
      alert("Login successful!");
      navigate("/");
    } else {
      alert("Please verify your email before logging in.");
    }
  } catch (error) {
    console.error("Login error:", error.message);
    setError(error.message);
  }
};

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
      const user = userCredential.user;
      await sendEmailVerification(user);

      setUser(user);
      await updateProfile(user, { displayName: credentials.userName });

      await setDoc(doc(db, "users", userCredential.user.uid), {
        userName: credentials.userName,
        email: credentials.email,
        password: credentials.password
      });
      alert("Registration successful! Please verify your email to log in.");
      toggleAuthMode("login"); // Switch to login after successful registration
    } catch (err) {
      console.log(err.message);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>{authMode === "login" ? "Login" : authMode === "register" ? "Register" : "Admin Login"}</h2>

        {authMode === "login" && (
          <form onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Login</button>
            {error && <p className="error-message">{error}</p>}
          </form>
        )}

        {authMode === "register" && (
          <form onSubmit={handleRegister}>

            <input type="text" 
            name="userName"
            placeholder="Username" 
            required 
            value={credentials.userName}
            onChange={handleInputChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Register</button>
            {error && <p className="error-message">{error}</p>}
          </form>
        )}

        {authMode === "admin" && (
          <form onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="Admin Email"
              value={credentials.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Admin Password"
              value={credentials.password}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Login</button>
            {error && <p className="error-message">{error}</p>}
          </form>
        )}

        <p>
          {authMode === "login" && (
            <>
              Don't have an account?{" "}
              <span className="toggle-link" onClick={() => toggleAuthMode("register")}>
                Register
              </span>{" "}
              <div style={{ background: "none" }}>
                <span className="toggle-link" onClick={() => toggleAuthMode("admin")}>
                  <i>Login As Admin</i>
                </span>
              </div>
            </>
          )}
          {authMode === "register" && (
            <>
              Already have an account?{" "}
              <span className="toggle-link" onClick={() => toggleAuthMode("login")}>
                Login
              </span>
            </>
          )}
          {authMode === "admin" && (
            <>
              Not an admin?{" "}
              <span className="toggle-link" onClick={() => toggleAuthMode("login")}>
                <i>Login As User</i>
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default Authentication;
