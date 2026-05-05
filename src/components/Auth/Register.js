import { useState } from "react";
import "./Auth.css";

function Register({ switchToLogin }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const API = "https://localhost:7107/api/auth";

  function handleRegister() {
    fetch(`${API}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then(res => res.text())
      .then(() => {
        alert("User created");
        switchToLogin(); 
      });
  }

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h1>Register</h1>

        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="auth-buttons">

          <button className="primary" onClick={handleRegister}>
            Create Account
          </button>

          <button className="secondary" onClick={switchToLogin}>
            Back to Login
          </button>

        </div>

      </div>
    </div>
  );
}

export default Register;