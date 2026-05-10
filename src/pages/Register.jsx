import { useState } from "react";

function Register({ switchToLogin }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const API = "https://localhost:7107/api/auth"; 

  function handleRegister() {

    if (!username || !password) {
      alert("Please fill all fields");
      return;
    }

    fetch(`${API}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then(async (res) => {

        if (!res.ok) {
          const msg = await res.text();
          throw new Error(msg || "Register failed");
        }

        return res.text();
      })
      .then(() => {
        alert("User created successfully");
        switchToLogin();
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h1>Register</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
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