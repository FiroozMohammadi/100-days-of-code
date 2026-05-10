import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login({ setUser }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const API = "https://localhost:7107/api/auth";

  function handleLogin() {

    if (!username || !password) {
      toast.error("Please fill all fields");
      return;
    }

    fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then(res => {

        if (!res.ok) {
          throw new Error("Login failed");
        }

        return res.json();
      })
      .then(data => {

        localStorage.setItem("token", data.token);

        setUser({ token: data.token });

        toast.success("Login successful");

        navigate("/tasks");

      })
      .catch(() => {

        toast.error("Invalid username or password");

      });
  }

  return (
    <div className="auth-container">
      <div className="auth-box">

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

        <div className="auth-buttons">

          <button className="primary" onClick={handleLogin}>
            Login
          </button>

          <button
            className="secondary"
            onClick={() => navigate("/register")}
          >
            Create Account
          </button>

        </div>

      </div>
    </div>
  );
}

export default Login;