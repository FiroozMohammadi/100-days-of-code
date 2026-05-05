import { useState } from "react";
import "./Auth.css";

function Login({ setUser, switchToRegister }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const API = "https://localhost:7107/api/auth";

  function handleLogin() {

    if (!username || !password) {
      alert("Please fill all fields");
      return;
    }

    fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => {
        localStorage.setItem("token", data.token);
        setUser({ token: data.token });
      })
      .catch(() => alert("Invalid username or password"));
  }

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h1>Login</h1>

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

          <button className="primary" onClick={handleLogin}>
            Login
          </button>

          <button className="secondary" onClick={switchToRegister}>
            Create Account
          </button>

        </div>

      </div>
    </div>
  );
}

export default Login;