import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TaskPage({ setUser }) {

  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [dueDate, setDueDate] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const pageSize = 5;
  const API = "https://localhost:7107/api/task";
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTasks();
  }, [page]);

  function toggleDarkMode() {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  }

  function fetchTasks() {

    fetch(`${API}?page=${page}&pageSize=${pageSize}`, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(res => res.json())
      .then(data => {

        setTasks(data.data || []);
        setTotal(data.total || 0);

      })
      .catch(() => {

        toast.error("Failed to load tasks");

        setTasks([]);

      });
  }

  function handleSave() {

    if (!input.trim()) {
      toast.error("Task title is required");
      return;
    }

    const method = editId ? "PUT" : "POST";
    const url = editId ? `${API}/${editId}` : API;

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        title: input,
        dueDate: dueDate,
        isCompleted: false
      })
    })
      .then(() => {

        toast.success(editId ? "Task updated" : "Task added");

        setInput("");
        setDueDate("");
        setEditId(null);

        fetchTasks();

      })
      .catch(() => {

        toast.error("API error");

      });
  }

  function confirmDelete(id) {
    setSelectedId(id);
    setShowModal(true);
  }

  function deleteTask(id) {

    fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(() => {

        toast.success("Task deleted");

        fetchTasks();

      })
      .catch(() => {

        toast.error("Delete failed");

      });
  }

  function editTask(task) {
    setInput(task.title);
    setEditId(task.id);
    setDueDate(task.dueDate || "");
  }

  function toggleComplete(task) {

    fetch(`${API}/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        title: task.title,
        dueDate: task.dueDate,
        isCompleted: !task.isCompleted
      })
    })
      .then(() => {

        toast.success("Task updated");

        fetchTasks();

      })
      .catch(() => {

        toast.error("Update failed");

      });
  }

  const filteredTasks = tasks.filter(task => {

    if (filter === "active") return !task.isCompleted;

    if (filter === "completed") return task.isCompleted;

    return true;
  });

  return (

    <Layout setUser={setUser}>

      <div className={darkMode ? "container dark" : "container"}>

        <ToastContainer />

        <h2>Task Manager Day-26</h2>

        <button onClick={toggleDarkMode}>
          {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
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

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <button onClick={handleSave}>
            {editId ? "Update" : "Add"}
          </button>

        </div>

        <ul>

          {filteredTasks.map(task => (

            <li key={task.id}>

              <div>

                <span className={task.isCompleted ? "completed" : ""}>
                  {task.title}
                </span>

                <br />

                <small>
                  Due Date: {task.dueDate || "No date"}
                </small>

              </div>

              <div>

                <button onClick={() => toggleComplete(task)}>
                  {task.isCompleted ? "Undo" : "Complete"}
                </button>

                <button onClick={() => editTask(task)}>
                  Edit
                </button>

                <button onClick={() => confirmDelete(task.id)}>
                  Delete
                </button>

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

        {showModal && (

          <div className="modal-overlay">

            <div className="modal">

              <h3>Delete Task?</h3>

              <p>Are you sure?</p>

              <button onClick={() => {
                deleteTask(selectedId);
                setShowModal(false);
              }}>
                Yes
              </button>

              <button onClick={() => setShowModal(false)}>
                Cancel
              </button>

            </div>

          </div>

        )}

      </div>

    </Layout>
  );
}

export default TaskPage;