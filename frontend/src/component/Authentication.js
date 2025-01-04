import React, { useState } from "react";
import "./Authentication.css";
import { useNavigate } from "react-router-dom";
import { register, login, adminLogin } from "../utils/api"; // Import API functions
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase-init";
import { sendEmailVerification, createUserWithEmailAndPassword } from "firebase/auth";
import LoadingOverlay from "./LoadingOverlay";

function Authentication() {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState("login"); // "login", "register", "admin"
  const [credentials, setCredentials] = useState({ userName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleAuthMode = (mode) => {
    setAuthMode(mode);
    setError("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleRegister = async (e) => {
    setError("");
    e.preventDefault();
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
      const user = userCredential.user;
      sessionStorage.setItem("role", "user");
      const registerData = {
        user,
        userName: credentials.userName,
        email: credentials.email,
        role: "user"
      }
      await register(registerData);

      // await setDoc(doc(db, "users", userCredential.user.uid), {
      //   userName: credentials.userName,
      //   email: credentials.email,
      //   password: credentials.password,
      //   role: "user"
      // });

      await sendEmailVerification(user);
      await updateProfile(user, { displayName: credentials.userName });
      setLoading(false);
      alert("User registered successfully. Verify email to log in.");
      setAuthMode("login");
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await login({
        email: credentials.email,
        password: credentials.password,
      });

      if (data.token) {
        await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
        setLoading(false);
        await setPersistence(auth, browserLocalPersistence);
        // Handle successful login
        alert("Login successful!");
        sessionStorage.setItem("role", "user");
      navigate("/"); // Redirect to homepage after successful login
      } else {
        setLoading(false);
        // Handle error
        alert("Login failed. Please try again.");
      }


    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };
  
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const data = await adminLogin({
        email: credentials.email,
        password: credentials.password,
      });

      if(data.token)
      {
        await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
        setLoading(false);
        await setPersistence(auth, browserLocalPersistence);
        alert("Login successful!");
        sessionStorage.setItem("role", "admin");
      navigate("/admin-dashboard"); // Redirect to homepage after successful login
      }
      
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };
  
  
  return (
    <div className="auth-container">
      <LoadingOverlay loading={loading} />
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
