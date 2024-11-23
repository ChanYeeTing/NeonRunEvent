import React, { useState } from "react";
import "./RegisterAccount.css";

function RegisterAccount () {

    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => setIsLogin(!isLogin);

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>{isLogin ? "Login" : "Register"}</h2>
                {isLogin ? (
                    <form>
                        <input type="email" placeholder="Email" required />
                        <input type="password" placeholder="Password" required />
                        <button type="submit">Login</button>
                    </form>
                ) : (
                    <form>
                        <input type="text" placeholder="Username" required />
                        <input type="email" placeholder="Email" required />
                        <input type="password" placeholder="Password" required />
                        <button type="submit">Register</button>
                    </form>
                )}
                <p>
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <span className="toggle-link" onClick={toggleForm}>
                        {isLogin ? "Register" : "Login"}
                    </span>
                </p>
            </div>
        </div>
    );
}
export default RegisterAccount;
