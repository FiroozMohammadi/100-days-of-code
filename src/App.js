import { useEffect, useState } from "react";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import TaskPage from "./TaskPage";

function App() {

  const [user, setUser] = useState(null);
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && token !== "undefined" && token !== "null") {
      setUser({ token });
    }

    setLoading(false);
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return isRegister ? (
      <Register switchToLogin={() => setIsRegister(false)} />
    ) : (
      <Login
        setUser={setUser}
        switchToRegister={() => setIsRegister(true)}
      />
    );
  }

  return <TaskPage setUser={setUser} />;
}

export default App;