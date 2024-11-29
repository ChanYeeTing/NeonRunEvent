import React, { useState } from "react";
import "./Authentication.css";
import { useNavigate } from "react-router-dom";

function Authentication() {
  const navigate = useNavigate(); 
  const [authMode, setAuthMode] = useState("login"); // "login", "register", "admin"
  const [adminCredentials, setAdminCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const toggleAuthMode = (mode) => {
    setAuthMode(mode);
    setError(""); // Clear error when switching modes
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    const { email, password } = adminCredentials;

    if (email === "admin@gmail.com" && password === "admin123") {
      alert("Admin login successful!");
      navigate("/admin-dashboard")
    } else {
      setError("Invalid admin credentials. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminCredentials({ ...adminCredentials, [name]: value });
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>
          {authMode === "login"
            ? "Login"
            : authMode === "register"
            ? "Register"
            : "Admin Login"}
        </h2>

        {authMode === "login" && (
          <form>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Login</button>
          </form>
        )}

        {authMode === "register" && (
          <form>
            <input type="text" placeholder="Username" required />
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Register</button>
          </form>
        )}

        {authMode === "admin" && (
          <form onSubmit={handleAdminLogin}>
            <input
              type="email"
              name="email"
              placeholder="Admin Email"
              value={adminCredentials.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Admin Password"
              value={adminCredentials.password}
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
              <div style={{background:"none"}}>
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
