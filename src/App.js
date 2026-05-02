import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter]=useState("all");

  const API_URL = "https://localhost:7107/api/task";

  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setTasks(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load data");
        setLoading(false);
      });
  }, []);

  function deleteTask(id) {
    setLoading(true);

    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => fetch(API_URL))
      .then(res => res.json())
      .then(data => {
        setTasks(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Delete failed");
        setLoading(false);
      });
  }

  function editTask(task) {
    setInput(task.title);
    setEditId(task.id);
  }

  function toggleComplete(task) {
    fetch(`${API_URL}/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: task.title,
        isCompleted: !task.isCompleted,
      }),
    })
      .then(() => fetch(API_URL))
      .then(res => res.json())
      .then(data => setTasks(data));
  }

  function sendData() {
    if (input.trim() === "") {
      setError("cannot be empty");
      return;
    }

    setError("");
    setLoading(true);

    const request = editId
      ? fetch(`${API_URL}/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: input,
            isCompleted: false,
          }),
        })
      : fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: input }),
        });

    request
      .then(() => fetch(API_URL))
      .then(res => res.json())
      .then(data => {
        setTasks(data);
        setInput("");
        setEditId(null);
        setLoading(false);
      })
      .catch(() => {
        setError("Something went wrong");
        setLoading(false);
      });
  }
function clearCompleted() {
  const completedTasks = tasks.filter(t => t.isCompleted);

  Promise.all(
    completedTasks.map(task =>
      fetch(`${API_URL}/${task.id}`, { method: "DELETE" })
    )
  ).then(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setTasks(data));
  });
}
 const activeCount = tasks.filter(t => !t.isCompleted).length;
const filteredTasks = tasks
  .filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  )
  .filter(task => {
    if (filter === "active") return !task.isCompleted;
    if (filter === "completed") return task.isCompleted;
    return true; 
  });
  return (
    <div className="container">

      <h1>Task Manager</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading...</p>}

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search tasks..."
      />
      <div style={{margin: "10px 0"}}>
        <button onClick={()=>setFilter("all")}>All</button>
        <button onClick={()=>setFilter("active")}>Active</button>
        <button onClick={()=>setFilter("complete")}>Complete</button>
      </div>

      <div className="input-group">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter task..."
        />

        <button onClick={sendData}>
          {editId ? "Update" : "Add"}
        </button>
      </div>
      <button onClick={clearCompleted}>
        Clear Completed
      </button>
      {!loading && filteredTasks.length === 0 && (
        <p>No tasks found...</p>
      )}
<p>{activeCount} tasks left</p>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => toggleComplete(task)}
            />

            <span
              style={{
                textDecoration: task.isCompleted ? "line-through" : "none",
                marginLeft: "10px"
              }}
            >
              {task.title}
            </span>

            <div className="actions">
              <button onClick={() => deleteTask(task.id)}>Delete</button>
              <button onClick={() => editTask(task)}>Edit</button>
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;