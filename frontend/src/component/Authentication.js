import React, { useState } from "react";
import "./Authentication.css";
import { useNavigate } from "react-router-dom";
import { register, login, adminLogin } from "../utils/api"; // Import API functions
import { useUser } from "./UserContext";
import { jwtDecode } from "jwt-decode";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-init";

function Authentication() {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState("login"); // "login", "register", "admin"
  const [credentials, setCredentials] = useState({ userName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const {setUser} = useUser();

  const toggleAuthMode = (mode) => {
    setAuthMode(mode);
    setError("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await register({
        email: credentials.email,
        password: credentials.password,
        userName: credentials.userName,
      });

      alert(data.message);
      localStorage.setItem("authToken", data.token);

      // Decode the token to get user info
      const decoded = jwtDecode(data.token);
      
      // Update the user context with the decoded information
      setUser({
        uid: decoded.uid,
        email: decoded.email,
        displayName: credentials.userName,
        role: "user", 
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
     
      const data = await login({
        email: credentials.email,
        password: credentials.password,
      });

      if (data.token) {
        await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
        // Handle successful login
        alert("Login successful!");

              // Store the token in localStorage
      localStorage.setItem("authToken", data.token);

      // Decode the token to get user info
      const decoded = jwtDecode(data.token);

      // Update the user context with the decoded information
      setUser({
        uid: decoded.uid,
        email: decoded.claims.email,
        role: decoded.claims.role, // If you store role in Firestore or Firebase
      });

      navigate("/"); // Redirect to homepage after successful login
      } else {
        // Handle error
        alert("Login failed. Please try again.");
      }


    } catch (err) {
      setError(err.message);
    }
  };
  
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await adminLogin({
        email: credentials.email,
        password: credentials.password,
      });

      if(data.token)
      {
        await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
        alert("Login successful!");

      // Store the token in localStorage
      localStorage.setItem("authToken", data.token);

      // Decode the token to get user info
      const decoded = jwtDecode(data.token);

      // Update the user context with the decoded information
      setUser({
        uid: decoded.uid,
        email: decoded.claims.email,
        role: decoded.claims.role, // If you store role in Firestore or Firebase
      });

      navigate("/admin-dashboard"); // Redirect to homepage after successful login
      }
      
    } catch (err) {
      setError(err.message);
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
          <form onSubmit={handleAdminLogin}>
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
              <br></br>
              <span style={{ background: "none" }}>
                <span className="toggle-link" onClick={() => toggleAuthMode("admin")}>
                  <i>Login As Admin</i>
                </span>
              </span>
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
