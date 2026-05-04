import { useState } from "react";

function Login({ setUser }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const API_AUTH = "http://localhost:5217/api/auth";

  function handleLogin() {
    fetch(`${API_AUTH}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data); 
      })
      .catch(() => alert("Invalid username or password"));
  }

  function handleRegister() {
    fetch(`${API_AUTH}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then(res => res.text())
      .then(msg => alert(msg))
      .catch(() => alert("Register failed"));
  }

  return (
  <div className="container">
    <h1>Login</h1>

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

    <div className="login-buttons">
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
    </div>
  </div>
);
}

export default Login;