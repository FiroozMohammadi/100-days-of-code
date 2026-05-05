import { useEffect, useState } from "react";
import "./task.css";
function TaskPage({ setUser }) {

  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all");

  const API = "https://localhost:7107/api/task";
  const token = localStorage.getItem("token");

  useEffect(() => {
    refresh();
  }, []);

  function refresh() {
    fetch(API, {
      headers: { "Authorization": "Bearer " + token }
    })
      .then(res => res.json())
      .then(data => setTasks(data));
  }

  function handleSave() {
    if (!input) return;

    const method = editId ? "PUT" : "POST";
    const url = editId ? `${API}/${editId}` : API;

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        title: input,
        isCompleted: false
      })
    }).then(() => {
      setInput("");
      setEditId(null);
      refresh();
    });
  }

  function deleteTask(id) {
    fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: { "Authorization": "Bearer " + token }
    }).then(() => refresh());
  }

  function editTask(task) {
    setInput(task.title);
    setEditId(task.id);
  }

  function toggleComplete(task) {
    fetch(`${API}/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        title: task.title,
        isCompleted: !task.isCompleted
      })
    }).then(() => refresh());
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.isCompleted;
    if (filter === "completed") return task.isCompleted;
    return true;
  });

  return (
    <div className="container">

      <h2>Task Manager Day-21</h2>

      <button onClick={() => {
        localStorage.removeItem("token");
        setUser(null);
      }}>
        Logout
      </button>

      <div style={{ margin: "10px 0" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter task..."
        />

        <button onClick={handleSave}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <ul>
        {filteredTasks.map(task => (
          <li key={task.id}>

            <span className={task.isCompleted ? "completed" : ""}>
              {task.title}
            </span>

            <div>

              <button onClick={() => toggleComplete(task)}>
                {task.isCompleted ? "Uncomplete" : "Complete"}
              </button>

              <button onClick={() => editTask(task)}>Edit</button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>

            </div>

          </li>
        ))}
      </ul>

    </div>
  );
}

export default TaskPage;