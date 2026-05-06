import { useEffect, useState } from "react";
import "./task.css";

function TaskPage({ setUser }) {

  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all");

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 5;

  const API = "https://localhost:7107/api/task";
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTasks();
  }, [page]);

function fetchTasks() {
  fetch(`${API}?page=${page}&pageSize=${pageSize}`, {
    headers: { Authorization: "Bearer " + token }
  })
    .then(res => res.json())
    .then(data => {
      console.log("API DATA:", data); 

      setTasks(data.data || []); 
      setTotal(data.total || 0);
    })
    .catch(err => {
      console.error("Fetch error:", err);
      setTasks([]); 
    });
}

  function handleSave() {
    if (!input.trim()) return;

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
      setPage(1); 
      fetchTasks();
    });
  }

  function deleteTask(id) {
    fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token }
    }).then(() => fetchTasks());
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
    }).then(() => fetchTasks());
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.isCompleted;
    if (filter === "completed") return task.isCompleted;
    return true;
  });

  return (
    <div className="container">

      <h2>Task Manager Day-22</h2>

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
                {task.isCompleted ? "Undo" : "Complete"}
              </button>

              <button onClick={() => editTask(task)}>Edit</button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "15px" }}>

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span> Page {page} </span>

        <button
          disabled={page * pageSize >= total}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>

      </div>

      <p>Total Tasks: {total}</p>

    </div>
  );
}

export default TaskPage;