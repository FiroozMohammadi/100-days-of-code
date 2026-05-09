import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import TaskPage from "./TaskPage";

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