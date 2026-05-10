import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import TaskPage from "./pages/TaskPage.jsx";
import './styles/Auth.css';
import "./styles/task.css";
import "./styles/dashboard.css";

function App() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token && token !== "undefined" && token !== "null") {
      setUser({ token });
    }

    setLoading(false);

  }, []);

  if (loading) return <p>Loading...</p>;

  const ProtectedRoute = ({ children }) => {

    const token = localStorage.getItem("token");

    if (!token) {
      return <Navigate to="/" />;
    }

    return children;
  };

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            user
              ? <Navigate to="/tasks" />
              : <Login setUser={setUser} />
          }
        />

        <Route
          path="/register"
          element={
            user
              ? <Navigate to="/tasks" />
              : <Register />
          }
        />

        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <TaskPage setUser={setUser} />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<h1>404 - Page Not Found</h1>}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;